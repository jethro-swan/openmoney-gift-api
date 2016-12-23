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

  
  

  
  var ApplicationResponse = function ApplicationResponse(application_secret, application_id) { 
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['application_id'] = applicationId;
    
    /**
     * datatype: String
     * required
     **/
    self['application_secret'] = applicationSecret;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['application_id'] = ApiClient.convertToType(data['application_id'], 'String');
      
      self['application_secret'] = ApiClient.convertToType(data['application_secret'], 'String');
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getApplicationId = function() {
      return self['application_id'];
    }

    /**
     * @param {String} applicationId
     **/
    self.setApplicationId = function(applicationId) {
      self['application_id'] = applicationId;
    }
    
    /**
     * @return {String}
     **/
    self.getApplicationSecret = function() {
      return self['application_secret'];
    }

    /**
     * @param {String} applicationSecret
     **/
    self.setApplicationSecret = function(applicationSecret) {
      self['application_secret'] = applicationSecret;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.ApplicationResponse = ApplicationResponse;
  }

  return ApplicationResponse;
  
  
}));
