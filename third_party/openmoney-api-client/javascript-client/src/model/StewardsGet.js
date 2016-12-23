(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([undefined, '../ApiClient', './GetResponse', './Modification'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(undefined, require('../ApiClient'), require('./GetResponse'), require('./Modification'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    factory(root.OpenmoneyApi, root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.GetResponse, root.OpenmoneyApi.Modification);
  }
}(this, function(module, ApiClient, GetResponse, Modification) {
  'use strict';

  
  

  
  var StewardsGet = function StewardsGet(stewardname, id) { /* extends GetResponse*/
    var self = this;
    
    /**
     * datatype: String
     * required
     **/
    self['stewardname'] = stewardname;
    
    /**
     * timestamp in milliseconds since epoch
     * datatype: Integer
     **/
    self['created'] = null;
    
    /**
     * datatype: Boolean
     **/
    self['email_notifications'] = null;
    
    /**
     * datatype: String
     * required
     **/
    self['id'] = id;
    
    /**
     * datatype: String
     **/
    self['publicKey'] = null;
    
    /**
     * stewardname of steward who made change
     * datatype: String
     **/
    self['created_by'] = null;
    
    /**
     * datatype: String
     **/
    self['email'] = null;
    
    /**
     * datatype: [Modification]
     **/
    self['modifications'] = [];
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['stewardname'] = ApiClient.convertToType(data['stewardname'], 'String');
      
      self['created'] = ApiClient.convertToType(data['created'], 'Integer');
      
      self['email_notifications'] = ApiClient.convertToType(data['email_notifications'], 'Boolean');
      
      self['id'] = ApiClient.convertToType(data['id'], 'String');
      
      self['publicKey'] = ApiClient.convertToType(data['publicKey'], 'String');
      
      self['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      
      self['email'] = ApiClient.convertToType(data['email'], 'String');
      
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
    module.StewardsGet = StewardsGet;
  }

  return StewardsGet;
  
  
}));
