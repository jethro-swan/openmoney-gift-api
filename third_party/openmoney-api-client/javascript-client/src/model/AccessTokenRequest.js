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

  
  

  
  var AccessTokenRequest = function AccessTokenRequest(grant_type) { 
    var self = this;
    
    /**
     * one of code, password, refresh_token, client_credentials
     * datatype: String
     * required
     **/
    self['grant_type'] = grantType;
    
    /**
     * Stewards Public Key
     * datatype: String
     **/
    self['client_id'] = null;
    
    /**
     * Client Secret
     * datatype: String
     **/
    self['client_secret'] = null;
    
    /**
     * datatype: String
     **/
    self['username'] = null;
    
    /**
     * datatype: String
     **/
    self['password'] = null;
    
    /**
     * datatype: String
     **/
    self['refresh_token'] = null;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['grant_type'] = ApiClient.convertToType(data['grant_type'], 'String');
      
      self['client_id'] = ApiClient.convertToType(data['client_id'], 'String');
      
      self['client_secret'] = ApiClient.convertToType(data['client_secret'], 'String');
      
      self['username'] = ApiClient.convertToType(data['username'], 'String');
      
      self['password'] = ApiClient.convertToType(data['password'], 'String');
      
      self['refresh_token'] = ApiClient.convertToType(data['refresh_token'], 'String');
      
      return this;
    }

    
    /**
     * get one of code, password, refresh_token, client_credentials
     * @return {String}
     **/
    self.getGrantType = function() {
      return self['grant_type'];
    }

    /**
     * set one of code, password, refresh_token, client_credentials
     * @param {String} grantType
     **/
    self.setGrantType = function(grantType) {
      self['grant_type'] = grantType;
    }
    
    /**
     * get Stewards Public Key
     * @return {String}
     **/
    self.getClientId = function() {
      return self['client_id'];
    }

    /**
     * set Stewards Public Key
     * @param {String} clientId
     **/
    self.setClientId = function(clientId) {
      self['client_id'] = clientId;
    }
    
    /**
     * get Client Secret
     * @return {String}
     **/
    self.getClientSecret = function() {
      return self['client_secret'];
    }

    /**
     * set Client Secret
     * @param {String} clientSecret
     **/
    self.setClientSecret = function(clientSecret) {
      self['client_secret'] = clientSecret;
    }
    
    /**
     * @return {String}
     **/
    self.getUsername = function() {
      return self['username'];
    }

    /**
     * @param {String} username
     **/
    self.setUsername = function(username) {
      self['username'] = username;
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
    self.getRefreshToken = function() {
      return self['refresh_token'];
    }

    /**
     * @param {String} refreshToken
     **/
    self.setRefreshToken = function(refreshToken) {
      self['refresh_token'] = refreshToken;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.AccessTokenRequest = AccessTokenRequest;
  }

  return AccessTokenRequest;
  
  
}));
