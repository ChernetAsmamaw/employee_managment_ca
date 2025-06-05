sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  /**
   * App controller is the root controller
   * It's typically minimal since the App view just provides the container
   */
  return Controller.extend("sap.employees.exc.controller.App", {
      
      /**
       * onInit is called after the view is created
       */
      onInit: function () {
          // It typically doesn't need initialization as the Component.js handles router initialization
      }
  });
});