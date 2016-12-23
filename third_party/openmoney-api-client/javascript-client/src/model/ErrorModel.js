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

  
  

  
  var ErrorModel = function ErrorModel(code, message) { 
    var self = this;
    
    /**
     * datatype: Integer
     * required
     **/
    self['code'] = code;
    
    /**
     * datatype: String
     * required
     **/
    self['message'] = message;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['code'] = ApiClient.convertToType(data['code'], 'Integer');
      
      self['message'] = ApiClient.convertToType(data['message'], 'String');
      
      return this;
    }

    
    /**
     * @return {Integer}
     **/
    self.getCode = function() {
      return self['code'];
    }

    /**
     * @param {Integer} code
     **/
    self.setCode = function(code) {
      self['code'] = code;
    }
    
    /**
     * @return {String}
     **/
    self.getMessage = function() {
      return self['message'];
    }

    /**
     * @param {String} message
     **/
    self.setMessage = function(message) {
      self['message'] = message;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.ErrorModel = ErrorModel;
  }

  return ErrorModel;
  
  
}));
