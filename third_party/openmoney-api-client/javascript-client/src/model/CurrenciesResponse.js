(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([undefined, '../ApiClient', './Modification'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(undefined, require('../ApiClient'), require('./Modification'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    factory(root.OpenmoneyApi, root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.Modification);
  }
}(this, function(module, ApiClient, Modification) {
  'use strict';

  
  

  
  var CurrenciesResponse = function CurrenciesResponse(currency_namespace, currency, stewards) { 
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
     * timestamp in milliseconds since epoch
     * datatype: Integer
     **/
    self['created'] = null;
    
    /**
     * stewardname of steward who made change
     * datatype: String
     **/
    self['created_by'] = null;
    
    /**
     * datatype: [Modification]
     **/
    self['modifications'] = [];
    
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
      
      self['created'] = ApiClient.convertToType(data['created'], 'Integer');
      
      self['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      
      self['modifications'] = ApiClient.convertToType(data['modifications'], [Modification]);
      
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
     * get timestamp in milliseconds since epoch
     * @return {Integer}
     **/
    self.getCreated = function() {
      return self['created'];
    }

    /**
     * set timestamp in milliseconds since epoch
     * @param {Integer} created
     **/
    self.setCreated = function(created) {
      self['created'] = created;
    }
    
    /**
     * get stewardname of steward who made change
     * @return {String}
     **/
    self.getCreatedBy = function() {
      return self['created_by'];
    }

    /**
     * set stewardname of steward who made change
     * @param {String} createdBy
     **/
    self.setCreatedBy = function(createdBy) {
      self['created_by'] = createdBy;
    }
    
    /**
     * @return {[Modification]}
     **/
    self.getModifications = function() {
      return self['modifications'];
    }

    /**
     * @param {[Modification]} modifications
     **/
    self.setModifications = function(modifications) {
      self['modifications'] = modifications;
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
    module.CurrenciesResponse = CurrenciesResponse;
  }

  return CurrenciesResponse;
  
  
}));
