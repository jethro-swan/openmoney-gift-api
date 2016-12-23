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

  
  

  
  var CreateResponse = function CreateResponse(id, ok) { 
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['id'] = id;
    
    /**
     * datatype: Boolean
     * required
     **/
    self['ok'] = ok;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['id'] = ApiClient.convertToType(data['id'], 'String');
      
      self['ok'] = ApiClient.convertToType(data['ok'], 'Boolean');
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getId = function() {
      return self['id'];
    }

    /**
     * @param {String} id
     **/
    self.setId = function(id) {
      self['id'] = id;
    }
    
    /**
     * @return {Boolean}
     **/
    self.getOk = function() {
      return self['ok'];
    }

    /**
     * @param {Boolean} ok
     **/
    self.setOk = function(ok) {
      self['ok'] = ok;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.CreateResponse = CreateResponse;
  }

  return CreateResponse;
  
  
}));
