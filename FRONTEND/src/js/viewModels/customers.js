/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['../accUtils', 'knockout'],
  function (accUtils, ko) {
    function CustomerViewModel() {
      const self = this;

      self.selectedTab = ko.observable('add');

      self.tabs = ko.observableArray([
        { id: 'my-portfolio', label: 'My Portfolio' },
        { id: 'transaction-history', label: 'Transaction History' },
        { id: 'my-profile', label: 'My Profile' },
      ]);
      localStorage.getItem('panNumber')
      this.pan = ko.observable(localStorage.getItem('panNumber'));
      this.email = ko.observable(localStorage.getItem('email'));
      this.phone = ko.observable(localStorage.getItem('mobileNumber'));
      this.password = ko.observable(localStorage.getItem('password'));
      this.firstName = ko.observable(localStorage.getItem('firstName'));
      this.lastName = ko.observable(localStorage.getItem('lastName'));
      this.newPassword = ko.observable(localStorage.getItem('password'));
      this.confirmPassword = ko.observable(localStorage.getItem('password'));

      this.isEditable = ko.observable(false);






      self.customerId = localStorage.getItem('customerId');
      console.log("cid is ", this.customerId)// Replace with actual logged-in ID
      self.stocks = ko.observableArray([]);
      self.selectedStock = ko.observable(null);
      self.sellQuantity = ko.observable('');
      self.isSellDialogOpened = ko.observable(false);

      self.connected = () => {
        accUtils.announce('Portfolio page loaded.', 'assertive');
        document.title = "Portfolio";
        self.loadPortfolio();
      };

      self.loadPortfolio = async () => {
        const url = `http://localhost:8085/customer/${self.customerId}/portfolio`;

        // if (!self.customerId || self.customerId === "null") {
        //   alert("Customer ID is not set. Cannot load portfolio.");
        //   return;
        // }

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
          }

          const data = await response.json();

          // Validate that data is an object with numeric keys and quantities
          if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            // alert("No portfolio data found.");
            self.stocks([]);
            return;
          }

          const stockArray = Object.entries(data)
            .filter(([stockId, quantity]) => !isNaN(parseInt(stockId)) && typeof quantity === 'number' && quantity>0)
            .map(([stockId, quantity]) => ({
              stockId: parseInt(stockId),
              quantity: quantity,
              name: 'Loading...',
              symbol: '',
              price: 0,
              listingPrice: 0
            }));

          if (stockArray.length === 0) {
            alert("You dont have any existing stocks, Thank you");
            self.stocks([]);
            return;
          }

          self.stocks(stockArray);
          self.enrichStockData();
        } catch (err) {
          console.error("Error loading portfolio:", err);
          alert("Error loading portfolio: " + err.message);
        }
      };
      self.chartDataProvider = ko.observable();



      self.enrichStockData = () => {
        self.stocks().forEach(stock => {
          fetch(`http://localhost:8081/stocks/${stock.stockId}`) // Assuming this endpoint exists
            .then(res => res.json())
            .then(data => {
              stock.name = data.stockName,
                stock.symbol = "",
                stock.price = data.stockPrice,
                stock.listingPrice = data.listingPrice,
                self.stocks.valueHasMutated(); // Notify Knockout of update

            });
            
        });
        console.log("stocks data is", self.stocks());
      }



      self.totalHoldings = ko.computed(() =>
        self.stocks().reduce((sum, stock) => sum + stock.quantity * stock.price, 0).toFixed(2)
      );

      self.totalCost = ko.computed(() =>
        self.stocks().reduce((sum, stock) => sum + stock.quantity * stock.listingPrice, 0)
      );
      

      self.profitPercent = ko.computed(() => {
        const cost = self.totalCost();
        const value = self.totalHoldings();
        return cost === 0 ? 0 : ((value - cost) / cost) * 100;
      });

      self.profitColor = ko.computed(() =>
        self.profitPercent() >= 0 ? 'blue' : 'blue'
      );

      self.promptSellStock = (stock) => {
        if (stock) {
          self.selectedStock(stock); // Must be a valid object
          self.sellQuantity(0);
          self.isSellDialogOpened(true);
        }

      };

      self.totalSellValue = ko.computed(() => {
        const stock = self.selectedStock();
        const qty = parseInt(self.sellQuantity(), 10);
        return (!stock || isNaN(qty)) ? 0 : qty * stock.price;
      });

      self.confirmSellStock = () => {
        const stock = self.selectedStock();
        const qty = parseInt(self.sellQuantity(), 10);
        const customerId = self.customerId;

        if (!stock || isNaN(qty) || qty <= 0 || qty > stock.quantity) {
          alert('Invalid quantity.');
          return;
        }

        const url = `http://localhost:8084/transaction/${customerId}/sell?stockId=${stock.stockId}&quantity=${qty}`;
        fetch(url, { method: 'POST' })
          .then(res => res.text())
          .then(msg => {
            alert(msg);
            self.loadPortfolio(); // Refresh after sale
            self.isSellDialogOpened(false);
          })
          .catch(err => {
            alert('Error selling stock: ' + err);
            self.isSellDialogOpened(false);
          });
      };


      // this.saveProfile = () => {
      //   if (this.isEditable()) {
      //     // Validate password fields
      //     if (this.newPassword() || this.confirmPassword()) {
      //       if (this.newPassword() !== this.confirmPassword()) {
      //         alert('Passwords do not match!');
      //         return;
      //       }
      //       this.password(this.newPassword()); // ✅ Update the actual password
      //     }

      //     // Clear temp fields
      //     this.newPassword('');
      //     this.confirmPassword('');

      //     // ✅ Exit edit mode
      //     this.isEditable(false);
      //   } else {
      //     // ✅ Enter edit mode
      //     this.isEditable(true);
      //   }
      // };
      this.saveProfile = () => {
        if (this.isEditable()) {
          // Validate password fields
          if (this.newPassword() || this.confirmPassword()) {
            if (this.newPassword() !== this.confirmPassword()) {
              alert('Passwords do not match!');
              return;
            }
            this.password(this.newPassword()); // ✅ Update the actual password
          }

          // Prepare payload
          const updatedCustomer = {
            firstName: this.firstName(),
            lastName: this.lastName(),
            email: this.email(),
            mobileNumber: this.phone(),
            panNumber: this.pan(),
            password: this.password()
          };

          const customerId = localStorage.getItem('customerId'); // Replace with dynamic ID if available
          const url = `http://localhost:8085/customer/${customerId}`;

          // Send PUT request
          fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCustomer)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to update profile');
              }
              return response.text(); // Assuming your API returns plain text
            })
            .then(message => {
              alert(message); // "Customer updated."
              console.log("Profile updated:", updatedCustomer);
            })
            .catch(error => {
              console.error("Update error:", error);
              alert("Profile update failed.");
            });

          // Clear temp fields
          this.newPassword('');
          this.confirmPassword('');

          // Exit edit mode
          this.isEditable(false);
        } else {
          // Enter edit mode
          this.isEditable(true);
        }
      };



      this.toggleEdit = () => {
        this.isEditable(!this.isEditable());
      };


      // this.transactions = ko.observableArray([
      //   {
      //     transactionId: "TXN001",
      //     stockId: "STK101",
      //     type: "Buy",
      //     quantity: 50,
      //     amount: 500.00,
      //     transactionDate: "2025-09-05",
      //     transactionDateTime: "12:00 PM"
      //   },
      //   {
      //     transactionId: "TXN002",
      //     stockId: "STK102",
      //     type: "Sell",
      //     quantity: 30,
      //     amount: 500.00,

      //     transactionDate: "2025-09-06",
      //     transactionDateTime: "10:30 AM"
      //   },
      //   {
      //     transactionId: "TXN003",
      //     stockId: "STK103",
      //     type: "Buy",
      //     quantity: 100,
      //     amount: 500.00,

      //     transactionDate: "2025-09-07",
      //     transactionDateTime: "03:45 PM"
      //   }
      //   // Add more transactions as needed
      // ]);


      // Example customer ID (can be dynamic)
      self.customerId = localStorage.getItem('customerId'); // Assuming you store it on login

      // Observable array to hold transactions
      self.transactions = ko.observableArray([]);

      // Fetch transactions from API
      self.fetchTransactions = async function () {
        const url = `http://localhost:8085/customer/${encodeURIComponent(self.customerId)}/transaction`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const rawData = await response.json();

          const formatted = rawData.map(tx => {
            const [date, time] = tx.transactionDate.split('T');
            return {
              transactionId: tx.transactionId,
              stockId: tx.stockId,
              type: tx.transactionType,           // BUY or SELL
              quantity: tx.stockQuantity,
              amount: tx.transactionPrice.toFixed(2),
              transactionDate: date,
              transactionDateTime: time
            };
          });

          self.transactions(formatted);
          console.log("Transactions loaded:", formatted);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };

      // Auto-fetch when tab is selected (optional)
      self.selectedTab = ko.observable('my-portfolio');
      self.selectedTab.subscribe(tab => {
        if (tab === 'transaction-history') {
          self.fetchTransactions();
        }
        if (tab == 'my-portfolio') {
          self.loadPortfolio();

        }
      });

      function enableEditing() {
        const inputs = document.querySelectorAll('.form-group input');
        inputs.forEach(input => input.disabled = false);
      }
      self.handleLogout = function () {
        localStorage.removeItem('userRole');
        localStorage.removeItem('customerId');
        localStorage.removeItem('email');


        localStorage.removeItem('customerFName');

        localStorage.removeItem('customerLName');

        // self.userRole('');
        // Option 1: reload the whole app (simple)
        window.location.reload();
        // Option 2: (advanced) - programmatically reset tabs/nav in ViewModel and reroute
        // rebuildNavAndRouterByRole('');
        // router.go({ path: 'about' });
      };

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into theis
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Customers page loaded.', 'assertive');
        document.title = "Customers";
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
    return CustomerViewModel;
  }
);
