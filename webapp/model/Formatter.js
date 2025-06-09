sap.ui.define([], function () {
    "use strict";

    /**
     * Formatters are utility functions that transform data for display
     * They're used in XML views to format bound data before showing it to users
     * Formatters should be pure functions (no side effects) and return formatted values
     */
    return {
        
        /**
         * Formats salary as USD currency
         * @param {number} value - The salary value to format
         * @returns {string} Formatted salary string like "$75,000"
         */
        formatSalary: function (value) {
            if (!value || isNaN(value)) {
                return "N/A";
            }
            // Use JavaScript's built-in number formatting - NumberFormat
            // toLocaleString() handles currency formatting automatically
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        },

        /**
         * Formats phone numbers for better readability
         * @param {string} phoneNumber - Raw phone number
         * @returns {string} Formatted phone number
         */
        formatPhone: function (phoneNumber) {
            if (!phoneNumber) {
                return "";
            }
            // No change needed for now
            return phoneNumber;
        },

        /**
         * Capitalizes role names for consistent display
         * @param {string} role - Employee role
         * @returns {string} Properly capitalized role
         */
        formatRole: function (role) {
            if (!role) {
                return "";
            }
            return role.charAt(0).toUpperCase() + role.slice(1);
        },

        /**
         * Returns appropriate icon based on department
         * @param {string} department - Employee department
         * @returns {string} SAP icon name
         */
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