sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, UIComponent, Filter, FilterOperator, MessageToast, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("sap.employees.exc.controller.EmployeeList", {

        onInit: function () {
            this.getOwnerComponent().getModel();
        },

        onEmployeeSelect: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");

            if (oSelectedItem) {
                var oContext = oSelectedItem.getBindingContext();
                var sEmployeeId = oContext.getProperty("id");

                UIComponent.getRouterFor(this).navTo("EmployeeDetail", {
                    employeeId: sEmployeeId
                });
            }
        },

        onEmployeePress: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext();
            var sEmployeeId = oContext.getProperty("id");

            UIComponent.getRouterFor(this).navTo("EmployeeDetail", {
                employeeId: sEmployeeId
            });
        },


        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");

            var oTable = this.byId("employeeTable");
            var oBinding = oTable.getBinding("items");

            var aFilters = [];

            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter({
                    filters: [
                        new Filter("name", FilterOperator.Contains, sQuery),
                        new Filter("role", FilterOperator.Contains, sQuery),
                        new Filter("department", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                });
                aFilters.push(oFilter);
            }

            oBinding.filter(aFilters);

            var iFilteredItems = oBinding.getLength();
            if (sQuery) {
                MessageToast.show(`Found ${iFilteredItems} employees matching "${sQuery}"`);
            }
        },

        onRefresh: function () {
            var oModel = this.getView().getModel();
            oModel.refresh(true);
            MessageToast.show("Employee data refreshed");
        },

        onAddEmployee: function () {
            this._openEmployeeDialog();
        },

        _openEmployeeDialog: function (oEmployeeData) {
            var oView = this.getView();
            var oDialogModel = new JSONModel();

            if (oEmployeeData) {
                oDialogModel.setProperty("/dialogTitle", oView.getModel("i18n").getResourceBundle().getText("editEmployeeTitle"));
                oDialogModel.setProperty("/employee", jQuery.extend({}, oEmployeeData));
                oDialogModel.setProperty("/isNew", false);
            } else {
                oDialogModel.setProperty("/dialogTitle", oView.getModel("i18n").getResourceBundle().getText("addEmployeeTitle"));
                oDialogModel.setProperty("/employee", {
                    id: this._generateNewId(),
                    name: "",
                    role: "",
                    department: "",
                    salary: 0,
                    email: "",
                    phone: "",
                    avatar: ""
                });
                oDialogModel.setProperty("/isNew", true);
            }

            oView.setModel(oDialogModel, "dialog");

            if (!this._oEmployeeDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.employees.exc.view.EmployeeDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oEmployeeDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this._oEmployeeDialog.open();
            }
        },

        _generateNewId: function () {
            var oModel = this.getView().getModel();
            var aEmployees = oModel.getProperty("/employees");
            var iMaxId = 0;
            if (aEmployees && aEmployees.length > 0) {
                iMaxId = Math.max(...aEmployees.map(emp => parseInt(emp.id.replace('EMP', '')) || 0));
            }
            return "EMP" + String(iMaxId + 1).padStart(3, '0');
        },

        onSaveEmployee: function () {
            var oModel = this.getView().getModel();
            var oDialogModel = this.getView().getModel("dialog");
            var oEmployee = oDialogModel.getProperty("/employee");
            var bIsNew = oDialogModel.getProperty("/isNew");
            var aEmployees = oModel.getProperty("/employees");

            if (!oEmployee.name || !oEmployee.role || !oEmployee.department || !oEmployee.salary || !oEmployee.email) {
                MessageToast.show("Please fill in all required fields.");
                return;
            }

            if (bIsNew) {
                aEmployees.push(oEmployee);
                MessageToast.show("Employee added successfully!");
            } else {
                var iIndex = aEmployees.findIndex(emp => emp.id === oEmployee.id);
                if (iIndex > -1) {
                    aEmployees[iIndex] = oEmployee;
                    MessageToast.show("Employee updated successfully!");
                }
            }
            oModel.setProperty("/employees", aEmployees);
            this._oEmployeeDialog.close();
        },

        onCancelEmployee: function () {
            this._oEmployeeDialog.close();
        }
    });
});