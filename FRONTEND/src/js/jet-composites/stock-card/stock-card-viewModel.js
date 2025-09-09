/**
  Copyright (c) 2015, 2025, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
  ['knockout', 'ojL10n!./resources/nls/stock-card-strings', 'ojs/ojcontext', 'ojs/ojknockout'], function (ko, componentStrings, Context) {

    function ExampleComponentModel(context) {


      var self = this;


      //At the start of your viewModel constructor
      var busyContext = Context.getContext(context.element).getBusyContext();
      var options = { "description": "Web Component Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      //Example observable
      self.messageText = ko.observable('Hello from stock-card');
      self.properties = context.properties;
      self.res = componentStrings['stock-card'];

      // self.stocks = ko.observableArray([
      //   {
      //     name: "Tata Motors",
      //     price: 650,
      //     logo: "images/tata.png",
      //     isOpened: ko.observable(false)
      //   },
      //   {
      //     name: "Infosys",
      //     price: 1450,
      //     logo: "images/infosys.png",
      //     isOpened: ko.observable(false)
      //   }
      // ]);

      // console.log("Stocks:", ko.toJS(self.stocks));

      // self.messageText = ko.observable('Top Stocks in India');
      // this.isOpened = ko.observable(false);
      // this.close = () => {
      //   this.isOpened(false);
      // };
      // this.open = () => {
      //   this.isOpened(true);
      // };

      self.stocks = ko.observableArray([]);

      self.getStocks = function () {
        fetch('http://localhost:8081/stocks')
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch stock data');
            }
            return response.json();
          })
          .then(data => {
            const formattedStocks = data.map(stock => ({
              id: stock.stockId,
              name: stock.stockName,
              listedPrice: stock.listingPrice,
              currentPrice: stock.stockPrice,
              listedExchange: stock.listedExchange
            }));
            self.stocks(formattedStocks);
          })
          .catch(error => {
            console.error('Error fetching stocks:', error);
          });
      };

      // Trigger fetch when ViewModel is initialized
      self.getStocks();

      self.selectedStock = ko.observable(null);
      self.isDialogOpen = ko.observable(false);
      self.unitsToBuy = ko.observable(1);

      self.totalPrice = ko.computed(function () {
        const stock = self.selectedStock();
        return stock ? stock.currentPrice * self.unitsToBuy() : 0;
      });
      this.close = () => {
        this.isDialogOpen(false);
      };
      //               this.open = () => {
      //                   this.isOpened(true);
      //               };

      self.openDialog = function (stock) {
        if (localStorage.getItem('userRole') == "customer") {
          self.selectedStock(stock);
          self.unitsToBuy(1); window
          self.isDialogOpen(true);
        }


      };

      self.buyStock = function () {
        const stock = self.selectedStock();             // Stock object (with .id and .name)
        const quantity = self.unitsToBuy();             // Number of units user wants to buy
        const customerId = localStorage.getItem('customerId'); // Assuming you store it on login


        const url = `http://localhost:8084/transaction/${customerId}/buy?stockId=${stock.id}&quantity=${quantity}`;

        fetch(url, {
          method: 'POST'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to purchase stock');
            }
            return response.text(); // Assuming API returns plain text message
          })
          .then(message => {
            alert(" purchased succefully" + message); // "Stock purchased successfully"
            self.isDialogOpen(false); // Close modal/dialog
            // Optional: Refresh portfolio or stock list
          })
          .catch(error => {
            console.error('Buy stock error:', error);
            alert('Failed to buy stock. Please try again.');
          });
      };
      // Resolve busy state
      //Once all startup and async activities have finished, relocate if there are any async activities
      self.busyResolve();
    };



    return ExampleComponentModel;
  });
