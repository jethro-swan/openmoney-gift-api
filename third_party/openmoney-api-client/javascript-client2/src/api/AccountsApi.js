/**
 * Openmoney API
 * Openmoney API
 *
 * OpenAPI spec version: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/DeleteResponse', 'model/ErrorModel', 'model/AccountsResponse', 'model/AccountsGet', 'model/AccountsList', 'model/AccountsRequest', 'model/CreateResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/DeleteResponse'), require('../model/ErrorModel'), require('../model/AccountsResponse'), require('../model/AccountsGet'), require('../model/AccountsList'), require('../model/AccountsRequest'), require('../model/CreateResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    root.OpenmoneyApi.AccountsApi = factory(root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.DeleteResponse, root.OpenmoneyApi.ErrorModel, root.OpenmoneyApi.AccountsResponse, root.OpenmoneyApi.AccountsGet, root.OpenmoneyApi.AccountsList, root.OpenmoneyApi.AccountsRequest, root.OpenmoneyApi.CreateResponse);
  }
}(this, function(ApiClient, DeleteResponse, ErrorModel, AccountsResponse, AccountsGet, AccountsList, AccountsRequest, CreateResponse) {
  'use strict';

  /**
   * Accounts service.
   * @module api/AccountsApi
   * @version 2.0.0
   */

  /**
   * Constructs a new AccountsApi. 
   * @alias module:api/AccountsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the accountsDelete operation.
     * @callback module:api/AccountsApi~accountsDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete an account
     * @param {String} stewardname 
     * @param {String} namespace 
     * @param {String} account 
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization Authorization Token
     * @param {module:api/AccountsApi~accountsDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteResponse}
     */
    this.accountsDelete = function(stewardname, namespace, account, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'stewardname' is set
      if (stewardname == undefined || stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsDelete";
      }

      // verify the required parameter 'namespace' is set
      if (namespace == undefined || namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsDelete";
      }

      // verify the required parameter 'account' is set
      if (account == undefined || account == null) {
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
        'Authorization': opts['authorization']
      };
      var formParams = {
      };

      var authNames = ['basicAuthenticationSecurity', 'oauth2PasswordSecurity', 'oauth2ApplicationSecurity', 'oauth2ImplicitSecurity', 'apiKeySecurity', 'oauth2AccessCodeSecurity'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = DeleteResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/accounts/{account}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the accountsDiscovery operation.
     * @callback module:api/AccountsApi~accountsDiscoveryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AccountsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Lookup an account by it&#39;s public key
     * @param {String} stewardname 
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization Authorization Token
     * @param {String} opts.publicKey Accounts public Key
     * @param {module:api/AccountsApi~accountsDiscoveryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AccountsResponse}
     */
    this.accountsDiscovery = function(stewardname, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'stewardname' is set
      if (stewardname == undefined || stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsDiscovery";
      }


      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
        'publicKey': opts['publicKey']
      };
      var headerParams = {
        'Authorization': opts['authorization']
      };
      var formParams = {
      };

      var authNames = ['basicAuthenticationSecurity', 'oauth2PasswordSecurity', 'oauth2ApplicationSecurity', 'oauth2ImplicitSecurity', 'apiKeySecurity', 'oauth2AccessCodeSecurity'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = AccountsResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/accounts/lookup', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the accountsGet operation.
     * @callback module:api/AccountsApi~accountsGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AccountsGet} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get an account by account name
     * @param {String} stewardname 
     * @param {String} namespace 
     * @param {String} account 
     * @param {String} currency 
     * @param {String} currencyNamespace 
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization Authorization Token
     * @param {module:api/AccountsApi~accountsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AccountsGet}
     */
    this.accountsGet = function(stewardname, namespace, account, currency, currencyNamespace, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'stewardname' is set
      if (stewardname == undefined || stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsGet";
      }

      // verify the required parameter 'namespace' is set
      if (namespace == undefined || namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsGet";
      }

      // verify the required parameter 'account' is set
      if (account == undefined || account == null) {
        throw "Missing the required parameter 'account' when calling accountsGet";
      }

      // verify the required parameter 'currency' is set
      if (currency == undefined || currency == null) {
        throw "Missing the required parameter 'currency' when calling accountsGet";
      }

      // verify the required parameter 'currencyNamespace' is set
      if (currencyNamespace == undefined || currencyNamespace == null) {
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
        'Authorization': opts['authorization']
      };
      var formParams = {
      };

      var authNames = ['basicAuthenticationSecurity', 'oauth2PasswordSecurity', 'oauth2ApplicationSecurity', 'oauth2ImplicitSecurity', 'apiKeySecurity', 'oauth2AccessCodeSecurity'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = AccountsGet;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/accounts/{account}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the accountsList operation.
     * @callback module:api/AccountsApi~accountsListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AccountsList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a Listing of accounts in a namespace
     * @param {String} stewardname 
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization Authorization Token
     * @param {String} opts.namespace 
     * @param {String} opts.currency 
     * @param {String} opts.currencyNamespace 
     * @param {module:api/AccountsApi~accountsListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AccountsList}
     */
    this.accountsList = function(stewardname, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'stewardname' is set
      if (stewardname == undefined || stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsList";
      }


      var pathParams = {
        'stewardname': stewardname
      };
      var queryParams = {
        'namespace': opts['namespace'],
        'currency': opts['currency'],
        'currency_namespace': opts['currencyNamespace']
      };
      var headerParams = {
        'Authorization': opts['authorization']
      };
      var formParams = {
      };

      var authNames = ['basicAuthenticationSecurity', 'oauth2PasswordSecurity', 'oauth2ApplicationSecurity', 'oauth2ImplicitSecurity', 'apiKeySecurity', 'oauth2AccessCodeSecurity'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = AccountsList;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/accounts', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the accountsPost operation.
     * @callback module:api/AccountsApi~accountsPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * create an account in a namespace
     * @param {String} stewardname 
     * @param {String} namespace 
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization Authorization Token
     * @param {module:model/AccountsRequest} opts.account 
     * @param {module:api/AccountsApi~accountsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteResponse}
     */
    this.accountsPost = function(stewardname, namespace, opts, callback) {
      opts = opts || {};
      var postBody = opts['account'];

      // verify the required parameter 'stewardname' is set
      if (stewardname == undefined || stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsPost";
      }

      // verify the required parameter 'namespace' is set
      if (namespace == undefined || namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsPost";
      }


      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace
      };
      var queryParams = {
      };
      var headerParams = {
        'Authorization': opts['authorization']
      };
      var formParams = {
      };

      var authNames = ['basicAuthenticationSecurity', 'oauth2PasswordSecurity', 'oauth2ApplicationSecurity', 'oauth2ImplicitSecurity', 'apiKeySecurity', 'oauth2AccessCodeSecurity'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = DeleteResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/accounts', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the accountsPut operation.
     * @callback module:api/AccountsApi~accountsPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an account
     * @param {String} stewardname 
     * @param {String} namespace 
     * @param {String} account Account Name
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization Authorization Token
     * @param {module:model/AccountsRequest} opts.accounts 
     * @param {module:api/AccountsApi~accountsPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateResponse}
     */
    this.accountsPut = function(stewardname, namespace, account, opts, callback) {
      opts = opts || {};
      var postBody = opts['accounts'];

      // verify the required parameter 'stewardname' is set
      if (stewardname == undefined || stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling accountsPut";
      }

      // verify the required parameter 'namespace' is set
      if (namespace == undefined || namespace == null) {
        throw "Missing the required parameter 'namespace' when calling accountsPut";
      }

      // verify the required parameter 'account' is set
      if (account == undefined || account == null) {
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
        'Authorization': opts['authorization']
      };
      var formParams = {
      };

      var authNames = ['basicAuthenticationSecurity', 'oauth2PasswordSecurity', 'oauth2ApplicationSecurity', 'oauth2ImplicitSecurity', 'apiKeySecurity', 'oauth2AccessCodeSecurity'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = CreateResponse;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/accounts/{account}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
