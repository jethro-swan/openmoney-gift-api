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

  
  

  
  var ApplicationRequest = function ApplicationRequest(homepage_uri, application_name, authorization_callback_uri) { 
    var self = this;
    
    /**
     * Applications Name
     * datatype: String
     * required
     **/
    self['application_name'] = applicationName;
    
    /**
     * Applications home page
     * datatype: String
     * required
     **/
    self['homepage_uri'] = homepageUri;
    
    /**
     * Application Description
     * datatype: String
     **/
    self['application_description'] = null;
    
    /**
     * Callback url after authorization.
     * datatype: String
     * required
     **/
    self['authorization_callback_uri'] = authorizationCallbackUri;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['application_name'] = ApiClient.convertToType(data['application_name'], 'String');
      
      self['homepage_uri'] = ApiClient.convertToType(data['homepage_uri'], 'String');
      
      self['application_description'] = ApiClient.convertToType(data['application_description'], 'String');
      
      self['authorization_callback_uri'] = ApiClient.convertToType(data['authorization_callback_uri'], 'String');
      
      return this;
    }

    
    /**
     * get Applications Name
     * @return {String}
     **/
    self.getApplicationName = function() {
      return self['application_name'];
    }

    /**
     * set Applications Name
     * @param {String} applicationName
     **/
    self.setApplicationName = function(applicationName) {
      self['application_name'] = applicationName;
    }
    
    /**
     * get Applications home page
     * @return {String}
     **/
    self.getHomepageUri = function() {
      return self['homepage_uri'];
    }

    /**
     * set Applications home page
     * @param {String} homepageUri
     **/
    self.setHomepageUri = function(homepageUri) {
      self['homepage_uri'] = homepageUri;
    }
    
    /**
     * get Application Description
     * @return {String}
     **/
    self.getApplicationDescription = function() {
      return self['application_description'];
    }

    /**
     * set Application Description
     * @param {String} applicationDescription
     **/
    self.setApplicationDescription = function(applicationDescription) {
      self['application_description'] = applicationDescription;
    }
    
    /**
     * get Callback url after authorization.
     * @return {String}
     **/
    self.getAuthorizationCallbackUri = function() {
      return self['authorization_callback_uri'];
    }

    /**
     * set Callback url after authorization.
     * @param {String} authorizationCallbackUri
     **/
    self.setAuthorizationCallbackUri = function(authorizationCallbackUri) {
      self['authorization_callback_uri'] = authorizationCallbackUri;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.ApplicationRequest = ApplicationRequest;
  }

  return ApplicationRequest;
  
  
}));
