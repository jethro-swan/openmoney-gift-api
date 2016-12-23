(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([undefined, '../ApiClient', './AccountsGet', './CurrenciesGet', './NamespacesGet', './StewardsGet'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(undefined, require('../ApiClient'), require('./AccountsGet'), require('./CurrenciesGet'), require('./NamespacesGet'), require('./StewardsGet'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    factory(root.OpenmoneyApi, root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.AccountsGet, root.OpenmoneyApi.CurrenciesGet, root.OpenmoneyApi.NamespacesGet, root.OpenmoneyApi.StewardsGet);
  }
}(this, function(module, ApiClient, AccountsGet, CurrenciesGet, NamespacesGet, StewardsGet) {
  'use strict';

  
  

  
  var RegisterResponse = function RegisterResponse(accounts, stewards, currencies, namespaces) { 
    var self = this;
    
    /**
     * datatype: [StewardsGet]
     * required
     **/
    self['stewards'] = stewards;
    
    /**
     * datatype: [AccountsGet]
     * required
     **/
    self['accounts'] = accounts;
    
    /**
     * datatype: [CurrenciesGet]
     * required
     **/
    self['currencies'] = currencies;
    
    /**
     * datatype: [NamespacesGet]
     * required
     **/
    self['namespaces'] = namespaces;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['stewards'] = ApiClient.convertToType(data['stewards'], [StewardsGet]);
      
      self['accounts'] = ApiClient.convertToType(data['accounts'], [AccountsGet]);
      
      self['currencies'] = ApiClient.convertToType(data['currencies'], [CurrenciesGet]);
      
      self['namespaces'] = ApiClient.convertToType(data['namespaces'], [NamespacesGet]);
      
      return this;
    }

    
    /**
     * @return {[StewardsGet]}
     **/
    self.getStewards = function() {
      return self['stewards'];
    }

    /**
     * @param {[StewardsGet]} stewards
     **/
    self.setStewards = function(stewards) {
      self['stewards'] = stewards;
    }
    
    /**
     * @return {[AccountsGet]}
     **/
    self.getAccounts = function() {
      return self['accounts'];
    }

    /**
     * @param {[AccountsGet]} accounts
     **/
    self.setAccounts = function(accounts) {
      self['accounts'] = accounts;
    }
    
    /**
     * @return {[CurrenciesGet]}
     **/
    self.getCurrencies = function() {
      return self['currencies'];
    }

    /**
     * @param {[CurrenciesGet]} currencies
     **/
    self.setCurrencies = function(currencies) {
      self['currencies'] = currencies;
    }
    
    /**
     * @return {[NamespacesGet]}
     **/
    self.getNamespaces = function() {
      return self['namespaces'];
    }

    /**
     * @param {[NamespacesGet]} namespaces
     **/
    self.setNamespaces = function(namespaces) {
      self['namespaces'] = namespaces;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.RegisterResponse = RegisterResponse;
  }

  return RegisterResponse;
  
  
}));
