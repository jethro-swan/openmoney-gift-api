(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([undefined, '../ApiClient', './Modification'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(undefined, require('../ApiClient'), require('./Modification'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    factory(root.OpenmoneyApi, root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.Modification);
  }
}(this, function(module, ApiClient, Modification) {
  'use strict';

  
  

  
  var NamespacesResponse = function NamespacesResponse(parent_namespace, namespace, stewards) { 
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
     * timestamp in milliseconds since epoch
     * datatype: Integer
     **/
    self['created'] = null;
    
    /**
     * stewardname of who created space
     * datatype: String
     **/
    self['created_by'] = null;
    
    /**
     * datatype: [Modification]
     **/
    self['modifications'] = [];
    
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
      
      self['created'] = ApiClient.convertToType(data['created'], 'Integer');
      
      self['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      
      self['modifications'] = ApiClient.convertToType(data['modifications'], [Modification]);
      
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
     * get timestamp in milliseconds since epoch
     * @return {Integer}
     **/
    self.getCreated = function() {
      return self['created'];
    }

    /**
     * set timestamp in milliseconds since epoch
     * @param {Integer} created
     **/
    self.setCreated = function(created) {
      self['created'] = created;
    }
    
    /**
     * get stewardname of who created space
     * @return {String}
     **/
    self.getCreatedBy = function() {
      return self['created_by'];
    }

    /**
     * set stewardname of who created space
     * @param {String} createdBy
     **/
    self.setCreatedBy = function(createdBy) {
      self['created_by'] = createdBy;
    }
    
    /**
     * @return {[Modification]}
     **/
    self.getModifications = function() {
      return self['modifications'];
    }

    /**
     * @param {[Modification]} modifications
     **/
    self.setModifications = function(modifications) {
      self['modifications'] = modifications;
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
    module.NamespacesResponse = NamespacesResponse;
  }

  return NamespacesResponse;
  
  
}));
