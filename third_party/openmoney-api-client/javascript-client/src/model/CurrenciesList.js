(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([undefined, '../ApiClient', './CurrenciesGet'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(undefined, require('../ApiClient'), require('./CurrenciesGet'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    factory(root.OpenmoneyApi, root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.CurrenciesGet);
  }
}(this, function(module, ApiClient, CurrenciesGet) {
  'use strict';

  
  

  
  var CurrenciesList = function CurrenciesList() { /* extends null<CurrenciesGet>*/
    var self = this;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      return this;
    }

    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.CurrenciesList = CurrenciesList;
  }

  return CurrenciesList;
  
  
}));
