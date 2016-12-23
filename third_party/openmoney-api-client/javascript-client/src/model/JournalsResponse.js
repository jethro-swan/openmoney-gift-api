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

  
  

  
  var JournalsResponse = function JournalsResponse(amount, to_account_namespace, to_account) { 
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
     * datatype: String
     **/
    self['from_account'] = null;
    
    /**
     * datatype: String
     **/
    self['from_account_namespace'] = null;
    
    /**
     * datatype: String
     **/
    self['currency'] = null;
    
    /**
     * datatype: String
     **/
    self['currency_namespace'] = null;
    
    /**
     * datatype: Number
     * required
     * minimum: 0.0
     **/
    self['amount'] = amount;
    
    /**
     * datatype: Integer
     **/
    self['created'] = null;
    
    /**
     * stewardname of who created entry
     * datatype: String
     **/
    self['created_by'] = null;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['to_account'] = ApiClient.convertToType(data['to_account'], 'String');
      
      self['to_account_namespace'] = ApiClient.convertToType(data['to_account_namespace'], 'String');
      
      self['from_account'] = ApiClient.convertToType(data['from_account'], 'String');
      
      self['from_account_namespace'] = ApiClient.convertToType(data['from_account_namespace'], 'String');
      
      self['currency'] = ApiClient.convertToType(data['currency'], 'String');
      
      self['currency_namespace'] = ApiClient.convertToType(data['currency_namespace'], 'String');
      
      self['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      
      self['created'] = ApiClient.convertToType(data['created'], 'Integer');
      
      self['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      
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
     * @return {String}
     **/
    self.getFromAccount = function() {
      return self['from_account'];
    }

    /**
     * @param {String} fromAccount
     **/
    self.setFromAccount = function(fromAccount) {
      self['from_account'] = fromAccount;
    }
    
    /**
     * @return {String}
     **/
    self.getFromAccountNamespace = function() {
      return self['from_account_namespace'];
    }

    /**
     * @param {String} fromAccountNamespace
     **/
    self.setFromAccountNamespace = function(fromAccountNamespace) {
      self['from_account_namespace'] = fromAccountNamespace;
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
    
    /**
     * @return {Integer}
     **/
    self.getCreated = function() {
      return self['created'];
    }

    /**
     * @param {Integer} created
     **/
    self.setCreated = function(created) {
      self['created'] = created;
    }
    
    /**
     * get stewardname of who created entry
     * @return {String}
     **/
    self.getCreatedBy = function() {
      return self['created_by'];
    }

    /**
     * set stewardname of who created entry
     * @param {String} createdBy
     **/
    self.setCreatedBy = function(createdBy) {
      self['created_by'] = createdBy;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.JournalsResponse = JournalsResponse;
  }

  return JournalsResponse;
  
  
}));
