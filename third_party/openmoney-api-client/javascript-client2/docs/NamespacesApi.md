# OpenmoneyApi.NamespacesApi

All URIs are relative to *https://cloud.openmoney.cc/V2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**spacesDelete**](NamespacesApi.md#spacesDelete) | **DELETE** /stewards/{stewardname}/namespaces/{namespace} | 
[**spacesGet**](NamespacesApi.md#spacesGet) | **GET** /stewards/{stewardname}/namespaces/{namespace} | Get a namespace by it&#39;s name
[**spacesList**](NamespacesApi.md#spacesList) | **GET** /stewards/{stewardname}/namespaces | Get a Listing of namespaces known by steward.
[**spacesPost**](NamespacesApi.md#spacesPost) | **POST** /stewards/{stewardname}/namespaces | Create a namespace
[**spacesPut**](NamespacesApi.md#spacesPut) | **PUT** /stewards/{stewardname}/namespaces/{namespace} | Update a namespace


<a name="spacesDelete"></a>
# **spacesDelete**
> DeleteResponse spacesDelete(stewardname, namespace, opts)



Delete a namespace

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

var apiInstance = new OpenmoneyApi.NamespacesApi();

var stewardname = "stewardname_example"; // String | 

var namespace = "namespace_example"; // String | namespace name

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
apiInstance.spacesDelete(stewardname, namespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **namespace** | **String**| namespace name | 
 **authorization** | **String**| Authorization Token | [optional] 

### Return type

[**DeleteResponse**](DeleteResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="spacesGet"></a>
# **spacesGet**
> NamespacesGet spacesGet(stewardname, namespace, opts)

Get a namespace by it&#39;s name

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

var apiInstance = new OpenmoneyApi.NamespacesApi();

var stewardname = "stewardname_example"; // String | 

var namespace = "namespace_example"; // String | space name

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
apiInstance.spacesGet(stewardname, namespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **namespace** | **String**| space name | 
 **authorization** | **String**| Authorization Token | [optional] 

### Return type

[**NamespacesGet**](NamespacesGet.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="spacesList"></a>
# **spacesList**
> NamespacesList spacesList(stewardname, opts)

Get a Listing of namespaces known by steward.

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

var apiInstance = new OpenmoneyApi.NamespacesApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'parentNamespace': "parentNamespace_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.spacesList(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 
 **parentNamespace** | **String**|  | [optional] 

### Return type

[**NamespacesList**](NamespacesList.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="spacesPost"></a>
# **spacesPost**
> CreateResponse spacesPost(stewardname, space, opts)

Create a namespace

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

var apiInstance = new OpenmoneyApi.NamespacesApi();

var stewardname = "stewardname_example"; // String | 

var space = new OpenmoneyApi.NamespacesRequest(); // NamespacesRequest | 

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
apiInstance.spacesPost(stewardname, space, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **space** | [**NamespacesRequest**](NamespacesRequest.md)|  | 
 **authorization** | **String**| Authorization Token | [optional] 

### Return type

[**CreateResponse**](CreateResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="spacesPut"></a>
# **spacesPut**
> CreateResponse spacesPut(stewardname, namespace, opts)

Update a namespace

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

var apiInstance = new OpenmoneyApi.NamespacesApi();

var stewardname = "stewardname_example"; // String | 

var namespace = "namespace_example"; // String | space name

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'space': new OpenmoneyApi.NamespacesRequest() // NamespacesRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.spacesPut(stewardname, namespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **namespace** | **String**| space name | 
 **authorization** | **String**| Authorization Token | [optional] 
 **space** | [**NamespacesRequest**](NamespacesRequest.md)|  | [optional] 

### Return type

[**CreateResponse**](CreateResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

