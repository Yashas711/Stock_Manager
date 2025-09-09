/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your Admin ViewModel code goes here
 */
define(['../accUtils', 'knockout'],
  function (accUtils, ko) {
    function AdminViewModel() {
      const self = this;

      self.selectedTab = ko.observable('add');

      self.tabs = ko.observableArray([
        { id: 'add', label: 'Add Stock' },
        { id: 'update', label: 'Update Stock' },
        { id: 'deleteStock', label: 'Delete Stock' },
        { id: 'deleteCustomer', label: 'Delete Customer' },
      ]);

      // Form fields
      self.newStockName = ko.observable('');
      self.newStockQty = ko.observable(null);
      self.selectedStock = ko.observable();
      self.updatedQty = ko.observable(null);
      self.selectedCustomer = ko.observable();

      // Actions
      // self.addStock = function () {
      //   console.log('Adding stock:', self.newStockName(), self.newStockQty());
      // };

      self.newStock = { // or generate a unique ID another way
        stockName: ko.observable(""),
        stockPrice: ko.observable(""),
        listingPrice: ko.observable(""),
        listingDate: ko.observable(""),
        listedExchange: ko.observable("")
      };

      self.addStock = function () {
        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0];
        console.log('Adding stock:', self.newStock.stockName(), self.newStock.stockPrice(), formattedDate, self.newStock.listedExchange());
        const stockData = {
          stockName: self.newStock.stockName(),
          stockPrice: parseFloat(self.newStock.stockPrice()),
          listingPrice: parseFloat(self.newStock.stockPrice()),
          listingDate: formattedDate,
          listedExchange: self.newStock.listedExchange()
        };

        fetch("http://localhost:8083/admin/stock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stockData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to add stock');
            }
            return response.text(); // ✅ Use .text() instead of .json()
          })
          .then(message => {
            alert(message); // "Stock added."
            self.newStock.stockPrice('');
            self.newStock.stockName('');
            self.newStock.listedExchange('');
            self.newStock.listingDate('');

          })
          .catch(error => {
            console.error('Error adding stock:', error);
            alert('Error adding stock. Please try again.');
          });
      };

      self.updatedStock = {
        stockId: ko.observable(''),
        stockName: ko.observable(''),
        listedExchange: ko.observable(''),
        listingPrice: ko.observable(null),
        stockPrice: ko.observable(null),
        stockVolume: ko.observable(null)
      };

      self.updateStock = function (formEvent) {

        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0];
        const stockId = self.updatedStock.stockId(); // Ensure this is set

        const updatedStockData = {
          stockId: self.updatedStock.stockId(),
          stockName: self.updatedStock.stockName(),
          listedExchange: self.updatedStock.listedExchange(),
          listingPrice: parseFloat(self.updatedStock.listingPrice()),
          stockPrice: parseFloat(self.updatedStock.stockPrice()),
          stockVolume: parseInt(self.updatedStock.stockVolume()),
          listingDate: formattedDate
        };

        fetch(`http://localhost:8083/admin/stock/${stockId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStockData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update stock');
            }
            return response.text();
          })
          .then(message => {
            alert(message); // "Stock updated."
            Object.keys(self.updatedStock).forEach(key => self.updatedStock[key](''));
          })
          .catch(error => {
            console.error('Error updating stock:', error);
            alert('Error updating stock. Please try again.');
          });
      };

      self.stockIdToDelete = ko.observable(null);

      self.deleteStock = function (event) {

        const stockId = self.stockIdToDelete();
        if (!stockId) {
          alert("Please enter a valid Stock ID.");
          return;
        }

        fetch(`http://localhost:8083/admin/stock/${stockId}`, {
          method: "DELETE"
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to delete stock");
            }
            return response.text(); // Expecting "Stock deleted."
          })
          .then(message => {
            alert(message);
            self.stockIdToDelete(null); // ✅ Clear the input field
          })
          .catch(error => {
            console.error("Error deleting stock:", error);
            alert("Error deleting stock. Please try again.");
          });
      };

      self.customerIdToDelete = ko.observable('');

      self.deleteCustomer = function (event) {

        const customerId = self.customerIdToDelete();
        if (!customerId) {
          alert("Please enter a valid Customer ID.");
          return;
        }

        fetch(`http://localhost:8085/customer/${customerId}`, {
          method: "DELETE"
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to delete customer");
            }
            return response.text(); // Assuming backend returns plain text like "Customer deleted."
          })
          .then(message => {
            alert(message);
            self.customerIdToDelete(''); // ✅ Clear the input field
          })
          .catch(error => {
            console.error("Error deleting customer:", error);
            alert("Error deleting customer. Please try again.");
          });
      };

      self.handleLogout = function () {
        localStorage.removeItem('userRole');
        localStorage.removeItem('customerId');
        localStorage.removeItem('email');


        localStorage.removeItem('customerFName');

        localStorage.removeItem('customerLName');

        // Option 1: reload the whole app (simple)
        window.location.reload();
        // Option 2: (advanced) - programmatically reset tabs/nav in ViewModel and reroute
        // rebuildNavAndRouterByRole('');
        // router.go({ path: 'about' });
      };



      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Admin page loaded.', 'assertive');
        document.title = "Admin";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return AdminViewModel;
  }
);
