sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/Device"
], function (Controller, History, Device) {
    "use strict";

    return Controller.extend("sap.employees.exc.controller.NotFound", {
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined && Device.system.phone) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("EmployeeList", {}, true);
            }
        },

        onNavToOverview: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("EmployeeList", {}, true);
        }
    });
});