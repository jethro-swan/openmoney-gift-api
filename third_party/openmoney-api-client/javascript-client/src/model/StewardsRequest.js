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

  
  

  
  var StewardsRequest = function StewardsRequest(password, stewardname) { 
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['stewardname'] = stewardname;
    
    /**
     * datatype: String
     * required
     **/
    self['password'] = password;
    
    /**
     * datatype: String
     **/
    self['publicKey'] = null;
    
    /**
     * datatype: String
     **/
    self['email'] = null;
    
    /**
     * datatype: Boolean
     **/
    self['email_notifications'] = null;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['stewardname'] = ApiClient.convertToType(data['stewardname'], 'String');
      
      self['password'] = ApiClient.convertToType(data['password'], 'String');
      
      self['publicKey'] = ApiClient.convertToType(data['publicKey'], 'String');
      
      self['email'] = ApiClient.convertToType(data['email'], 'String');
      
      self['email_notifications'] = ApiClient.convertToType(data['email_notifications'], 'Boolean');
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getStewardname = function() {
      return self['stewardname'];
    }

    /**
     * @param {String} stewardname
     **/
    self.setStewardname = function(stewardname) {
      self['stewardname'] = stewardname;
    }
    
    /**
     * @return {String}
     **/
    self.getPassword = function() {
      return self['password'];
    }

    /**
     * @param {String} password
     **/
    self.setPassword = function(password) {
      self['password'] = password;
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
    
    /**
     * @return {String}
     **/
    self.getEmail = function() {
      return self['email'];
    }

    /**
     * @param {String} email
     **/
    self.setEmail = function(email) {
      self['email'] = email;
    }
    
    /**
     * @return {Boolean}
     **/
    self.getEmailNotifications = function() {
      return self['email_notifications'];
    }

    /**
     * @param {Boolean} emailNotifications
     **/
    self.setEmailNotifications = function(emailNotifications) {
      self['email_notifications'] = emailNotifications;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.StewardsRequest = StewardsRequest;
  }

  return StewardsRequest;
  
  
}));
