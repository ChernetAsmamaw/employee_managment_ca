sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    /**
     * Component.js is the main entry point of your SAP UI5 application
     * It extends UIComponent and handles:
     * - Application initialization
     * - Router setup for navigation
     * - Global model creation and management
     * - Configuration loading from manifest.json
     */
    return UIComponent.extend("sap.employees.exc.Component", {
        
        metadata: {
            manifest: "json"  // This tells UI5 to load configuration from manifest.json
        },

        /**
         * init() is automatically called when the component is instantiated
         */
        init: function () {
            // Call the parent constructor - ALWAYS do this first!
            UIComponent.prototype.init.apply(this, arguments);

            // Initialize the router - this enables navigation between views the configuration comes from manifest.json
            this.getRouter().initialize();

            // Create our employee data model using it's relative path to the app root
            var oEmployeeModel = new JSONModel("model/employeeData.json");
            
            // Set the model to the component so all views can access it
            // The empty string "" means this becomes the default model
            this.setModel(oEmployeeModel);
            
            // Also name the model like this: this.setModel(oEmployeeModel, "employees");
            // Then you'd reference it in views as {employees>/employees}
        }
    });
});