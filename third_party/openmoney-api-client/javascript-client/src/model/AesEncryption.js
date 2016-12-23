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

  
  

  
  var AesEncryption = function AesEncryption() { 
    var self = this;
    
    /**
     * datatype: String
     **/
    self['content'] = null;
    
    /**
     * datatype: Object
     **/
    self['tag'] = null;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['content'] = ApiClient.convertToType(data['content'], 'String');
      
      self['tag'] = ApiClient.convertToType(data['tag'], Object);
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getContent = function() {
      return self['content'];
    }

    /**
     * @param {String} content
     **/
    self.setContent = function(content) {
      self['content'] = content;
    }
    
    /**
     * @return {Object}
     **/
    self.getTag = function() {
      return self['tag'];
    }

    /**
     * @param {Object} tag
     **/
    self.setTag = function(tag) {
      self['tag'] = tag;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.AesEncryption = AesEncryption;
  }

  return AesEncryption;
  
  
}));
