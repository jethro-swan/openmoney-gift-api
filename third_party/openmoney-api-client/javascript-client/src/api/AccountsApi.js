(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/AccountsResponse', '../model/ErrorModel', '../model/AccountsList', '../model/DeleteResponse', '../model/AccountsRequest', '../model/AccountsGet', '../model/CreateResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/AccountsResponse'), require('../model/ErrorModel'), require('../model/AccountsList'), require('../model/DeleteResponse'), require('../model/AccountsRequest'), require('../model/AccountsGet'), require('../model/CreateResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    root.OpenmoneyApi.AccountsApi = factory(root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.AccountsResponse, root.OpenmoneyApi.ErrorModel, root.OpenmoneyApi.AccountsList, root.OpenmoneyApi.DeleteResponse, root.OpenmoneyApi.AccountsRequest, root.OpenmoneyApi.AccountsGet, root.OpenmoneyApi.CreateResponse);
  }
}(this, function(ApiClient, AccountsResponse, ErrorModel, AccountsList, DeleteResponse, AccountsRequest, AccountsGet, CreateResponse) {
  'use strict';

  var AccountsApi = function AccountsApi(apiClient) {
    this.apiClient = apiClient || ApiClient.default;

    var self = this;
    
    
    /**
     * Lookup an account by it&#39;s public key
     * 
     * @param {String}  stewardname 
     * @param {String}  authorization Authorization Token
     * @param {String}  publicKey Accounts public Key
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: AccountsResponse
     */
    self.accountsDiscovery = function(stewardname, authorization, publicKey, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsDiscovery";
      }
      

      
      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
        'publicKey': publicKey
      };
      var headerParams = {
        'Authorization': authorization
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = AccountsResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/accounts/lookup', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Get a Listing of accounts in a namespace
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  currency 
     * @param {String}  currencyNamespace 
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: AccountsList
     */
    self.accountsList = function(stewardname, namespace, currency, currencyNamespace, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsList";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsList";
      }
      
      // verify the required parameter 'currency' is set
      if (currency == null) {
        throw "Missing the required parameter 'currency' when calling accountsList";
      }
      
      // verify the required parameter 'currencyNamespace' is set
      if (currencyNamespace == null) {
        throw "Missing the required parameter 'currencyNamespace' when calling accountsList";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace
      };
      var queryParams = {
        'currency': currency,
        'currency_namespace': currencyNamespace
      };
      var headerParams = {
        'Authorization': authorization
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = AccountsList;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/accounts', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * create an account in a namespace
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  authorization Authorization Token
     * @param {AccountsRequest}  account 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: DeleteResponse
     */
    self.accountsPost = function(stewardname, namespace, authorization, account, callback) {
      var postBody = account;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsPost";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsPost";
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
        '/stewards/{stewardname}/namespaces/{namespace}/accounts', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Get an account by account name
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  account 
     * @param {String}  currency 
     * @param {String}  currencyNamespace 
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: AccountsGet
     */
    self.accountsGet = function(stewardname, namespace, account, currency, currencyNamespace, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsGet";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsGet";
      }
      
      // verify the required parameter 'account' is set
      if (account == null) {
        throw "Missing the required parameter 'account' when calling accountsGet";
      }
      
      // verify the required parameter 'currency' is set
      if (currency == null) {
        throw "Missing the required parameter 'currency' when calling accountsGet";
      }
      
      // verify the required parameter 'currencyNamespace' is set
      if (currencyNamespace == null) {
        throw "Missing the required parameter 'currencyNamespace' when calling accountsGet";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace,
        'account': account
      };
      var queryParams = {
        'currency': currency,
        'currency_namespace': currencyNamespace
      };
      var headerParams = {
        'Authorization': authorization
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = AccountsGet;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/accounts/{account}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Update an account
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  account Account Name
     * @param {String}  authorization Authorization Token
     * @param {AccountsRequest}  accounts 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CreateResponse
     */
    self.accountsPut = function(stewardname, namespace, account, authorization, accounts, callback) {
      var postBody = accounts;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsPut";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsPut";
      }
      
      // verify the required parameter 'account' is set
      if (account == null) {
        throw "Missing the required parameter 'account' when calling accountsPut";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace,
        'account': account
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
        '/stewards/{stewardname}/namespaces/{namespace}/accounts/{account}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Delete an account
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  account 
     * @param {String}  authorization Authorization Token
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: DeleteResponse
     */
    self.accountsDelete = function(stewardname, namespace, account, authorization, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsDelete";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsDelete";
      }
      
      // verify the required parameter 'account' is set
      if (account == null) {
        throw "Missing the required parameter 'account' when calling accountsDelete";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace,
        'account': account
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
        '/stewards/{stewardname}/namespaces/{namespace}/accounts/{account}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    
  };

  return AccountsApi;
}));
