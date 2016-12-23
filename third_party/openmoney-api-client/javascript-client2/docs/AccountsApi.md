# OpenmoneyApi.AccountsApi

All URIs are relative to *https://cloud.openmoney.cc/V2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accountsDelete**](AccountsApi.md#accountsDelete) | **DELETE** /stewards/{stewardname}/namespaces/{namespace}/accounts/{account} | Delete an account
[**accountsDiscovery**](AccountsApi.md#accountsDiscovery) | **GET** /stewards/{stewardname}/accounts/lookup | Lookup an account by it&#39;s public key
[**accountsGet**](AccountsApi.md#accountsGet) | **GET** /stewards/{stewardname}/namespaces/{namespace}/accounts/{account} | Get an account by account name
[**accountsList**](AccountsApi.md#accountsList) | **GET** /stewards/{stewardname}/accounts | Get a Listing of accounts in a namespace
[**accountsPost**](AccountsApi.md#accountsPost) | **POST** /stewards/{stewardname}/namespaces/{namespace}/accounts | create an account in a namespace
[**accountsPut**](AccountsApi.md#accountsPut) | **PUT** /stewards/{stewardname}/namespaces/{namespace}/accounts/{account} | Update an account


<a name="accountsDelete"></a>
# **accountsDelete**
> DeleteResponse accountsDelete(stewardname, namespace, account, opts)

Delete an account

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');
var defaultClient = OpenmoneyApi.ApiClient.default;

// Configure HTTP basic authorization: basicAuthenticationSecurity
var basicAuthenticationSecurity = defaultClient.authentications['basicAuthenticationSecurity'];
basicAuthenticationSecurity.username = 'YOUR USERNAME';
basicAuthenticationSecurity.password = 'YOUR PASSWORD';

// Configure OAuth2 access token for authorization: oauth2PasswordSecurity
var oauth2PasswordSecurity = defaultClient.authentications['oauth2PasswordSecurity'];
oauth2PasswordSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ApplicationSecurity
var oauth2ApplicationSecurity = defaultClient.authentications['oauth2ApplicationSecurity'];
oauth2ApplicationSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ImplicitSecurity
var oauth2ImplicitSecurity = defaultClient.authentications['oauth2ImplicitSecurity'];
oauth2ImplicitSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: apiKeySecurity
var apiKeySecurity = defaultClient.authentications['apiKeySecurity'];
apiKeySecurity.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeySecurity.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: oauth2AccessCodeSecurity
var oauth2AccessCodeSecurity = defaultClient.authentications['oauth2AccessCodeSecurity'];
oauth2AccessCodeSecurity.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new OpenmoneyApi.AccountsApi();

var stewardname = "stewardname_example"; // String | 

var namespace = "namespace_example"; // String | 

var account = "account_example"; // String | 

var opts = { 
  'authorization': "authorization_example" // String | Authorization Token
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.accountsDelete(stewardname, namespace, account, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **namespace** | **String**|  | 
 **account** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 

### Return type

[**DeleteResponse**](DeleteResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="accountsDiscovery"></a>
# **accountsDiscovery**
> AccountsResponse accountsDiscovery(stewardname, opts)

Lookup an account by it&#39;s public key

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');
var defaultClient = OpenmoneyApi.ApiClient.default;

// Configure HTTP basic authorization: basicAuthenticationSecurity
var basicAuthenticationSecurity = defaultClient.authentications['basicAuthenticationSecurity'];
basicAuthenticationSecurity.username = 'YOUR USERNAME';
basicAuthenticationSecurity.password = 'YOUR PASSWORD';

// Configure OAuth2 access token for authorization: oauth2PasswordSecurity
var oauth2PasswordSecurity = defaultClient.authentications['oauth2PasswordSecurity'];
oauth2PasswordSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ApplicationSecurity
var oauth2ApplicationSecurity = defaultClient.authentications['oauth2ApplicationSecurity'];
oauth2ApplicationSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ImplicitSecurity
var oauth2ImplicitSecurity = defaultClient.authentications['oauth2ImplicitSecurity'];
oauth2ImplicitSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: apiKeySecurity
var apiKeySecurity = defaultClient.authentications['apiKeySecurity'];
apiKeySecurity.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeySecurity.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: oauth2AccessCodeSecurity
var oauth2AccessCodeSecurity = defaultClient.authentications['oauth2AccessCodeSecurity'];
oauth2AccessCodeSecurity.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new OpenmoneyApi.AccountsApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'publicKey': "publicKey_example" // String | Accounts public Key
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.accountsDiscovery(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 
 **publicKey** | **String**| Accounts public Key | [optional] 

### Return type

[**AccountsResponse**](AccountsResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="accountsGet"></a>
# **accountsGet**
> AccountsGet accountsGet(stewardname, namespace, account, currency, currencyNamespace, opts)

Get an account by account name

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');
var defaultClient = OpenmoneyApi.ApiClient.default;

// Configure HTTP basic authorization: basicAuthenticationSecurity
var basicAuthenticationSecurity = defaultClient.authentications['basicAuthenticationSecurity'];
basicAuthenticationSecurity.username = 'YOUR USERNAME';
basicAuthenticationSecurity.password = 'YOUR PASSWORD';

// Configure OAuth2 access token for authorization: oauth2PasswordSecurity
var oauth2PasswordSecurity = defaultClient.authentications['oauth2PasswordSecurity'];
oauth2PasswordSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ApplicationSecurity
var oauth2ApplicationSecurity = defaultClient.authentications['oauth2ApplicationSecurity'];
oauth2ApplicationSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ImplicitSecurity
var oauth2ImplicitSecurity = defaultClient.authentications['oauth2ImplicitSecurity'];
oauth2ImplicitSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: apiKeySecurity
var apiKeySecurity = defaultClient.authentications['apiKeySecurity'];
apiKeySecurity.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeySecurity.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: oauth2AccessCodeSecurity
var oauth2AccessCodeSecurity = defaultClient.authentications['oauth2AccessCodeSecurity'];
oauth2AccessCodeSecurity.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new OpenmoneyApi.AccountsApi();

var stewardname = "stewardname_example"; // String | 

var namespace = "namespace_example"; // String | 

var account = "account_example"; // String | 

var currency = "currency_example"; // String | 

var currencyNamespace = "currencyNamespace_example"; // String | 

var opts = { 
  'authorization': "authorization_example" // String | Authorization Token
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.accountsGet(stewardname, namespace, account, currency, currencyNamespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **namespace** | **String**|  | 
 **account** | **String**|  | 
 **currency** | **String**|  | 
 **currencyNamespace** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 

### Return type

[**AccountsGet**](AccountsGet.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="accountsList"></a>
# **accountsList**
> AccountsList accountsList(stewardname, opts)

Get a Listing of accounts in a namespace

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');
var defaultClient = OpenmoneyApi.ApiClient.default;

// Configure HTTP basic authorization: basicAuthenticationSecurity
var basicAuthenticationSecurity = defaultClient.authentications['basicAuthenticationSecurity'];
basicAuthenticationSecurity.username = 'YOUR USERNAME';
basicAuthenticationSecurity.password = 'YOUR PASSWORD';

// Configure OAuth2 access token for authorization: oauth2PasswordSecurity
var oauth2PasswordSecurity = defaultClient.authentications['oauth2PasswordSecurity'];
oauth2PasswordSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ApplicationSecurity
var oauth2ApplicationSecurity = defaultClient.authentications['oauth2ApplicationSecurity'];
oauth2ApplicationSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ImplicitSecurity
var oauth2ImplicitSecurity = defaultClient.authentications['oauth2ImplicitSecurity'];
oauth2ImplicitSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: apiKeySecurity
var apiKeySecurity = defaultClient.authentications['apiKeySecurity'];
apiKeySecurity.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeySecurity.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: oauth2AccessCodeSecurity
var oauth2AccessCodeSecurity = defaultClient.authentications['oauth2AccessCodeSecurity'];
oauth2AccessCodeSecurity.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new OpenmoneyApi.AccountsApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'namespace': "namespace_example", // String | 
  'currency': "currency_example", // String | 
  'currencyNamespace': "currencyNamespace_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.accountsList(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 
 **namespace** | **String**|  | [optional] 
 **currency** | **String**|  | [optional] 
 **currencyNamespace** | **String**|  | [optional] 

### Return type

[**AccountsList**](AccountsList.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="accountsPost"></a>
# **accountsPost**
> DeleteResponse accountsPost(stewardname, namespace, opts)

create an account in a namespace

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');
var defaultClient = OpenmoneyApi.ApiClient.default;

// Configure HTTP basic authorization: basicAuthenticationSecurity
var basicAuthenticationSecurity = defaultClient.authentications['basicAuthenticationSecurity'];
basicAuthenticationSecurity.username = 'YOUR USERNAME';
basicAuthenticationSecurity.password = 'YOUR PASSWORD';

// Configure OAuth2 access token for authorization: oauth2PasswordSecurity
var oauth2PasswordSecurity = defaultClient.authentications['oauth2PasswordSecurity'];
oauth2PasswordSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ApplicationSecurity
var oauth2ApplicationSecurity = defaultClient.authentications['oauth2ApplicationSecurity'];
oauth2ApplicationSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ImplicitSecurity
var oauth2ImplicitSecurity = defaultClient.authentications['oauth2ImplicitSecurity'];
oauth2ImplicitSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: apiKeySecurity
var apiKeySecurity = defaultClient.authentications['apiKeySecurity'];
apiKeySecurity.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeySecurity.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: oauth2AccessCodeSecurity
var oauth2AccessCodeSecurity = defaultClient.authentications['oauth2AccessCodeSecurity'];
oauth2AccessCodeSecurity.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new OpenmoneyApi.AccountsApi();

var stewardname = "stewardname_example"; // String | 

var namespace = "namespace_example"; // String | 

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'account': new OpenmoneyApi.AccountsRequest() // AccountsRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.accountsPost(stewardname, namespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **namespace** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 
 **account** | [**AccountsRequest**](AccountsRequest.md)|  | [optional] 

### Return type

[**DeleteResponse**](DeleteResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="accountsPut"></a>
# **accountsPut**
> CreateResponse accountsPut(stewardname, namespace, account, opts)

Update an account

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');
var defaultClient = OpenmoneyApi.ApiClient.default;

// Configure HTTP basic authorization: basicAuthenticationSecurity
var basicAuthenticationSecurity = defaultClient.authentications['basicAuthenticationSecurity'];
basicAuthenticationSecurity.username = 'YOUR USERNAME';
basicAuthenticationSecurity.password = 'YOUR PASSWORD';

// Configure OAuth2 access token for authorization: oauth2PasswordSecurity
var oauth2PasswordSecurity = defaultClient.authentications['oauth2PasswordSecurity'];
oauth2PasswordSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ApplicationSecurity
var oauth2ApplicationSecurity = defaultClient.authentications['oauth2ApplicationSecurity'];
oauth2ApplicationSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure OAuth2 access token for authorization: oauth2ImplicitSecurity
var oauth2ImplicitSecurity = defaultClient.authentications['oauth2ImplicitSecurity'];
oauth2ImplicitSecurity.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: apiKeySecurity
var apiKeySecurity = defaultClient.authentications['apiKeySecurity'];
apiKeySecurity.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeySecurity.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: oauth2AccessCodeSecurity
var oauth2AccessCodeSecurity = defaultClient.authentications['oauth2AccessCodeSecurity'];
oauth2AccessCodeSecurity.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new OpenmoneyApi.AccountsApi();

var stewardname = "stewardname_example"; // String | 

var namespace = "namespace_example"; // String | 

var account = "account_example"; // String | Account Name

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'accounts': new OpenmoneyApi.AccountsRequest() // AccountsRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.accountsPut(stewardname, namespace, account, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **namespace** | **String**|  | 
 **account** | **String**| Account Name | 
 **authorization** | **String**| Authorization Token | [optional] 
 **accounts** | [**AccountsRequest**](AccountsRequest.md)|  | [optional] 

### Return type

[**CreateResponse**](CreateResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

