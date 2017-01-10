# OpenmoneyApi.CurrenciesApi

All URIs are relative to *https://cloud.openmoney.cc/V2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**currenciesDelete**](CurrenciesApi.md#currenciesDelete) | **DELETE** /stewards/{stewardname}/currencies/{currency} | Delete a currency
[**currenciesGet**](CurrenciesApi.md#currenciesGet) | **GET** /stewards/{stewardname}/currencies/{currency} | Get a currency by its name
[**currenciesList**](CurrenciesApi.md#currenciesList) | **GET** /stewards/{stewardname}/currencies | Get a Listing currencies known by steward.
[**currenciesPost**](CurrenciesApi.md#currenciesPost) | **POST** /stewards/{stewardname}/currencies | Create a currency
[**currenciesPut**](CurrenciesApi.md#currenciesPut) | **PUT** /stewards/{stewardname}/currencies/{currency} | Update a Currency


<a name="currenciesDelete"></a>
# **currenciesDelete**
> DeleteResponse currenciesDelete(stewardname, currency, opts)

Delete a currency

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

var apiInstance = new OpenmoneyApi.CurrenciesApi();

var stewardname = "stewardname_example"; // String | 

var currency = "currency_example"; // String | Currency name

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
apiInstance.currenciesDelete(stewardname, currency, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **currency** | **String**| Currency name | 
 **authorization** | **String**| Authorization Token | [optional] 

### Return type

[**DeleteResponse**](DeleteResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="currenciesGet"></a>
# **currenciesGet**
> CurrenciesGet currenciesGet(stewardname, currency, opts)

Get a currency by its name

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

var apiInstance = new OpenmoneyApi.CurrenciesApi();

var stewardname = "stewardname_example"; // String | 

var currency = "currency_example"; // String | Name of a currency

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
apiInstance.currenciesGet(stewardname, currency, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **currency** | **String**| Name of a currency | 
 **authorization** | **String**| Authorization Token | [optional] 

### Return type

[**CurrenciesGet**](CurrenciesGet.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="currenciesList"></a>
# **currenciesList**
> CurrenciesList currenciesList(stewardname, opts)

Get a Listing currencies known by steward.

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

var apiInstance = new OpenmoneyApi.CurrenciesApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'namespace': "namespace_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.currenciesList(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 
 **namespace** | **String**|  | [optional] 

### Return type

[**CurrenciesList**](CurrenciesList.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="currenciesPost"></a>
# **currenciesPost**
> CreateResponse currenciesPost(stewardname, opts)

Create a currency

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

var apiInstance = new OpenmoneyApi.CurrenciesApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'currency': new OpenmoneyApi.CurrenciesRequest() // CurrenciesRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.currenciesPost(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 
 **currency** | [**CurrenciesRequest**](CurrenciesRequest.md)|  | [optional] 

### Return type

[**CreateResponse**](CreateResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="currenciesPut"></a>
# **currenciesPut**
> CreateResponse currenciesPut(stewardname, currency, opts)

Update a Currency

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

var apiInstance = new OpenmoneyApi.CurrenciesApi();

var stewardname = "stewardname_example"; // String | 

var currency = "currency_example"; // String | Name of a currency

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'currencies': new OpenmoneyApi.CurrenciesRequest() // CurrenciesRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.currenciesPut(stewardname, currency, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **currency** | **String**| Name of a currency | 
 **authorization** | **String**| Authorization Token | [optional] 
 **currencies** | [**CurrenciesRequest**](CurrenciesRequest.md)|  | [optional] 

### Return type

[**CreateResponse**](CreateResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

