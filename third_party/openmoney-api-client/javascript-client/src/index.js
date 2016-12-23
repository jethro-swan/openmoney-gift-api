(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./ApiClient', './model/StewardsList', './model/NamespacesList', './model/CurrenciesList', './model/AccountsList', './model/JournalsList', './model/NamespacesGet', './model/CurrenciesGet', './model/AccountsGet', './model/StewardsGet', './model/DeleteResponse', './model/GetResponse', './model/CreateResponse', './model/Modification', './model/StewardsRequest', './model/StewardsResponse', './model/AccountsRequest', './model/AccountsResponse', './model/CurrenciesRequest', './model/CurrenciesResponse', './model/NamespacesRequest', './model/NamespacesResponse', './model/EncryptedJournals', './model/AesEncryption', './model/JournalsRequest', './model/JournalsResponse', './model/ApplicationRequest', './model/ApplicationResponse', './model/AccessTokenRequest', './model/TokenResponse', './model/OauthAuthorizeRequest', './model/RegisterResponse', './model/RegisterRequest', './model/ErrorModel', './api/NamespacesApi', './api/AuthApi', './api/JournalsApi', './api/StewardsApi', './api/AccountsApi', './api/CurrenciesApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/StewardsList'), require('./model/NamespacesList'), require('./model/CurrenciesList'), require('./model/AccountsList'), require('./model/JournalsList'), require('./model/NamespacesGet'), require('./model/CurrenciesGet'), require('./model/AccountsGet'), require('./model/StewardsGet'), require('./model/DeleteResponse'), require('./model/GetResponse'), require('./model/CreateResponse'), require('./model/Modification'), require('./model/StewardsRequest'), require('./model/StewardsResponse'), require('./model/AccountsRequest'), require('./model/AccountsResponse'), require('./model/CurrenciesRequest'), require('./model/CurrenciesResponse'), require('./model/NamespacesRequest'), require('./model/NamespacesResponse'), require('./model/EncryptedJournals'), require('./model/AesEncryption'), require('./model/JournalsRequest'), require('./model/JournalsResponse'), require('./model/ApplicationRequest'), require('./model/ApplicationResponse'), require('./model/AccessTokenRequest'), require('./model/TokenResponse'), require('./model/OauthAuthorizeRequest'), require('./model/RegisterResponse'), require('./model/RegisterRequest'), require('./model/ErrorModel'), require('./api/NamespacesApi'), require('./api/AuthApi'), require('./api/JournalsApi'), require('./api/StewardsApi'), require('./api/AccountsApi'), require('./api/CurrenciesApi'));
  }
}(function(ApiClient, StewardsList, NamespacesList, CurrenciesList, AccountsList, JournalsList, NamespacesGet, CurrenciesGet, AccountsGet, StewardsGet, DeleteResponse, GetResponse, CreateResponse, Modification, StewardsRequest, StewardsResponse, AccountsRequest, AccountsResponse, CurrenciesRequest, CurrenciesResponse, NamespacesRequest, NamespacesResponse, EncryptedJournals, AesEncryption, JournalsRequest, JournalsResponse, ApplicationRequest, ApplicationResponse, AccessTokenRequest, TokenResponse, OauthAuthorizeRequest, RegisterResponse, RegisterRequest, ErrorModel, NamespacesApi, AuthApi, JournalsApi, StewardsApi, AccountsApi, CurrenciesApi) {
  'use strict';

  return {
    ApiClient: ApiClient,
    StewardsList: StewardsList,
    NamespacesList: NamespacesList,
    CurrenciesList: CurrenciesList,
    AccountsList: AccountsList,
    JournalsList: JournalsList,
    NamespacesGet: NamespacesGet,
    CurrenciesGet: CurrenciesGet,
    AccountsGet: AccountsGet,
    StewardsGet: StewardsGet,
    DeleteResponse: DeleteResponse,
    GetResponse: GetResponse,
    CreateResponse: CreateResponse,
    Modification: Modification,
    StewardsRequest: StewardsRequest,
    StewardsResponse: StewardsResponse,
    AccountsRequest: AccountsRequest,
    AccountsResponse: AccountsResponse,
    CurrenciesRequest: CurrenciesRequest,
    CurrenciesResponse: CurrenciesResponse,
    NamespacesRequest: NamespacesRequest,
    NamespacesResponse: NamespacesResponse,
    EncryptedJournals: EncryptedJournals,
    AesEncryption: AesEncryption,
    JournalsRequest: JournalsRequest,
    JournalsResponse: JournalsResponse,
    ApplicationRequest: ApplicationRequest,
    ApplicationResponse: ApplicationResponse,
    AccessTokenRequest: AccessTokenRequest,
    TokenResponse: TokenResponse,
    OauthAuthorizeRequest: OauthAuthorizeRequest,
    RegisterResponse: RegisterResponse,
    RegisterRequest: RegisterRequest,
    ErrorModel: ErrorModel,
    NamespacesApi: NamespacesApi,
    AuthApi: AuthApi,
    JournalsApi: JournalsApi,
    StewardsApi: StewardsApi,
    AccountsApi: AccountsApi,
    CurrenciesApi: CurrenciesApi
  };
}));
