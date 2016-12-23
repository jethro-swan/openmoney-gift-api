(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ErrorModel', '../model/CurrenciesList', '../model/CreateResponse', '../model/CurrenciesRequest', '../model/CurrenciesGet', '../model/DeleteResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ErrorModel'), require('../model/CurrenciesList'), require('../model/CreateResponse'), require('../model/CurrenciesRequest'), require('../model/CurrenciesGet'), require('../model/DeleteResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    root.OpenmoneyApi.CurrenciesApi = factory(root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.ErrorModel, root.OpenmoneyApi.CurrenciesList, root.OpenmoneyApi.CreateResponse, root.OpenmoneyApi.CurrenciesRequest, root.OpenmoneyApi.CurrenciesGet, root.OpenmoneyApi.DeleteResponse);
  }
}(this, function(ApiClient, ErrorModel, CurrenciesList, CreateResponse, CurrenciesRequest, CurrenciesGet, DeleteResponse) {
  'use strict';

  var CurrenciesApi = function CurrenciesApi(apiClient) {
    this.apiClient = apiClient || ApiClient.default;

    var self = this;
    
    
    /**
     * Get a Listing currencies known by steward.
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CurrenciesList
     */
    self.currenciesList = function(stewardname, namespace, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling currenciesList";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling currenciesList";
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
      var returnType = CurrenciesList;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/currencies', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Create a currency
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  authorization Authorization Token
     * @param {CurrenciesRequest}  currency 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CreateResponse
     */
    self.currenciesPost = function(stewardname, namespace, authorization, currency, callback) {
      var postBody = currency;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling currenciesPost";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling currenciesPost";
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
        '/stewards/{stewardname}/namespaces/{namespace}/currencies', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Get a currency by its name
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  currency Name of a currency
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CurrenciesGet
     */
    self.currenciesGet = function(stewardname, namespace, currency, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling currenciesGet";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling currenciesGet";
      }
      
      // verify the required parameter 'currency' is set
      if (currency == null) {
        throw "Missing the required parameter 'currency' when calling currenciesGet";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace,
        'currency': currency
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
      var returnType = CurrenciesGet;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/currencies/{currency}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Update a Currency
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  currency Name of a currency
     * @param {String}  authorization Authorization Token
     * @param {CurrenciesRequest}  currencies 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CreateResponse
     */
    self.currenciesPut = function(stewardname, namespace, currency, authorization, currencies, callback) {
      var postBody = currencies;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling currenciesPut";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling currenciesPut";
      }
      
      // verify the required parameter 'currency' is set
      if (currency == null) {
        throw "Missing the required parameter 'currency' when calling currenciesPut";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace,
        'currency': currency
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
        '/stewards/{stewardname}/namespaces/{namespace}/currencies/{currency}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Delete a currency
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  currency Currency name
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: DeleteResponse
     */
    self.currenciesDelete = function(stewardname, namespace, currency, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling currenciesDelete";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling currenciesDelete";
      }
      
      // verify the required parameter 'currency' is set
      if (currency == null) {
        throw "Missing the required parameter 'currency' when calling currenciesDelete";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace,
        'currency': currency
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
        '/stewards/{stewardname}/namespaces/{namespace}/currencies/{currency}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    
  };

  return CurrenciesApi;
}));
