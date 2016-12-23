'use strict';

var url = require('url');


var Employees = require('./EmployeesService');


module.exports.employeeList = function employeeList (req, res, next) {
  Employees.employeeList(req.swagger.params, res, next);
};

module.exports.employeePost = function employeePost (req, res, next) {
  Employees.employeePost(req.swagger.params, res, next);
};

module.exports.employeeGet = function employeeGet (req, res, next) {
  Employees.employeeGet(req.swagger.params, res, next);
};

module.exports.employeePut = function employeePut (req, res, next) {
  Employees.employeePut(req.swagger.params, res, next);
};

module.exports.employeeDelete = function employeeDelete (req, res, next) {
  Employees.employeeDelete(req.swagger.params, res, next);
};
