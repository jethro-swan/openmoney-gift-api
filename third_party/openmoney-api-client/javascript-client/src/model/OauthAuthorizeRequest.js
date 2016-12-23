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

  
  

  
  var OauthAuthorizeRequest = function OauthAuthorizeRequest(response_type) { 
    var self = this;
    
    /**
     * One of code, password, refresh_token, client_credentials
     * datatype: String
     * required
     **/
    self['response_type'] = responseType;
    
    /**
     * datatype: String
     **/
    self['client_id'] = null;
    
    /**
     * A uri to redirect steward after authorization
     * datatype: String
     **/
    self['redirect_uri'] = null;
    
    /**
     * stewardname of user
     * datatype: String
     **/
    self['username'] = null;
    
    /**
     * A comma separated list of scopes. If not provided, scope defaults to an empty list of scopes for stewards that don’t have a valid token for the app. For stewards who do already have a valid token for the app, the steward won’t be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the same scopes that were used last time the steward completed the flow.
     * datatype: [String]
     **/
    self['scopes'] = [];
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['response_type'] = ApiClient.convertToType(data['response_type'], 'String');
      
      self['client_id'] = ApiClient.convertToType(data['client_id'], 'String');
      
      self['redirect_uri'] = ApiClient.convertToType(data['redirect_uri'], 'String');
      
      self['username'] = ApiClient.convertToType(data['username'], 'String');
      
      self['scopes'] = ApiClient.convertToType(data['scopes'], ['String']);
      
      return this;
    }

    
    /**
     * get One of code, password, refresh_token, client_credentials
     * @return {String}
     **/
    self.getResponseType = function() {
      return self['response_type'];
    }

    /**
     * set One of code, password, refresh_token, client_credentials
     * @param {String} responseType
     **/
    self.setResponseType = function(responseType) {
      self['response_type'] = responseType;
    }
    
    /**
     * @return {String}
     **/
    self.getClientId = function() {
      return self['client_id'];
    }

    /**
     * @param {String} clientId
     **/
    self.setClientId = function(clientId) {
      self['client_id'] = clientId;
    }
    
    /**
     * get A uri to redirect steward after authorization
     * @return {String}
     **/
    self.getRedirectUri = function() {
      return self['redirect_uri'];
    }

    /**
     * set A uri to redirect steward after authorization
     * @param {String} redirectUri
     **/
    self.setRedirectUri = function(redirectUri) {
      self['redirect_uri'] = redirectUri;
    }
    
    /**
     * get stewardname of user
     * @return {String}
     **/
    self.getUsername = function() {
      return self['username'];
    }

    /**
     * set stewardname of user
     * @param {String} username
     **/
    self.setUsername = function(username) {
      self['username'] = username;
    }
    
    /**
     * get A comma separated list of scopes. If not provided, scope defaults to an empty list of scopes for stewards that don’t have a valid token for the app. For stewards who do already have a valid token for the app, the steward won’t be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the same scopes that were used last time the steward completed the flow.
     * @return {[String]}
     **/
    self.getScopes = function() {
      return self['scopes'];
    }

    /**
     * set A comma separated list of scopes. If not provided, scope defaults to an empty list of scopes for stewards that don’t have a valid token for the app. For stewards who do already have a valid token for the app, the steward won’t be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the same scopes that were used last time the steward completed the flow.
     * @param {[String]} scopes
     **/
    self.setScopes = function(scopes) {
      self['scopes'] = scopes;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.OauthAuthorizeRequest = OauthAuthorizeRequest;
  }

  return OauthAuthorizeRequest;
  
  
}));
