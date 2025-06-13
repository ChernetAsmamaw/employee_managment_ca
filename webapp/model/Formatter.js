sap.ui.define([], function () {
    "use strict";
    
    return {
        formatSalary: function (value) {
            if (!value || isNaN(value)) {
                return "N/A";
            }
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        },

        formatPhone: function (phoneNumber) {
            if (!phoneNumber) {
                return "";
            }
            return phoneNumber;
        },

        formatRole: function (role) {
            if (!role) {
                return "";
            }
            return role.charAt(0).toUpperCase() + role.slice(1);
        },

        getDepartmentIcon: function (department) {
            switch (department) {
                case "IT":
                    return "sap-icon://technical-object";
                case "Management":
                    return "sap-icon://manager";
                case "Design":
                    return "sap-icon://palette";
                case "Business":
                    return "sap-icon://business-objects-experience";
                default:
                    return "sap-icon://person-placeholder";
            }
        }
    };
});
