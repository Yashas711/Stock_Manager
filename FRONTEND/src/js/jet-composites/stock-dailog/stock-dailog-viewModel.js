/**
  Copyright (c) 2015, 2025, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/








'use strict';
define(
  ['knockout', 'ojL10n!./resources/nls/stock-dailog-strings', 'ojs/ojcontext', 'ojs/ojknockout', "oj-c/button", "oj-c/dialog", "ojs/ojbootstrap"], function (ko, componentStrings, Context, Bootstrap) {

    function ExampleComponentModel(context) {
      var self = this;
      //    this.selectedStock = params.selectedStock;
      // this.isOpened = params.isOpened;
      // this.onClose = params.onClose;

      //At the start of your viewModel constructor
      var busyContext = Context.getContext(context.element).getBusyContext();
      var options = { "description": "Web Component Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;
      this.isOpened = ko.observable(false);
      this.close = () => {
        this.isOpened(false);
      };
      this.open = () => {
        this.isOpened(true);
      };



      //Once all startup and async activities have finished, relocate if there are any async activities
      self.busyResolve();
    };

    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnected = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
  });
