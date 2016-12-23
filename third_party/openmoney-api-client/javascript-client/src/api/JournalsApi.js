(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/JournalsList', '../model/ErrorModel', '../model/CreateResponse', '../model/JournalsRequest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/JournalsList'), require('../model/ErrorModel'), require('../model/CreateResponse'), require('../model/JournalsRequest'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    root.OpenmoneyApi.JournalsApi = factory(root.OpenmoneyApi.ApiClient, root.OpenmoneyApi.JournalsList, root.OpenmoneyApi.ErrorModel, root.OpenmoneyApi.CreateResponse, root.OpenmoneyApi.JournalsRequest);
  }
}(this, function(ApiClient, JournalsList, ErrorModel, CreateResponse, JournalsRequest) {
  'use strict';

  var JournalsApi = function JournalsApi(apiClient) {
    this.apiClient = apiClient || ApiClient.default;

    var self = this;
    
    
    /**
     * List Journal Entries for this accountname
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  account 
     * @param {String}  currency 
     * @param {String}  authorization Authorization Token
     * @param {String}  currencyNamespace 
     * @param {Integer}  offset 
     * @param {Integer}  range 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: JournalsList
     */
    self.journalsList = function(stewardname, namespace, account, currency, authorization, currencyNamespace, offset, range, callback) {
      var postBody = null;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling journalsList";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling journalsList";
      }
      
      // verify the required parameter 'account' is set
      if (account == null) {
        throw "Missing the required parameter 'account' when calling journalsList";
      }
      
      // verify the required parameter 'currency' is set
      if (currency == null) {
        throw "Missing the required parameter 'currency' when calling journalsList";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace,
        'account': account,
        'currency': currency
      };
      var queryParams = {
        'currency_namespace': currencyNamespace,
        'offset': offset,
        'range': range
      };
      var headerParams = {
        'Authorization': authorization
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'text/html'];
      var returnType = JournalsList;

      return this.apiClient.callApi(
        '/stewards/{stewardname}/namespaces/{namespace}/accounts/{account}/journals/{currency}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    /**
     * Create a journal entry for this account
     * 
     * @param {String}  stewardname 
     * @param {String}  namespace 
     * @param {String}  account 
     * @param {String}  currency 
     * @param {String}  authorization Authorization Token
     * @param {String}  currencyNamespace 
     * @param {JournalsRequest}  journal 
     * @param {function} callback the callback function, accepting three arguments: error, data, response
     *   data is of type: CreateResponse
     */
    self.journalsPost = function(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, callback) {
      var postBody = journal;
      
      // verify the required parameter 'stewardname' is set
      if (stewardname == null) {
        throw "Missing the required parameter 'stewardname' when calling journalsPost";
      }
      
      // verify the required parameter 'namespace' is set
      if (namespace == null) {
        throw "Missing the required parameter 'namespace' when calling journalsPost";
      }
      
      // verify the required parameter 'account' is set
      if (account == null) {
        throw "Missing the required parameter 'account' when calling journalsPost";
      }
      
      // verify the required parameter 'currency' is set
      if (currency == null) {
        throw "Missing the required parameter 'currency' when calling journalsPost";
      }
      

      
      var pathParams = {
        'stewardname': stewardname,
        'namespace': namespace,
        'account': account,
        'currency': currency
      };
      var queryParams = {
        'currency_namespace': currencyNamespace
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
        '/stewards/{stewardname}/namespaces/{namespace}/accounts/{account}/journals/{currency}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, callback
      );
      
    }
    
    
  };

  return JournalsApi;
}));
