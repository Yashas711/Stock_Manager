/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['../accUtils', 'knockout'],
  function (accUtils, ko) {
    function AboutViewModel(params) {
      var self = this;

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

      // Observables for login

      self.appController = params.appController || null;

      self.loginEmail = ko.observable('asd');
      self.loginPassword = ko.observable('');

      // Observables for sign-up
      self.firstName = ko.observable('');
      self.lastName = ko.observable('');
      self.signUpEmail = ko.observable('');
      self.signUpPassword = ko.observable('');
      self.phoneNumber = ko.observable('');
      self.panNumber = ko.observable('');

      // UI state
      self.isLoginVisible = ko.observable(true);
      self.isSignUpVisible = ko.observable(false);

      // Actions
      self.showSignUp = () => {
        self.isLoginVisible(false);
        self.isSignUpVisible(true);
      };

      self.showLogin = () => {
        self.isLoginVisible(true);
        self.isSignUpVisible(false);
      };



      self.fetchCustomer = async function () {
         let email = localStorage.getItem('email');
        const url = `http://localhost:8085/customer/email/${encodeURIComponent(email)}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            alert("Invalid email or password");
          }

          const customer = await response.json();
          console.log("Customer fetched:", customer);
          localStorage.setItem('customerId', customer.customerId);
          localStorage.setItem('firstName', customer.firstName);
          localStorage.setItem('email', customer.email);


          localStorage.setItem('lastName', customer.lastName);

          localStorage.setItem('mobileNumber', customer.mobileNumber);

          localStorage.setItem('panNumber', customer.panNumber);

          localStorage.setItem('password', customer.password);
          console.log("Customer fetched:", customer);







        } catch (error) {
          console.error("Fetch error:", error);
          alert
        }
      };

      // Auto-fetch on load (optional)




      self.handleLogin = async () => {
        const loginData = {
          email: self.loginEmail(),
          password: self.loginPassword()
        };
         if (loginData.email === "adminofss" && loginData.password === "adminofss") {
          localStorage.setItem('userRole', 'admin');
          alert('Logged as Admin!');
          window.location.reload(); // Rebuilds tabs based on new role
        }
          else {

        try {
          const response = await fetch('http://localhost:8085/customer/authentication', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
          });

          if (!response.ok) {
            throw new Error('Login request failed');
          }

          const result = await response.text();
          console.log("Authentication result:", result);

          if (result === "true") {
            alert('Login successful!');
              localStorage.setItem('userRole', 'customer');
              localStorage.setItem('email', loginData.email);
              await self.fetchCustomer(); // :white_check_mark: Wait for customer data before reload
              window.location.reload();  // Rebuilds tabs based on new role
          } else {
            alert('Invalid email or password');
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('Login failed. Please try again.');
        }}
      };


      // let role = (email === 'admin@demo.com') ? 'admin' : 'customer';
      // localStorage.setItem('userRole', role);

      // Optionally, navigate to the correct page
      // if (role === 'admin') {
      //   router.go({ path: 'admin' });
      // } else {
      //   router.go({ path: 'customers' });
      // }


      // Add login logic here


      self.handleSignUp = async () => {
        const customerData = {
          firstName: self.firstName(),
          lastName: self.lastName(),
          mobileNumber: self.phoneNumber(),
          email: self.signUpEmail(),
          panNumber: self.panNumber(),
          password: self.signUpPassword()
        };

        fetch('http://localhost:8085/customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to sign up');
            }
            return response.text(); // Since your API returns plain text
          })
          .then(async message => {
            alert(message); // Will show "Customer added."
            alert(message); // Will show "Customer added."
            self.showLogin(); // Switch back to login view
            localStorage.setItem('userRole', 'customer');
            localStorage.setItem('email', customerData.email);
            await self.fetchCustomer().then(() => {
              window.location.reload(); // Rel
            }); // Rel
          })
          .catch(error => {
            console.error('Sign-up error:', error);
            alert('Sign-up failed. Please try again.');
          });
      };

      // self.handleSignUp = () => {
      //   const emailToCheck = self.signUpEmail();

      //   // First, check if email already exists
      //   const customerData = {

      //     email: emailToCheck,

      //   };

      //   fetch('http://localhost:8085/customer/email', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(customerData)
      //   })
      //     .then(response => {
      //       if (response.ok) {
      //         // Email exists
      //         alert('An account with this email already exists.');
      //         throw new Error('Duplicate email');
      //       } else if (response.status === 404) {
      //         // Email does not exist, proceed to sign up
      //         return signUpCustomer();
      //       } else {
      //         // Other error
      //         throw new Error('Failed to validate email');
      //       }
      //     })
      //     .catch(error => {
      //       if (error.message !== 'Duplicate email') {
      //         console.error('Error checking email:', error);
      //         alert('An error occurred while checking email. Please try again.');
      //       }
      //     });

      //   // Helper function to perform actual sign-up
      //   function signUpCustomer() {
      //     const customerData = {
      //       firstName: self.firstName(),
      //       lastName: self.lastName(),
      //       mobileNumber: self.phoneNumber(),
      //       email: emailToCheck,
      //       panNumber: self.panNumber(),
      //       password: self.signUpPassword()
      //     };

      //     fetch('http://localhost:8085/customer', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify(customerData)
      //     })
      //       .then(response => {
      //         if (!response.ok) {
      //           throw new Error('Failed to sign up');
      //         }
      //         return response.text(); // Since your API returns plain text
      //       })
      //       .then(message => {
      //         alert(message); // Will show "Customer added."
      //         self.showLogin(); // Switch back to login view
      //         localStorage.setItem('userRole', 'customer');
      //         window.location.reload();
      //       })
      //       .catch(error => {
      //         console.error('Sign-up error:', error);
      //         alert('Sign-up failed. Please try again.');
      //       });
      //   }
      // };



      this.connected = () => {
        accUtils.announce('About page loaded.', 'assertive');
        document.title = "About";
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
    return AboutViewModel;
  }
);
