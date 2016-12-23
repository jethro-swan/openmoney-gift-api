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

  
  

  
  var AccountsRequest = function AccountsRequest(currency_namespace, currency, stewards, account, account_namespace) { 
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['account'] = account;
    
    /**
     * datatype: String
     * required
     **/
    self['account_namespace'] = accountNamespace;
    
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
    
    /**
     * datatype: String
     **/
    self['publicKey'] = null;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['account'] = ApiClient.convertToType(data['account'], 'String');
      
      self['account_namespace'] = ApiClient.convertToType(data['account_namespace'], 'String');
      
      self['currency'] = ApiClient.convertToType(data['currency'], 'String');
      
      self['currency_namespace'] = ApiClient.convertToType(data['currency_namespace'], 'String');
      
      self['stewards'] = ApiClient.convertToType(data['stewards'], ['String']);
      
      self['publicKey'] = ApiClient.convertToType(data['publicKey'], 'String');
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getAccount = function() {
      return self['account'];
    }

    /**
     * @param {String} account
     **/
    self.setAccount = function(account) {
      self['account'] = account;
    }
    
    /**
     * @return {String}
     **/
    self.getAccountNamespace = function() {
      return self['account_namespace'];
    }

    /**
     * @param {String} accountNamespace
     **/
    self.setAccountNamespace = function(accountNamespace) {
      self['account_namespace'] = accountNamespace;
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
    
    /**
     * @return {String}
     **/
    self.getPublicKey = function() {
      return self['publicKey'];
    }

    /**
     * @param {String} publicKey
     **/
    self.setPublicKey = function(publicKey) {
      self['publicKey'] = publicKey;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.AccountsRequest = AccountsRequest;
  }

  return AccountsRequest;
  
  
}));
