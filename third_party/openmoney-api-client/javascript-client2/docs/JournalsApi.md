# OpenmoneyApi.JournalsApi

All URIs are relative to *https://cloud.openmoney.cc/V2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**journalsList**](JournalsApi.md#journalsList) | **GET** /stewards/{stewardname}/journals | List Journal Entries for this accountname
[**journalsPost**](JournalsApi.md#journalsPost) | **POST** /stewards/{stewardname}/namespaces/{namespace}/accounts/{account}/journals/{currency} | Create a journal entry for this account


<a name="journalsList"></a>
# **journalsList**
> JournalsList journalsList(stewardname, opts)

List Journal Entries for this accountname

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

var apiInstance = new OpenmoneyApi.JournalsApi();

var stewardname = "stewardname_example"; // String | 

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'namespace': "namespace_example", // String | 
  'account': "account_example", // String | 
  'currency': "currency_example", // String | 
  'currencyNamespace': "currencyNamespace_example", // String | 
  'offset': 56, // Integer | 
  'range': 56 // Integer | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.journalsList(stewardname, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 
 **namespace** | **String**|  | [optional] 
 **account** | **String**|  | [optional] 
 **currency** | **String**|  | [optional] 
 **currencyNamespace** | **String**|  | [optional] 
 **offset** | **Integer**|  | [optional] 
 **range** | **Integer**|  | [optional] 

### Return type

[**JournalsList**](JournalsList.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

<a name="journalsPost"></a>
# **journalsPost**
> CreateResponse journalsPost(stewardname, namespace, account, currency, opts)

Create a journal entry for this account

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

var apiInstance = new OpenmoneyApi.JournalsApi();

var stewardname = "stewardname_example"; // String | 

var namespace = "namespace_example"; // String | 

var account = "account_example"; // String | 

var currency = "currency_example"; // String | 

var opts = { 
  'authorization': "authorization_example", // String | Authorization Token
  'currencyNamespace': "currencyNamespace_example", // String | 
  'journal': new OpenmoneyApi.JournalsRequest() // JournalsRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.journalsPost(stewardname, namespace, account, currency, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **stewardname** | **String**|  | 
 **namespace** | **String**|  | 
 **account** | **String**|  | 
 **currency** | **String**|  | 
 **authorization** | **String**| Authorization Token | [optional] 
 **currencyNamespace** | **String**|  | [optional] 
 **journal** | [**JournalsRequest**](JournalsRequest.md)|  | [optional] 

### Return type

[**CreateResponse**](CreateResponse.md)

### Authorization

[basicAuthenticationSecurity](../README.md#basicAuthenticationSecurity), [oauth2PasswordSecurity](../README.md#oauth2PasswordSecurity), [oauth2ApplicationSecurity](../README.md#oauth2ApplicationSecurity), [oauth2ImplicitSecurity](../README.md#oauth2ImplicitSecurity), [apiKeySecurity](../README.md#apiKeySecurity), [oauth2AccessCodeSecurity](../README.md#oauth2AccessCodeSecurity)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/html

