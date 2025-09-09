/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojcontext', 'ojs/ojmodule-element-utils', 'ojs/ojknockouttemplateutils', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojarraydataprovider',
  'ojs/ojdrawerpopup', 'ojs/ojmodule-element', 'ojs/ojknockout', 'stock-card/loader', 'say-hero/loader', 'stock-dailog/loader'],
  function (ko, Context, moduleUtils, KnockoutTemplateUtils, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ResponsiveUtils, ResponsiveKnockoutUtils, ArrayDataProvider) {

    function ControllerViewModel() {

      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      var self = this;





      // Handle announcements sent when pages change, for Accessibility.
      this.manner = ko.observable('polite');
      this.message = ko.observable();
      announcementHandler = (event) => {
        this.message(event.detail.message);
        this.manner(event.detail.manner);
      };

      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);


      // Media queries for responsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      const mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);


      function rebuildNavAndRouterByRole(role) {
        let tabData = [ // default route for empty hash

          { path: 'home', detail: { label: 'HOME', iconClass: 'oj-ux-ico-bar-chart' } }
        ];
        if (role === 'admin') {
          tabData.push({ path: 'admin', detail: { label: 'ADMIN', iconClass: 'oj-ux-ico-fire' } });
        } else if (role === 'customer') {
          tabData.push({ path: 'customers', detail: { label: 'USER', iconClass: 'oj-ux-ico-contact-group' } });
        } else {
          tabData.push({ path: 'about', detail: { label: 'LOGIN', iconClass: 'oj-ux-ico-fire' } });
        }

        // Rebuild navData for the TabBar
        self.navData(tabData);
        self.navDataProvider = new ArrayDataProvider(self.navData(), { keyAttributes: "path" });
        window.history.replaceState(null, '', '?ojr=home');
        // Rebuild router with all the same paths:
        let navRoutes = [{ path: '', redirect: 'home' }, ...tabData];
        self.router = new CoreRouter(navRoutes, { urlAdapter: new UrlParamAdapter() });
        self.router.sync();
        self.router.go({ path: 'home' });



        // Recreate router adapters using the new router instance!
        self.moduleAdapter = new ModuleRouterAdapter(self.router);
        self.selection = new KnockoutRouterAdapter(self.router);

      }

      // at startup or after login:
      let role = localStorage.getItem('userRole') || '';
      self.navData = ko.observableArray([]);
      rebuildNavAndRouterByRole(role);




      // let navData = [
      //   { path: '', redirect: 'home' },
      //   { path: 'home', detail: { label: 'HOME', iconClass: 'oj-ux-ico-bar-chart' } },
      //   { path: 'admin', detail: { label: 'ADMIN', iconClass: 'oj-ux-ico-fire' } },
      //   { path: 'customers', detail: { label: 'Customers', iconClass: 'oj-ux-ico-contact-group' } },
      //   { path: 'about', detail: { label: 'About', iconClass: 'oj-ux-ico-information-s' } }
      // ];

      // // Router setup
      // let router = new CoreRouter(navData, {
      //   urlAdapter: new UrlParamAdapter()
      // });
      // router.sync();

      // this.moduleAdapter = new ModuleRouterAdapter(router);

      // this.selection = new KnockoutRouterAdapter(router);
      // this.navDataProvider = new ArrayDataProvider(navData.slice(1), { keyAttributes: "path" });





      // let role = localStorage.getItem('userRole') || '';
      // console.log("Sanitized role from localStorage is:", role);
      // console.log("value of role is ", role);

      // let tabData = [

      //   { path: 'home', detail: { label: 'HOME', iconClass: 'oj-ux-ico-bar-chart' } }, { path: 'admin', detail: { label: 'ADMIN', iconClass: 'oj-ux-ico-fire' } }
      // ];
      // if (role === 'admin') {
      //   console.log("role is admin");

      //   tabData = [{ path: 'home', detail: { label: 'HOME', iconClass: 'oj-ux-ico-bar-chart' } }, { path: 'admin', detail: { label: 'ADMIN', iconClass: 'oj-ux-ico-fire' } }]
      //   self.navData=tabData
      // } else if (role === 'customer') {
      //   console.log("role is customer");
      //   tabData = [{ path: 'home', detail: { label: 'HOME', iconClass: 'oj-ux-ico-bar-chart' } }, { path: 'customers', detail: { label: 'cust', iconClass: 'oj-ux-ico-fire' } }]
      // } else {
      //   tabData = [{ path: 'home', detail: { label: 'HOME', iconClass: 'oj-ux-ico-bar-chart' } }, { path: 'about', detail: { label: 'login', iconClass: 'oj-ux-ico-fire' } }]
      // }
      // self.navData = ko.observableArray(tabData);
      // self.navDataProvider = new ArrayDataProvider(self.navData(), { keyAttributes: "path" });

      // let router = new CoreRouter(tabData, {
      //   urlAdapter: new UrlParamAdapter()
      // });
      // router.sync();


      // Module adapters
      // this.moduleAdapter = new ModuleRouterAdapter(router);
      // this.selection = new KnockoutRouterAdapter(router);

      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.

      // Drawer
      self.sideDrawerOn = ko.observable(false);

      // Close drawer on medium and larger screens
      this.mdScreen.subscribe(() => { self.sideDrawerOn(false) });

      // Called by navigation drawer toggle button and after selection of nav drawer item
      this.toggleDrawer = () => {
        self.sideDrawerOn(!self.sideDrawerOn());
      }

      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      this.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      this.footerLinks = [
        { name: 'About Oracle', linkId: 'aboutOracle', linkTarget: 'http://www.oracle.com/us/corporate/index.html#menu-about' },
        { name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" },
        { name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" },
        { name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" },
        { name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" },
      ];
    }
    // release the application bootstrap busy state
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();

    return new ControllerViewModel();
  }
);
