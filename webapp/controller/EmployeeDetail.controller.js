sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, UIComponent, JSONModel, MessageToast, MessageBox) {
    "use strict";

    /**
     * The Detail controller handles:
     * - Route parameter processing (employee ID from URL)
     * - Data binding for the selected employee
     * - Navigation back to the list
     * - CRUD operations (Edit, Delete)
     */
    return Controller.extend("sap.employees.exc.controller.EmployeeDetail", {

        /**
         * onInit sets up route handling, listens for the route pattern match to get the employee ID
         */
        onInit: function () {
            // Get the router from the component
            var oRouter = UIComponent.getRouterFor(this);
            
            // attachPatternMatched listens for when this route is navigated to
            // The route pattern "employee/{employeeId}" will trigger this function
            oRouter.getRoute("EmployeeDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        /**
         * This function is called when the route pattern matches and finds the corresponding data
         * @param {sap.ui.base.Event} oEvent - Route matched event
         */
        _onObjectMatched: function (oEvent) {
            // getParameter("arguments") gives us the URL parameters
            var sEmployeeId = oEvent.getParameter("arguments").employeeId;
            
            // Get the main data model
            var oModel = this.getView().getModel();
            
            if (oModel) {
                // Get all employees from the model
                var aEmployees = oModel.getProperty("/employees");
                
                if (aEmployees) {
                    // find() returns the first matching element
                    var oEmployee = aEmployees.find(function(emp) {
                        return emp.id === sEmployeeId;
                    });
                    
                    if (oEmployee) {
                        // Create a new model for the selected employee to give it a view
                        var oSelectedEmployeeModel = new JSONModel(oEmployee);
                        this.getView().setModel(oSelectedEmployeeModel, "selectedEmployee");
                        
                        // Store the employee ID for later use
                        this._sEmployeeId = sEmployeeId;
                    } else {
                        // Handle case where employee is not found
                        MessageToast.show("Employee not found");
                        this.onNavBack();
                    }
                }
            }
        },

        /**
         * Navigation back to the list view
         */
        onNavBack: function () {
            // navTo() navigates to "EmployeeList", the route name in manifest.json
            UIComponent.getRouterFor(this).navTo("EmployeeList");
        },

        /**
         * Edit functionality 
         */
        onEdit: function () {
            var oSelectedEmployee = this.getView().getModel("selectedEmployee").getData();
            
            MessageBox.information(
                `Edit functionality Placeholder \n` +
                // Open an edit dialog
                // Navigate to an edit page
                // Enable inline editing
                // Validate and save changes
                {
                    title: "Edit Employee"
                }
            );
        },

        /**
         * Delete confirmation
         */
        onDelete: function () {
            var oSelectedEmployee = this.getView().getModel("selectedEmployee").getData();
            var that = this;
            
            // MessageBox.confirm shows a confirmation dialog
            MessageBox.confirm(
                `Are you sure you want to delete employee "${oSelectedEmployee.name}"?\n\nThis action cannot be undone.`,
                {
                    title: "Confirm Deletion",
                    actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.DELETE,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.DELETE) {
                            that._performDelete();
                        }
                    }
                }
            );
        },

        /**
         * Actual delete, remove the employee from the data model
         * @private
         */
        _performDelete: function () {
            var oModel = this.getView().getModel();
            var aEmployees = oModel.getProperty("/employees");
            var sEmployeeId = this._sEmployeeId;
            
            // Find and remove the employee
            var iIndex = aEmployees.findIndex(function(emp) {
                return emp.id === sEmployeeId;
            });
            
            if (iIndex > -1) {
                // splice() removes elements from array
                aEmployees.splice(iIndex, 1);
                
                // Update the model
                oModel.setProperty("/employees", aEmployees);
                
                MessageToast.show("Employee deleted successfully");
                
                this.onNavBack();
            } else {
                MessageToast.show("Error: Employee not found");
            }
        },

        /**
         * Refresh for the detail view
         */
        onRefresh: function () {
            if (this._sEmployeeId) {
                // Simulate re-matching the route to refresh data
                var oRouter = UIComponent.getRouterFor(this);
                var oRoute = oRouter.getRoute("EmployeeDetail");
                
                // Create fake event to trigger refresh
                var oFakeEvent = {
                    getParameter: function(sParam) {
                        if (sParam === "arguments") {
                            return { employeeId: this._sEmployeeId };
                        }
                    }.bind(this)
                };
                
                this._onObjectMatched(oFakeEvent);
                MessageToast.show("Employee data refreshed");
            }
        }
    });
});