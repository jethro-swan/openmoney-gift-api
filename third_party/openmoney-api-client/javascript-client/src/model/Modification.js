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

  
  

  
  var Modification = function Modification() { 
    var self = this;
    
    /**
     * timestamp in milliseconds since epoch
     * datatype: Integer
     **/
    self['modified'] = null;
    
    /**
     * stewardname of steward who made modification
     * datatype: String
     **/
    self['modified_by'] = null;
    
    /**
     * human readable description of modification
     * datatype: String
     **/
    self['modification'] = null;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['modified'] = ApiClient.convertToType(data['modified'], 'Integer');
      
      self['modified_by'] = ApiClient.convertToType(data['modified_by'], 'String');
      
      self['modification'] = ApiClient.convertToType(data['modification'], 'String');
      
      return this;
    }

    
    /**
     * get timestamp in milliseconds since epoch
     * @return {Integer}
     **/
    self.getModified = function() {
      return self['modified'];
    }

    /**
     * set timestamp in milliseconds since epoch
     * @param {Integer} modified
     **/
    self.setModified = function(modified) {
      self['modified'] = modified;
    }
    
    /**
     * get stewardname of steward who made modification
     * @return {String}
     **/
    self.getModifiedBy = function() {
      return self['modified_by'];
    }

    /**
     * set stewardname of steward who made modification
     * @param {String} modifiedBy
     **/
    self.setModifiedBy = function(modifiedBy) {
      self['modified_by'] = modifiedBy;
    }
    
    /**
     * get human readable description of modification
     * @return {String}
     **/
    self.getModification = function() {
      return self['modification'];
    }

    /**
     * set human readable description of modification
     * @param {String} modification
     **/
    self.setModification = function(modification) {
      self['modification'] = modification;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.Modification = Modification;
  }

  return Modification;
  
  
}));
