'use strict';

var url = require('url');


var Cards = require('./CardsService');


module.exports.cardsList = function cardsList (req, res, next) {
  Cards.cardsList(req.swagger.params, res, next);
};

module.exports.cardPost = function cardPost (req, res, next) {
  Cards.cardPost(req.swagger.params, res, next);
};

module.exports.cardsBalance = function cardsBalance (req, res, next) {
  Cards.cardsBalance(req.swagger.params, res, next);
};

module.exports.cardsLoad = function cardsLoad (req, res, next) {
  Cards.cardsLoad(req.swagger.params, res, next);
};

module.exports.cardsRedeem = function cardsRedeem (req, res, next) {
  Cards.cardsRedeem(req.swagger.params, res, next);
};

module.exports.cardsDelete = function cardsDelete (req, res, next) {
  Cards.cardsDelete(req.swagger.params, res, next);
};

module.exports.cardsPut = function cardsDelete (req, res, next) {
  Cards.cardsPut(req.swagger.params, res, next);
};

module.exports.templatesPost = function templatesPost (req, res, next) {
  Cards.templatesPost(req.swagger.params, res, next);
};

module.exports.templatesList = function templatesList (req, res, next) {
  Cards.templatesList(req.swagger.params, res, next);
};

module.exports.templatesPut = function templatesPut (req, res, next) {
  Cards.templatesPut(req.swagger.params, res, next);
};
