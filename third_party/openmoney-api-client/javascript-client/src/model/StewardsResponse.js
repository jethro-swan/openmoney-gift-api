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

  
  

  
  var StewardsResponse = function StewardsResponse(stewardname) { 
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['stewardname'] = stewardname;
    
    /**
     * datatype: String
     **/
    self['publicKey'] = null;
    
    /**
     * datatype: String
     **/
    self['email'] = null;
    
    /**
     * datatype: Boolean
     **/
    self['email_notifications'] = null;
    
    /**
     * timestamp in milliseconds since epoch
     * datatype: Integer
     **/
    self['created'] = null;
    
    /**
     * stewardname of steward who made change
     * datatype: String
     **/
    self['created_by'] = null;
    
    /**
     * datatype: [Modification]
     **/
    self['modifications'] = [];
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['stewardname'] = ApiClient.convertToType(data['stewardname'], 'String');
      
      self['publicKey'] = ApiClient.convertToType(data['publicKey'], 'String');
      
      self['email'] = ApiClient.convertToType(data['email'], 'String');
      
      self['email_notifications'] = ApiClient.convertToType(data['email_notifications'], 'Boolean');
      
      self['created'] = ApiClient.convertToType(data['created'], 'Integer');
      
      self['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      
      self['modifications'] = ApiClient.convertToType(data['modifications'], [Modification]);
      
      return this;
    }

    
    /**
     * @return {String}
     **/
    self.getStewardname = function() {
      return self['stewardname'];
    }

    /**
     * @param {String} stewardname
     **/
    self.setStewardname = function(stewardname) {
      self['stewardname'] = stewardname;
    }
    
    /**
     * @return {String}
     **/
    self.getPublicKey = function() {
      return self['publicKey'];
    }

    /**
     * @param {String} publicKey
     **/
    self.setPublicKey = function(publicKey) {
      self['publicKey'] = publicKey;
    }
    
    /**
     * @return {String}
     **/
    self.getEmail = function() {
      return self['email'];
    }

    /**
     * @param {String} email
     **/
    self.setEmail = function(email) {
      self['email'] = email;
    }
    
    /**
     * @return {Boolean}
     **/
    self.getEmailNotifications = function() {
      return self['email_notifications'];
    }

    /**
     * @param {Boolean} emailNotifications
     **/
    self.setEmailNotifications = function(emailNotifications) {
      self['email_notifications'] = emailNotifications;
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
     * get stewardname of steward who made change
     * @return {String}
     **/
    self.getCreatedBy = function() {
      return self['created_by'];
    }

    /**
     * set stewardname of steward who made change
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
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.StewardsResponse = StewardsResponse;
  }

  return StewardsResponse;
  
  
}));
