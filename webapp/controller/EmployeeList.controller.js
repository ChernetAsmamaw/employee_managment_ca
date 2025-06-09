sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast"
], function (Controller, UIComponent, Filter, FilterOperator, MessageToast) {
  "use strict";

  /**
   * It manages data display, filtering, selection, and navigation to detail view
   */
  return Controller.extend("sap.employees.exc.controller.EmployeeList", {

      /**
       * onInit is called when the view is initialized to set up the data model and any initial configurations
       */
      onInit: function () {
        // Get the data model. getOwnerComponent() gives us access to the main component
        this.getOwnerComponent().getModel();
      },

      /**
       * Handles table row selection to navigate to the detail view
       * @param {sap.ui.base.Event} oEvent - The selection event
       */
      onEmployeeSelect: function (oEvent) {
          // Get the selected item from the event
          var oSelectedItem = oEvent.getParameter("listItem");
          
          if (oSelectedItem) {
              // getBindingContext() gives us access to the data
              var oContext = oSelectedItem.getBindingContext();
              var sEmployeeId = oContext.getProperty("id");
              
              // Navigate to detail view with employee ID
              // UIComponent.getRouterFor() gets the router instance
              UIComponent.getRouterFor(this).navTo("EmployeeDetail", {
                  employeeId: sEmployeeId
              });
          }
      },

      /**
       * Alternative press handler for when using press event
       * @param {sap.ui.base.Event} oEvent - The press event
       */
      onEmployeePress: function (oEvent) {
          // Get the source of the press event (the ColumnListItem)
          var oSource = oEvent.getSource();
          var oContext = oSource.getBindingContext();
          var sEmployeeId = oContext.getProperty("id");
          
          // Navigate to detail view
          UIComponent.getRouterFor(this).navTo("EmployeeDetail", {
              employeeId: sEmployeeId
          });
      },

      /**
       * Search functionality with filtering
       * This filters the table based on name or role
       * @param {sap.ui.base.Event} oEvent - The search event
       */
      onSearch: function (oEvent) {
          // Get the search query
          var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
          
          // Get the table and its binding
          var oTable = this.byId("employeeTable");
          var oBinding = oTable.getBinding("items");
          
          // Create filters array
          var aFilters = [];
          
          if (sQuery && sQuery.length > 0) {
              var oFilter = new Filter({
                  filters: [
                      new Filter("name", FilterOperator.Contains, sQuery),
                      new Filter("role", FilterOperator.Contains, sQuery),
                      new Filter("department", FilterOperator.Contains, sQuery)
                  ],
                  and: false // This creates OR condition between filters
              });
              aFilters.push(oFilter);
          }
          
          // Apply filters to the binding
          oBinding.filter(aFilters);
          
          // Show message about results
          var iFilteredItems = oBinding.getLength();
          if (sQuery) {
              MessageToast.show(`Found ${iFilteredItems} employees matching "${sQuery}"`);
          }
      },

      /**
       * Refresh functionality reloads the data model to get fresh data form source
       */
      onRefresh: function () {
          var oModel = this.getView().getModel();
          
          oModel.refresh(true);
          MessageToast.show("Employee data refreshed");
      },

      /**
       * Add employee functionality
       */
      onAddEmployee: function () {
          MessageToast.show("Add Employee functionality would be implemented here");
          
          // Potential Implimentation:
          // 1. Open a dialog with form fields
          // 2. Validate input data
          // 3. Add new employee to model
          // 4. Refresh the table
      }
  });
});