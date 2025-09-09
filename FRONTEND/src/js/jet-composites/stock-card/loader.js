/**
  Copyright (c) 2015, 2025, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./stock-card-view.html', './stock-card-viewModel', 'text!./component.json', 'css!./stock-card-styles.css'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('stock-card', {
      view: view,
      viewModel: viewModel,
      metadata: { inline: viewModel.metadata }
    });
  }
);
