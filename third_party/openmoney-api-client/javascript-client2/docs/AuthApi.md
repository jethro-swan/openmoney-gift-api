# OpenmoneyApi.AuthApi

All URIs are relative to *https://cloud.openmoney.cc/V2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accountGet**](AuthApi.md#accountGet) | **GET** /stewards/{stewardname}/account | Get Steward account information
[**loginGet**](AuthApi.md#loginGet) | **GET** /stewards/{stewardname}/login | Login Page for the steward
[**loginPost**](AuthApi.md#loginPost) | **POST** /stewards/{stewardname}/login | Login steward
[**logoutPost**](AuthApi.md#logoutPost) | **GET** /stewards/{stewardname}/logout | Logout steward
[**oauthAccessTokenPost**](AuthApi.md#oauthAccessTokenPost) | **POST** /stewards/{stewardname}/oauth/token | Exchanges the user or client credentials for an access token used to access resources.
[**oauthApplicationPost**](AuthApi.md#oauthApplicationPost) | **POST** /stewards/{stewardname}/oauth/application | Create an application for a client_id and client_secret for oauth token authorization.
[**oauthDialogeGet**](AuthApi.md#oauthDialogeGet) | **GET** /stewards/{stewardname}/dialog/authorize | Implicit authorization dialog presented to steward to authorize client_id to access API resources on their behalf.
[**oauthDialogePost**](AuthApi.md#oauthDialogePost) | **POST** /stewards/{stewardname}/dialog/authorize/decision | Authorizes a steward on the openmoney network


<a name="accountGet"></a>
# **accountGet**
> &#39;String&#39; accountGet(stewardname)

Get Steward account information

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');

var apiInstance = new OpenmoneyApi.AuthApi();

var stewardname = "stewardname_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.accountGet(stewardname, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 

### Return type

**&#39;String&#39;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: text/html

<a name="loginGet"></a>
# **loginGet**
> &#39;String&#39; loginGet(stewardname)

Login Page for the steward

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');

var apiInstance = new OpenmoneyApi.AuthApi();

var stewardname = "stewardname_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.loginGet(stewardname, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 

### Return type

**&#39;String&#39;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: text/plain

<a name="loginPost"></a>
# **loginPost**
> loginPost(stewardname, opts)

Login steward

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');

var apiInstance = new OpenmoneyApi.AuthApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.loginPost(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: text/plain

<a name="logoutPost"></a>
# **logoutPost**
> logoutPost(stewardname)

Logout steward

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');

var apiInstance = new OpenmoneyApi.AuthApi();

var stewardname = "stewardname_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.logoutPost(stewardname, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="oauthAccessTokenPost"></a>
# **oauthAccessTokenPost**
> TokenResponse oauthAccessTokenPost(stewardname, accessTokenRequest, opts)

Exchanges the user or client credentials for an access token used to access resources.

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');
var defaultClient = OpenmoneyApi.ApiClient.default;

// Configure HTTP basic authorization: basicAuthenticationSecurity
var basicAuthenticationSecurity = defaultClient.authentications['basicAuthenticationSecurity'];
basicAuthenticationSecurity.username = 'YOUR USERNAME';
basicAuthenticationSecurity.password = 'YOUR PASSWORD';

// Configure API key authorization: oauth2Refresh
var oauth2Refresh = defaultClient.authentications['oauth2Refresh'];
oauth2Refresh.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//oauth2Refresh.apiKeyPrefix = 'Token';

var apiInstance = new OpenmoneyApi.AuthApi();

var stewardname = "stewardname_example"; // String | 

var accessTokenRequest = new OpenmoneyApi.AccessTokenRequest(); // AccessTokenRequest | Access Token Request Object

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
apiInstance.oauthAccessTokenPost(stewardname, accessTokenRequest, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **accessTokenRequest** | [**AccessTokenRequest**](AccessTokenRequest.md)| Access Token Request Object | 
 **authorization** | **String**|  | [optional] 

### Return type

[**TokenResponse**](TokenResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2Refresh](../README.md#oauth2Refresh)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="oauthApplicationPost"></a>
# **oauthApplicationPost**
> ApplicationResponse oauthApplicationPost(stewardname, application, opts)

Create an application for a client_id and client_secret for oauth token authorization.

Existing steward Registers an application with the openmoney network.

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');
var defaultClient = OpenmoneyApi.ApiClient.default;

// Configure HTTP basic authorization: basicAuthenticationSecurity
var basicAuthenticationSecurity = defaultClient.authentications['basicAuthenticationSecurity'];
basicAuthenticationSecurity.username = 'YOUR USERNAME';
basicAuthenticationSecurity.password = 'YOUR PASSWORD';

var apiInstance = new OpenmoneyApi.AuthApi();

var stewardname = "stewardname_example"; // String | 

var application = new OpenmoneyApi.ApplicationRequest(); // ApplicationRequest | Application Object

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
apiInstance.oauthApplicationPost(stewardname, application, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **application** | [**ApplicationRequest**](ApplicationRequest.md)| Application Object | 
 **authorization** | **String**|  | [optional] 

### Return type

[**ApplicationResponse**](ApplicationResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="oauthDialogeGet"></a>
# **oauthDialogeGet**
> ErrorModel oauthDialogeGet(stewardname, clientId, opts)

Implicit authorization dialog presented to steward to authorize client_id to access API resources on their behalf.

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');

var apiInstance = new OpenmoneyApi.AuthApi();

var stewardname = "stewardname_example"; // String | 

var clientId = "clientId_example"; // String | Client ID received during registration

var opts = { 
  'redirectUri': "redirectUri_example", // String | A uri to redirect steward after authorization
  'scopes': ["scopes_example"] // [String] | A comma separated list of scopes. If not provided, scope defaults to an empty list of scopes for stewards that don’t have a valid token for the app. For stewards who do already have a valid token for the app, the steward won’t be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the same scopes that were used last time the steward completed the flow.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.oauthDialogeGet(stewardname, clientId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **clientId** | **String**| Client ID received during registration | 
 **redirectUri** | **String**| A uri to redirect steward after authorization | [optional] 
 **scopes** | [**[String]**](String.md)| A comma separated list of scopes. If not provided, scope defaults to an empty list of scopes for stewards that don’t have a valid token for the app. For stewards who do already have a valid token for the app, the steward won’t be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the same scopes that were used last time the steward completed the flow. | [optional] 

### Return type

[**ErrorModel**](ErrorModel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: text/html

<a name="oauthDialogePost"></a>
# **oauthDialogePost**
> ErrorModel oauthDialogePost(stewardname, oauthAuthorizeRequest)

Authorizes a steward on the openmoney network

Authorization dialoge decision with allowed scopes.

### Example
```javascript
var OpenmoneyApi = require('openmoney_api');

var apiInstance = new OpenmoneyApi.AuthApi();

var stewardname = "stewardname_example"; // String | 

var oauthAuthorizeRequest = new OpenmoneyApi.OauthAuthorizeRequest(); // OauthAuthorizeRequest | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.oauthDialogePost(stewardname, oauthAuthorizeRequest, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **oauthAuthorizeRequest** | [**OauthAuthorizeRequest**](OauthAuthorizeRequest.md)|  | 

### Return type

[**ErrorModel**](ErrorModel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

