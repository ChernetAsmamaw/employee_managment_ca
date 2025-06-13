sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, UIComponent, MessageToast, MessageBox, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("sap.employees.exc.controller.EmployeeDetail", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);

            oRouter.getRoute("EmployeeDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sEmployeeId = oEvent.getParameter("arguments").employeeId;
            this._sEmployeeId = sEmployeeId;

            this.getView().bindElement({
                path: "/employees/" + this._getEmployeeIndexById(sEmployeeId)
            });
        },

        _getEmployeeIndexById: function (sEmployeeId) {
            var oModel = this.getView().getModel();
            var aEmployees = oModel.getProperty("/employees");
            if (aEmployees) {
                return aEmployees.findIndex(function (emp) {
                    return emp.id === sEmployeeId;
                });
            }
            return -1;
        },

        onNavBack: function () {
            UIComponent.getRouterFor(this).navTo("EmployeeList");
        },

        onEdit: function () {
            var oEmployee = this.getView().getBindingContext().getObject();
            this._openEmployeeDialog(oEmployee);
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
                    oModel.setProperty("/employees/" + iIndex, oEmployee);
                    MessageToast.show("Employee updated successfully!");
                }
            }
            this._oEmployeeDialog.close();
            this.getView().bindElement({
                path: "/employees/" + this._getEmployeeIndexById(oEmployee.id)
            });
        },

        onCancelEmployee: function () {
            if (this._oEmployeeDialog) {
                this._oEmployeeDialog.close();
            }
        },

        onDelete: function () {
            var oEmployee = this.getView().getBindingContext().getObject();
            var that = this;

            MessageBox.confirm(
                `Are you sure you want to delete employee "${oEmployee.name}"?\n\nThis action cannot be undone.`,
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

        _performDelete: function () {
            var oModel = this.getView().getModel();
            var aEmployees = oModel.getProperty("/employees");
            var sEmployeeIdToDelete = this.getView().getBindingContext().getObject().id;

            var iIndex = aEmployees.findIndex(function (emp) {
                return emp.id === sEmployeeIdToDelete;
            });

            if (iIndex > -1) {
                aEmployees.splice(iIndex, 1);

                oModel.setProperty("/employees", aEmployees);

                MessageToast.show("Employee deleted successfully");

                this.onNavBack();
            } else {
                MessageToast.show("Error: Employee not found");
            }
        },

        onRefresh: function () {
            var sEmployeeId = this.getView().getBindingContext().getObject().id;
            this.getView().bindElement({
                path: "/employees/" + this._getEmployeeIndexById(sEmployeeId)
            });
            MessageToast.show("Employee data refreshed");
        }
    });
});