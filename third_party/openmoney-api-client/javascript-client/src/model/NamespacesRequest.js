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

  
  

  
  var NamespacesRequest = function NamespacesRequest(parent_namespace, namespace, stewards) { 
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['namespace'] = namespace;
    
    /**
     * datatype: String
     * required
     **/
    self['parent_namespace'] = parentNamespace;
    
    /**
     * datatype: [String]
     * required
     **/
    self['stewards'] = stewards;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['namespace'] = ApiClient.convertToType(data['namespace'], 'String');
      
      self['parent_namespace'] = ApiClient.convertToType(data['parent_namespace'], 'String');
      
      self['stewards'] = ApiClient.convertToType(data['stewards'], ['String']);
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getNamespace = function() {
      return self['namespace'];
    }

    /**
     * @param {String} namespace
     **/
    self.setNamespace = function(namespace) {
      self['namespace'] = namespace;
    }
    
    /**
     * @return {String}
     **/
    self.getParentNamespace = function() {
      return self['parent_namespace'];
    }

    /**
     * @param {String} parentNamespace
     **/
    self.setParentNamespace = function(parentNamespace) {
      self['parent_namespace'] = parentNamespace;
    }
    
    /**
     * @return {[String]}
     **/
    self.getStewards = function() {
      return self['stewards'];
    }

    /**
     * @param {[String]} stewards
     **/
    self.setStewards = function(stewards) {
      self['stewards'] = stewards;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.NamespacesRequest = NamespacesRequest;
  }

  return NamespacesRequest;
  
  
}));
