(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/StewardsList', '../model/ErrorModel', '../model/RegisterRequest', '../model/RegisterResponse', '../model/StewardsGet', '../model/StewardsRequest', '../model/CreateResponse', '../model/DeleteResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/StewardsList'), require('../model/ErrorModel'), require('../model/RegisterRequest'), require('../model/RegisterResponse'), require('../model/StewardsGet'), require('../model/StewardsRequest'), require('../model/CreateResponse'), require('../model/DeleteResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    root.OpenmoneyApi.StewardsApi = factory(root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.StewardsList, root.OpenmoneyApi.ErrorModel, root.OpenmoneyApi.RegisterRequest, root.OpenmoneyApi.RegisterResponse, root.OpenmoneyApi.StewardsGet, root.OpenmoneyApi.StewardsRequest, root.OpenmoneyApi.CreateResponse, root.OpenmoneyApi.DeleteResponse);
  }
}(this, function(ApiClient, StewardsList, ErrorModel, RegisterRequest, RegisterResponse, StewardsGet, StewardsRequest, CreateResponse, DeleteResponse) {
  'use strict';

  var StewardsApi = function StewardsApi(apiClient) {
    this.apiClient = apiClient || ApiClient.default;

    var self = this;
    
    
    /**
     * Get a listing of known stewards
     * 
     * @param {String}  authorization 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: StewardsList
     */
    self.stewardsList = function(authorization, callback) {
      var postBody = null;
      

      
      var pathParams = {
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
      var returnType = StewardsList;

      return this.apiClient.callApi(
        '/stewards', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Register a steward on the system
     * 
     * @param {RegisterRequest}  registerRequest Registration Request
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: RegisterResponse
     */
    self.stewardsPost = function(registerRequest, callback) {
      var postBody = registerRequest;
      
      // verify the required parameter 'registerRequest' is set
      if (registerRequest == null) {
        throw "Missing the required parameter 'registerRequest' when calling stewardsPost";
      }
      

      
      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = RegisterResponse;

      return this.apiClient.callApi(
        '/stewards', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Get a single steward
     * 
     * @param {String}  stewardname 
     * @param {String}  authorization 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: StewardsGet
     */
    self.stewardsGet = function(stewardname, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling stewardsGet";
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
      var returnType = StewardsGet;

      return this.apiClient.callApi(
        '/stewards/{stewardname}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Update a steward account
     * 
     * @param {String}  stewardname 
     * @param {StewardsRequest}  steward Steward Document
     * @param {String}  authorization 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CreateResponse
     */
    self.stewardsPut = function(stewardname, steward, authorization, callback) {
      var postBody = steward;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling stewardsPut";
      }
      
      // verify the required parameter 'steward' is set
      if (steward == null) {
        throw "Missing the required parameter 'steward' when calling stewardsPut";
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
      var returnType = CreateResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Delete a steward account
     * 
     * @param {String}  stewardname 
     * @param {String}  authorization 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: DeleteResponse
     */
    self.stewardsDelete = function(stewardname, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling stewardsDelete";
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
      var returnType = DeleteResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    
  };

  return StewardsApi;
}));
