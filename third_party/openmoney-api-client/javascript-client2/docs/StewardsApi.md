# OpenmoneyApi.StewardsApi

All URIs are relative to *https://cloud.openmoney.cc/V2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**stewardsDelete**](StewardsApi.md#stewardsDelete) | **DELETE** /stewards/{stewardname} | Delete a steward account
[**stewardsGet**](StewardsApi.md#stewardsGet) | **GET** /stewards/{stewardname} | Get a single steward
[**stewardsList**](StewardsApi.md#stewardsList) | **GET** /stewards | Get a listing of known stewards
[**stewardsPost**](StewardsApi.md#stewardsPost) | **POST** /stewards | Register a steward on the system
[**stewardsPut**](StewardsApi.md#stewardsPut) | **PUT** /stewards/{stewardname} | Update a steward account


<a name="stewardsDelete"></a>
# **stewardsDelete**
> DeleteResponse stewardsDelete(stewardname, opts)

Delete a steward account

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

var apiInstance = new OpenmoneyApi.StewardsApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.stewardsDelete(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**|  | [optional] 

### Return type

[**DeleteResponse**](DeleteResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="stewardsGet"></a>
# **stewardsGet**
> StewardsGet stewardsGet(stewardname, opts)

Get a single steward

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

var apiInstance = new OpenmoneyApi.StewardsApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.stewardsGet(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**|  | [optional] 

### Return type

[**StewardsGet**](StewardsGet.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="stewardsList"></a>
# **stewardsList**
> StewardsList stewardsList(opts)

Get a listing of known stewards

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

var apiInstance = new OpenmoneyApi.StewardsApi();

var opts = { 
  'authorization': "authorization_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.stewardsList(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **String**|  | [optional] 

### Return type

[**StewardsList**](StewardsList.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="stewardsPost"></a>
# **stewardsPost**
> RegisterResponse stewardsPost(registerRequest)

Register a steward on the system

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');

var apiInstance = new OpenmoneyApi.StewardsApi();

var registerRequest = new OpenmoneyApi.RegisterRequest(); // RegisterRequest | Registration Request


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.stewardsPost(registerRequest, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerRequest** | [**RegisterRequest**](RegisterRequest.md)| Registration Request | 

### Return type

[**RegisterResponse**](RegisterResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="stewardsPut"></a>
# **stewardsPut**
> CreateResponse stewardsPut(stewardname, steward, opts)

Update a steward account

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

var apiInstance = new OpenmoneyApi.StewardsApi();

var stewardname = "stewardname_example"; // String | 

var steward = new OpenmoneyApi.StewardsRequest(); // StewardsRequest | Steward Document

var opts = { 
  'authorization': "authorization_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.stewardsPut(stewardname, steward, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **steward** | [**StewardsRequest**](StewardsRequest.md)| Steward Document | 
 **authorization** | **String**|  | [optional] 

### Return type

[**CreateResponse**](CreateResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

