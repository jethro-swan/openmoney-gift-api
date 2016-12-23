(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ErrorModel', '../model/OauthAuthorizeRequest', '../model/ApplicationResponse', '../model/ApplicationRequest', '../model/TokenResponse', '../model/AccessTokenRequest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ErrorModel'), require('../model/OauthAuthorizeRequest'), require('../model/ApplicationResponse'), require('../model/ApplicationRequest'), require('../model/TokenResponse'), require('../model/AccessTokenRequest'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    root.OpenmoneyApi.AuthApi = factory(root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.ErrorModel, root.OpenmoneyApi.OauthAuthorizeRequest, root.OpenmoneyApi.ApplicationResponse, root.OpenmoneyApi.ApplicationRequest, root.OpenmoneyApi.TokenResponse, root.OpenmoneyApi.AccessTokenRequest);
  }
}(this, function(ApiClient, ErrorModel, OauthAuthorizeRequest, ApplicationResponse, ApplicationRequest, TokenResponse, AccessTokenRequest) {
  'use strict';

  var AuthApi = function AuthApi(apiClient) {
    this.apiClient = apiClient || ApiClient.default;

    var self = this;
    
    
    /**
     * Get Steward account information
     * 
     * @param {String}  stewardname 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: 'String'
     */
    self.accountGet = function(stewardname, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountGet";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['text/html'];
      var returnType = 'String';

      return this.apiClient.callApi(
        '/stewards/{stewardname}/account', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Implicit authorization dialog presented to steward to authorize client_id to access API resources on their behalf.
     * 
     * @param {String}  stewardname 
     * @param {String}  clientId Client ID received during registration
     * @param {String}  redirectUri A uri to redirect steward after authorization
     * @param {[String]}  scopes A comma separated list of scopes. If not provided, scope defaults to an empty list of scopes for stewards that don’t have a valid token for the app. For stewards who do already have a valid token for the app, the steward won’t be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the same scopes that were used last time the steward completed the flow.
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: ErrorModel
     */
    self.oauthDialogeGet = function(stewardname, clientId, redirectUri, scopes, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling oauthDialogeGet";
      }
      
      // verify the required parameter 'clientId' is set
      if (clientId == null) {
        throw "Missing the required parameter 'clientId' when calling oauthDialogeGet";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
        'client_id': clientId,
        'redirect_uri': redirectUri,
        'scopes': this.buildCollectionParam(scopes, 'multi')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['text/html'];
      var returnType = ErrorModel;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/dialog/authorize', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Authorizes a steward on the openmoney network
     * Authorization dialoge decision with allowed scopes.
     * @param {String}  stewardname 
     * @param {OauthAuthorizeRequest}  oauthAuthorizeRequest 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: ErrorModel
     */
    self.oauthDialogePost = function(stewardname, oauthAuthorizeRequest, callback) {
      var postBody = oauthAuthorizeRequest;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling oauthDialogePost";
      }
      
      // verify the required parameter 'oauthAuthorizeRequest' is set
      if (oauthAuthorizeRequest == null) {
        throw "Missing the required parameter 'oauthAuthorizeRequest' when calling oauthDialogePost";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ErrorModel;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/dialog/authorize/decision', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Login Page for the steward
     * 
     * @param {String}  stewardname 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: 'String'
     */
    self.loginGet = function(stewardname, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling loginGet";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['text/plain'];
      var returnType = 'String';

      return this.apiClient.callApi(
        '/stewards/{stewardname}/login', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Login steward
     * 
     * @param {String}  stewardname 
     * @param {String}  authorization 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     */
    self.loginPost = function(stewardname, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling loginPost";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
      };
      var headerParams = {
        'Authorization': authorization
      };
      var formParams = {
      };

      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['text/plain'];
      var returnType = null;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/login', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Logout steward
     * 
     * @param {String}  stewardname 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     */
    self.logoutPost = function(stewardname, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling logoutPost";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = null;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/logout', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Create an application for a client_id and client_secret for oauth token authorization.
     * Existing steward Registers an application with the openmoney network.
     * @param {String}  stewardname 
     * @param {ApplicationRequest}  application Application Object
     * @param {String}  authorization 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: ApplicationResponse
     */
    self.oauthApplicationPost = function(stewardname, application, authorization, callback) {
      var postBody = application;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling oauthApplicationPost";
      }
      
      // verify the required parameter 'application' is set
      if (application == null) {
        throw "Missing the required parameter 'application' when calling oauthApplicationPost";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
      };
      var headerParams = {
        'Authorization': authorization
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ApplicationResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/oauth/application', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Exchanges the user or client credentials for an access token used to access resources.
     * 
     * @param {String}  stewardname 
     * @param {AccessTokenRequest}  accessTokenRequest Access Token Request Object
     * @param {String}  authorization 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: TokenResponse
     */
    self.oauthAccessTokenPost = function(stewardname, accessTokenRequest, authorization, callback) {
      var postBody = accessTokenRequest;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling oauthAccessTokenPost";
      }
      
      // verify the required parameter 'accessTokenRequest' is set
      if (accessTokenRequest == null) {
        throw "Missing the required parameter 'accessTokenRequest' when calling oauthAccessTokenPost";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
      };
      var headerParams = {
        'Authorization': authorization
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = TokenResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/oauth/token', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    
  };

  return AuthApi;
}));
