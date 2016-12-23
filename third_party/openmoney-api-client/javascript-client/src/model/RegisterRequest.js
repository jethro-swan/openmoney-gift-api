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

  
  

  
  var RegisterRequest = function RegisterRequest(password, stewardname) { 
    var self = this;
    
    /**
     * Stewards name
     * datatype: String
     * required
     **/
    self['stewardname'] = stewardname;
    
    /**
     * Stewards password
     * datatype: String
     * required
     **/
    self['password'] = password;
    
    /**
     * Stewards 1024bit - 4096bit RSA public key. command: openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096 ,openssl rsa -pubout -in private_key.pem -out public_key.pem , you can deterministically generate an RSA key from a passphrase http://crypto.stackexchange.com/questions/24514/deterministically-generate-a-rsa-public-private-key-pair-from-a-passphrase-with you can also use this service to generate a key online: http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/
     * datatype: String
     **/
    self['publicKey'] = null;
    
    /**
     * Stewards email address
     * datatype: String
     **/
    self['email'] = null;
    
    /**
     * Does steward wish to receive email notifications
     * datatype: Boolean
     **/
    self['email_notifications'] = null;
    

    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }
      
      self['stewardname'] = ApiClient.convertToType(data['stewardname'], 'String');
      
      self['password'] = ApiClient.convertToType(data['password'], 'String');
      
      self['publicKey'] = ApiClient.convertToType(data['publicKey'], 'String');
      
      self['email'] = ApiClient.convertToType(data['email'], 'String');
      
      self['email_notifications'] = ApiClient.convertToType(data['email_notifications'], 'Boolean');
      
      return this;
    }

    
    /**
     * get Stewards name
     * @return {String}
     **/
    self.getStewardname = function() {
      return self['stewardname'];
    }

    /**
     * set Stewards name
     * @param {String} stewardname
     **/
    self.setStewardname = function(stewardname) {
      self['stewardname'] = stewardname;
    }
    
    /**
     * get Stewards password
     * @return {String}
     **/
    self.getPassword = function() {
      return self['password'];
    }

    /**
     * set Stewards password
     * @param {String} password
     **/
    self.setPassword = function(password) {
      self['password'] = password;
    }
    
    /**
     * get Stewards 1024bit - 4096bit RSA public key. command: openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096 ,openssl rsa -pubout -in private_key.pem -out public_key.pem , you can deterministically generate an RSA key from a passphrase http://crypto.stackexchange.com/questions/24514/deterministically-generate-a-rsa-public-private-key-pair-from-a-passphrase-with you can also use this service to generate a key online: http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/
     * @return {String}
     **/
    self.getPublicKey = function() {
      return self['publicKey'];
    }

    /**
     * set Stewards 1024bit - 4096bit RSA public key. command: openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096 ,openssl rsa -pubout -in private_key.pem -out public_key.pem , you can deterministically generate an RSA key from a passphrase http://crypto.stackexchange.com/questions/24514/deterministically-generate-a-rsa-public-private-key-pair-from-a-passphrase-with you can also use this service to generate a key online: http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/
     * @param {String} publicKey
     **/
    self.setPublicKey = function(publicKey) {
      self['publicKey'] = publicKey;
    }
    
    /**
     * get Stewards email address
     * @return {String}
     **/
    self.getEmail = function() {
      return self['email'];
    }

    /**
     * set Stewards email address
     * @param {String} email
     **/
    self.setEmail = function(email) {
      self['email'] = email;
    }
    
    /**
     * get Does steward wish to receive email notifications
     * @return {Boolean}
     **/
    self.getEmailNotifications = function() {
      return self['email_notifications'];
    }

    /**
     * set Does steward wish to receive email notifications
     * @param {Boolean} emailNotifications
     **/
    self.setEmailNotifications = function(emailNotifications) {
      self['email_notifications'] = emailNotifications;
    }
    

    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.RegisterRequest = RegisterRequest;
  }

  return RegisterRequest;
  
  
}));
