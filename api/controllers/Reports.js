'use strict';

var url = require('url');


var Reports = require('./ReportsService');


module.exports.reportsList = function reportsList (req, res, next) {
  Reports.reportsList(req.swagger.params, res, next);
};
