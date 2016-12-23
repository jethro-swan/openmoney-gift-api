(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([undefined, '../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(undefined, require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    factory(root.OpenmoneyApi, root.OpenmoneyApi.ApiClient);
  }
}(this, function(module, ApiClient) {
  'use strict';

  
  

  
  var CurrenciesRequest = function CurrenciesRequest(currency_namespace, currency, stewards) { 
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['currency'] = currency;
    
    /**
     * datatype: String
     * required
     **/
    self['currency_namespace'] = currencyNamespace;
    
    /**
     * datatype: [String]
     * required
     **/
    self['stewards'] = stewards;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['currency'] = ApiClient.convertToType(data['currency'], 'String');
      
      self['currency_namespace'] = ApiClient.convertToType(data['currency_namespace'], 'String');
      
      self['stewards'] = ApiClient.convertToType(data['stewards'], ['String']);
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getCurrency = function() {
      return self['currency'];
    }

    /**
     * @param {String} currency
     **/
    self.setCurrency = function(currency) {
      self['currency'] = currency;
    }
    
    /**
     * @return {String}
     **/
    self.getCurrencyNamespace = function() {
      return self['currency_namespace'];
    }

    /**
     * @param {String} currencyNamespace
     **/
    self.setCurrencyNamespace = function(currencyNamespace) {
      self['currency_namespace'] = currencyNamespace;
    }
    
    /**
     * @return {[String]}
     **/
    self.getStewards = function() {
      return self['stewards'];
    }

    /**
     * @param {[String]} stewards
     **/
    self.setStewards = function(stewards) {
      self['stewards'] = stewards;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.CurrenciesRequest = CurrenciesRequest;
  }

  return CurrenciesRequest;
  
  
}));
