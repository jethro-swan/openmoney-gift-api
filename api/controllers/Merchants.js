'use strict';

var url = require('url');
var Merchants = require('./MerchantsService');


module.exports.merchantsGet = function merchantsGet (req, res, next) {
  Merchants.merchantsGet(req.swagger.params, res, next);
};

module.exports.merchantsPut = function merchantsPut (req, res, next) {
  Merchants.merchantsPut(req.swagger.params, res, next);
};

module.exports.merchantsDelete = function merchantsDelete (req, res, next) {
  Merchants.merchantsDelete(req.swagger.params, res, next);
};

module.exports.merchantList = function merchantList (req, res, next) {
  Merchants.merchantList(req.swagger.params, res, next);
};

module.exports.merchantsPost = function merchantsPost (req, res, next) {
  Merchants.merchantsPost(req.swagger.params, res, next);
};

module.exports.merchantsForgot = function merchantsForgot (req, res, next) {
  Merchants.merchantsForgot(req.swagger.params, res, next);
};

module.exports.merchantsReset = function merchantsReset (req, res, next) {
  Merchants.merchantsReset(req.swagger.params, res, next);
};

module.exports.merchantsCurrenciesPost = function merchantsCurrenciesPost (req, res, next) {
  Merchants.merchantsCurrenciesPost(req.swagger.params, res, next);
};

module.exports.merchantsSupportPost = function merchantsSupportPost (req, res, next) {
  Merchants.merchantsSupportPost(req.swagger.params, res, next);
};
