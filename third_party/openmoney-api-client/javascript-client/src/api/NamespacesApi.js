(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/NamespacesList', '../model/ErrorModel', '../model/NamespacesRequest', '../model/CreateResponse', '../model/NamespacesGet', '../model/DeleteResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/NamespacesList'), require('../model/ErrorModel'), require('../model/NamespacesRequest'), require('../model/CreateResponse'), require('../model/NamespacesGet'), require('../model/DeleteResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    root.OpenmoneyApi.NamespacesApi = factory(root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.NamespacesList, root.OpenmoneyApi.ErrorModel, root.OpenmoneyApi.NamespacesRequest, root.OpenmoneyApi.CreateResponse, root.OpenmoneyApi.NamespacesGet, root.OpenmoneyApi.DeleteResponse);
  }
}(this, function(ApiClient, NamespacesList, ErrorModel, NamespacesRequest, CreateResponse, NamespacesGet, DeleteResponse) {
  'use strict';

  var NamespacesApi = function NamespacesApi(apiClient) {
    this.apiClient = apiClient || ApiClient.default;

    var self = this;
    
    
    /**
     * Get a Listing of namespaces known by steward.
     * 
     * @param {String}  stewardname 
     * @param {String}  authorization Authorization Token
     * @param {String}  parentNamespace 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: NamespacesList
     */
    self.spacesList = function(stewardname, authorization, parentNamespace, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling spacesList";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
        'parent_namespace': parentNamespace
      };
      var headerParams = {
        'Authorization': authorization
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = NamespacesList;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Create a namespace
     * 
     * @param {String}  stewardname 
     * @param {NamespacesRequest}  space 
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CreateResponse
     */
    self.spacesPost = function(stewardname, space, authorization, callback) {
      var postBody = space;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling spacesPost";
      }
      
      // verify the required parameter 'space' is set
      if (space == null) {
        throw "Missing the required parameter 'space' when calling spacesPost";
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
        '/stewards/{stewardname}/namespaces', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Get a namespace by it&#39;s name
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace space name
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: NamespacesGet
     */
    self.spacesGet = function(stewardname, namespace, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling spacesGet";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling spacesGet";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace
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
      var returnType = NamespacesGet;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Update a namespace
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace space name
     * @param {String}  authorization Authorization Token
     * @param {NamespacesRequest}  space 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CreateResponse
     */
    self.spacesPut = function(stewardname, namespace, authorization, space, callback) {
      var postBody = space;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling spacesPut";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling spacesPut";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace
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
        '/stewards/{stewardname}/namespaces/{namespace}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * 
     * Delete a namespace
     * @param {String}  stewardname 
     * @param {String}  namespace namespace name
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: DeleteResponse
     */
    self.spacesDelete = function(stewardname, namespace, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling spacesDelete";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling spacesDelete";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace
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
        '/stewards/{stewardname}/namespaces/{namespace}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    
  };

  return NamespacesApi;
}));
