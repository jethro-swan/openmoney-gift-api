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

  
  

  
  var JournalsRequest = function JournalsRequest(amount, to_account_namespace, to_account) { 
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['to_account'] = toAccount;
    
    /**
     * datatype: String
     * required
     **/
    self['to_account_namespace'] = toAccountNamespace;
    
    /**
     * datatype: Number
     * required
     * minimum: 0.0
     **/
    self['amount'] = amount;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['to_account'] = ApiClient.convertToType(data['to_account'], 'String');
      
      self['to_account_namespace'] = ApiClient.convertToType(data['to_account_namespace'], 'String');
      
      self['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getToAccount = function() {
      return self['to_account'];
    }

    /**
     * @param {String} toAccount
     **/
    self.setToAccount = function(toAccount) {
      self['to_account'] = toAccount;
    }
    
    /**
     * @return {String}
     **/
    self.getToAccountNamespace = function() {
      return self['to_account_namespace'];
    }

    /**
     * @param {String} toAccountNamespace
     **/
    self.setToAccountNamespace = function(toAccountNamespace) {
      self['to_account_namespace'] = toAccountNamespace;
    }
    
    /**
     * minimum: 0.0
     * @return {Number}
     **/
    self.getAmount = function() {
      return self['amount'];
    }

    /**
     * @param {Number} amount
     **/
    self.setAmount = function(amount) {
      self['amount'] = amount;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.JournalsRequest = JournalsRequest;
  }

  return JournalsRequest;
  
  
}));
