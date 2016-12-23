(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([undefined, '../ApiClient', './AesEncryption'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(undefined, require('../ApiClient'), require('./AesEncryption'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    factory(root.OpenmoneyApi, root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.AesEncryption);
  }
}(this, function(module, ApiClient, AesEncryption) {
  'use strict';

  
  

  
  var EncryptedJournals = function EncryptedJournals() { 
    var self = this;
    
    /**
     * datatype: String
     **/
    self['id'] = null;
    
    /**
     * datatype: String
     **/
    self['type'] = null;
    
    /**
     * datatype: String
     **/
    self['algorithm'] = null;
    
    /**
     * datatype: String
     **/
    self['publicKeyEncryptedSymetricKey'] = null;
    
    /**
     * datatype: String
     **/
    self['initializationVector'] = null;
    
    /**
     * datatype: AesEncryption
     **/
    self['encryptedJournal'] = new AesEncryption();
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['id'] = ApiClient.convertToType(data['id'], 'String');
      
      self['type'] = ApiClient.convertToType(data['type'], 'String');
      
      self['algorithm'] = ApiClient.convertToType(data['algorithm'], 'String');
      
      self['publicKeyEncryptedSymetricKey'] = ApiClient.convertToType(data['publicKeyEncryptedSymetricKey'], 'String');
      
      self['initializationVector'] = ApiClient.convertToType(data['initializationVector'], 'String');
      
      self['encryptedJournal'].constructFromObject(data['encryptedJournal']);
      
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
     * @return {String}
     **/
    self.getType = function() {
      return self['type'];
    }

    /**
     * @param {String} type
     **/
    self.setType = function(type) {
      self['type'] = type;
    }
    
    /**
     * @return {String}
     **/
    self.getAlgorithm = function() {
      return self['algorithm'];
    }

    /**
     * @param {String} algorithm
     **/
    self.setAlgorithm = function(algorithm) {
      self['algorithm'] = algorithm;
    }
    
    /**
     * @return {String}
     **/
    self.getPublicKeyEncryptedSymetricKey = function() {
      return self['publicKeyEncryptedSymetricKey'];
    }

    /**
     * @param {String} publicKeyEncryptedSymetricKey
     **/
    self.setPublicKeyEncryptedSymetricKey = function(publicKeyEncryptedSymetricKey) {
      self['publicKeyEncryptedSymetricKey'] = publicKeyEncryptedSymetricKey;
    }
    
    /**
     * @return {String}
     **/
    self.getInitializationVector = function() {
      return self['initializationVector'];
    }

    /**
     * @param {String} initializationVector
     **/
    self.setInitializationVector = function(initializationVector) {
      self['initializationVector'] = initializationVector;
    }
    
    /**
     * @return {AesEncryption}
     **/
    self.getEncryptedJournal = function() {
      return self['encryptedJournal'];
    }

    /**
     * @param {AesEncryption} encryptedJournal
     **/
    self.setEncryptedJournal = function(encryptedJournal) {
      self['encryptedJournal'] = encryptedJournal;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.EncryptedJournals = EncryptedJournals;
  }

  return EncryptedJournals;
  
  
}));
