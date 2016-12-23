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





  var TokenResponse = function TokenResponse(access_token, expires) {
    var self = this;

    /**
     * datatype: String
     * required
     **/
    self['access_token'] = access_token;

    /**
     * datatype: String
     * required
     **/
    self['expires'] = expires;


    self.constructFromObject = function(data) {
      if (!data) {
        return this;
      }

      self['access_token'] = ApiClient.convertToType(data['access_token'], 'String');

      self['expires'] = ApiClient.convertToType(data['expires'], 'String');

      return this;
    }


    /**
     * @return {String}
     **/
    self.getAccessToken = function() {
      return self['access_token'];
    }

    /**
     * @param {String} accessToken
     **/
    self.setAccessToken = function(accessToken) {
      self['access_token'] = accessToken;
    }

    /**
     * @return {String}
     **/
    self.getExpires = function() {
      return self['expires'];
    }

    /**
     * @param {String} expires
     **/
    self.setExpires = function(expires) {
      self['expires'] = expires;
    }


    self.toJson = function() {
      return JSON.stringify(self);
    }
  };

  if (module) {
    module.TokenResponse = TokenResponse;
  }

  return TokenResponse;


}));
