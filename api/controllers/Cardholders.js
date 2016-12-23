'use strict';

var url = require('url');


var Cardholders = require('./CardholdersService');


module.exports.cardholderList = function cardholderList (req, res, next) {
  Cardholders.cardholderList(req.swagger.params, res, next);
};

module.exports.cardholderPost = function cardholderPost (req, res, next) {
  Cardholders.cardholderPost(req.swagger.params, res, next);
};

module.exports.cardholderGet = function cardholderGet (req, res, next) {
  Cardholders.cardholderGet(req.swagger.params, res, next);
};

module.exports.cardholdersPut = function cardholdersPut (req, res, next) {
  Cardholders.cardholdersPut(req.swagger.params, res, next);
};

module.exports.cardholderDelete = function cardholderDelete (req, res, next) {
  Cardholders.cardholderDelete(req.swagger.params, res, next);
};
