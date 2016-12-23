'use strict';

var employees = require('../model/employees');
var openmoneyApi = require('../../third_party/openmoney-api-client/javascript-client/src/');
var oauth = require('../helpers/oauth');
var response = require('../helpers/response');

exports.employeeList = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * authorization (String)
  * orderBy (String)
  * offset (Integer)
  * range (Integer)
  **/

  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {

    if(typeof args.order_by.value == 'undefined' || args.order_by.value == 'name'){
      employees.listEmployeesByName(args.merchantname.value, args.offset.value, args.range.value, function(err, merchants){
        if(err){
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Could not get database list of employees by name.';
          error.status = 500;
          response.respond(error, res);
        } else {
          console.log('listEmployeesByName: ', merchants)
          var results = [];
          merchants.rows.forEach(function(row){
            delete(row.doc.type);
            delete(row.doc.merchantname);
            delete(row.doc._rev);
            //delete(row.doc._id);
            results.push(row.doc);
          })
          response.respond(results, res);
        }//else err
      });//listEmployeesByName
    } else {//if orderBy = name
      //order by code
      employees.listEmployeesByCode(args.merchantname.value, args.offset.value, args.range.value, function(err, merchants){
        if(err){
          console.error(err);
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Could not get database list of employees by code.';
          error.status = 500;
          response.respond(error, res);
        } else {
          console.log(merchants);
          response.respond(merchants.docs, res);
        }//else err
      });//listEmployeesByName
    } //else orderBy = name
  }//else merchant match
};

exports.employeePost = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * employeeName (Employees_request)
  * authorization (String)
  **/

  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {
    var employee = args.employee.value;

    //check assumptions about employee
    employees.findByEmployeeId('employees~' + args.user.merchantname + '~' + employee.name, function(err, found){
      if(err){
        if(err.status == 404){
          //not found
          //putEmployee
          var employee_insert = {};
          employee_insert.name = employee.name;
          employee_insert.code = employee.code;
          employee_insert.enabled = true;
          employee_insert.is_merchant_owner = employee.is_merchant_owner;
          employee_insert.type = 'employees~';
          employee_insert.merchantname = args.user.merchantname;
          employee_insert._id = employee_insert.type + employee_insert.merchantname + '~' + employee_insert.name;
          employees.insertEmployee(employee_insert, function(err, ok){
            if(err){
              console.error(err);
              //db error
              var error = {};
              error.code = 'EMPLOYEE_INSERT_ERROR';
              error.message = 'Could not insert employee.';
              error.status = 500;
              response.respond(error, res);
            } else {
              console.info(ok);
              var result = {};
              result.ok = true;
              response.respond(result, res);
            }//else err
          });//insertEmployee

        } else {//if status 404
          //db error
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Cannot get giftcard database.';
          error.status = 500;
          response.respond(error, res);
        }//else status 404
      } else {
        var error = {};
        error.code = 'EMPLOYEE_EXISTS';
        error.message = 'That employee already exists.';
        error.status = 400;
        response.respond(error, res);
      }//else err
    });//findByEmployeeId
  }//merchant match
};//employeePost

exports.employeeGet = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * employeeID (String)
  * authorization (String)
  **/

  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {
    var employeeName = args.employeeID.value;
    employees.findByEmployeeId('employees~' + args.merchantname.value + '~' + employeeName, function(err, result){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'EMPLOYEE_NOT_FOUND';
          error.message = 'Could not find employee by name.';
          error.status = 404;
          response.respond(error, res);
        } else {
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Cannot get data from database.';
          error.status = 500;
          response.respond(error, res);
        }
      } else {
        delete(result.type);
        delete(result.merchantname);
        delete(result._id);
        delete(result._rev);
        response.respond(result, res);
      }//else err
    });//findByEmployeeId
  }//else merchantname match
}

exports.employeePut = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * employeeID (String)
  * authorization (String)
  * employee (Employees_request)
  **/

  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {
    var employeeName = args.employeeID.value;
    var id = 'employees~' + args.merchantname.value + '~' + employeeName;
    console.log(id);
    employees.findByEmployeeId(id, function(err, old_employee){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'EMPLOYEE_NOT_FOUND';
          error.message = 'Could not find employee by name.';
          error.status = 404;
          response.respond(error, res);
        } else {
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Cannot get data from database.';
          error.status = 500;
          response.respond(error, res);
        }
      } else {
        var employee = args.employee.value;
        if(employee.name != employeeName){
          //change in employee name
          //delete old employee and intesert new
          employees.deleteEmployee(old_employee, function(err, ok){
            if(err){
              console.error(err);
              var error = {};
              error.code = 'GIFTCARD_DB_ERROR';
              error.message = 'Cannot get data from database.';
              error.status = 500;
              response.respond(error, res);
            } else { //if err
              delete(old_employee._id);
              delete(old_employee._rev);
              delete(old_employee.name);
              old_employee.name = employee.name;
              if(typeof employee.code != 'undefined')
              old_employee.code = employee.code;
              if(typeof employee.enabled != 'undefined')
              old_employee.enabled = employee.enabled;
              if(typeof employee.default != 'undefined')
              old_employee.default = employee.default;
              if(typeof employee.is_merchant_owner != 'undefined')
              old_employee.is_merchant_owner = employee.is_merchant_owner;
              old_employee._id = old_employee.type + args.merchantname.value + '~' + old_employee.name;
              employees.insertEmployee(old_employee, function(err, ok){
                if(err){
                  console.error(err);
                  var error = {};
                  error.code = 'GIFTCARD_DB_ERROR';
                  error.message = 'Cannot insert into database.';
                  error.status = 500;
                  response.respond(error, res);
                } else {
                  delete(ok.rev);
                  response.respond(ok, res);
                }//else err
              });//insert
            }//else err
          });
        } else {//if name change
          var change = false;
          //change in code or is_merchant_owner
          if(typeof employee.code != 'undefined' && old_employee.code != employee.code){
            old_employee.code = employee.code;
            change = true;
          }//if code

          if(typeof employee.is_merchant_owner != 'undefined' && old_employee.is_merchant_owner != employee.is_merchant_owner){
            old_employee.is_merchant_owner = employee.is_merchant_owner;
            change = true;
          }//if is_merchant_owner

          if(typeof employee.enabled != 'undefined' && old_employee.enabled != employee.enabled){
            old_employee.enabled = employee.enabled;
            change = true;
          }

          if(typeof employee.default != 'undefined' && old_employee.default != employee.default){
            old_employee.default = employee.default;
            change = true;
          }


          if(change){
            employees.updateEmployee(old_employee, function(err, ok){
              if(err){
                console.error(err);
                var error = {};
                error.code = 'GIFTCARD_DB_ERROR';
                error.message = 'Cannot update database.';
                error.status = 500;
                response.respond(error, res);
              } else {//if err
                delete(ok.rev);
                response.respond(ok, res);
              }//else err
            });//updateMerchant
          } else {//if change
            var error = {};
            error.code = 'NO_CHANGE';
            error.message = 'No Change Found.';
            error.status = 400;
            response.respond(error, res);
          }//else change
        }//else employee name change
      }//else err
    });//findByEmployeeId
  }//else merchantname match
}//employeePut

exports.employeeDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * employeeID (String)
  * authorization (String)
  **/

  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {//if merchant match
    var employeeName = args.employeeID.value;
    var id = 'employees~' + args.merchantname.value + '~' + employeeName;
    console.log(id);
    employees.findByEmployeeId(id, function(err, old_employee){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'EMPLOYEE_NOT_FOUND';
          error.message = 'Could not find employee by name.';
          error.status = 404;
          response.respond(error, res);
        } else {//if 404
          var error = {};
          error.code = 'GIFTCARD_GET_DB_ERROR';
          error.message = 'Cannot get data from database.';
          error.status = 500;
          response.respond(error, res);
        }//else 404
      } else {//if err
        employees.deleteEmployee(old_employee, function(err, ok){
          if(err){
            console.error(err);
            var error = {};
            error.code = 'GIFTCARD_DELETE_DB_ERROR';
            error.message = 'Cannot delete data from database.';
            error.status = 500;
            response.respond(error, res);
          } else {//if err
            response.respond(ok, res);
          }//else err
        });//deleteEmployee
      }//else err
    });//findByEmployeeId
  }//else merchant match
};//employeeDelete
