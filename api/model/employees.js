
//database testing
var DATABASE_TYPE = 'pouchdb';

if(DATABASE_TYPE == 'couchbase') {
  var couchbase = require('couchbase'),
      serverAddress = '127.0.0.1',
      cluster = new couchbase.Cluster('couchbase://' + serverAddress),
      db = cluster.openBucket('giftcard');

  exports.findByEmployeeId = function(employeeId, callback){
    db.get(employeeId, function(err, employee){
      if(err && err.code == 13){
        err.status = 404;
      }
      if(err) {
        callback(err, null);
      } else {
        callback(null, employee.value);
      }
    })
  };

  exports.insertEmployee = function(employee, callback){
    db.insert(employee._id, employee, function(err, ok){
      callback(err, ok);
    })
  };

  exports.updateEmployee = function(employee, callback){
    db.replace(employee._id, employee, function(err, ok){
      callback(err, ok);
    })
  };
} else if(DATABASE_TYPE == 'pouchdb'){
  var PouchDB = require('pouchdb');
      PouchDB.plugin(require('pouchdb-find'));
  var db = new PouchDB('./database');
  PouchDB.debug.enable('pouchdb:find')

  exports.findByEmployeeId = function(employeeId, callback){
    db.get(employeeId).then(function(employee){
      callback(null, employee);
    }).catch(function(err){
      callback(err, null);
    })
  };

  exports.listEmployeesByName = function(merchantname, offset, range, callback){
    db.allDocs({
      include_docs: true,
      attachments: true,
      startkey: 'employees~' + merchantname + '~',
      endkey: 'employees~' + merchantname + '~' + '\uffff',
      skip: offset,
      limit: range
    }).then(function (result) {
      callback(null, result);
    }).catch(function (err) {
      callback(err);
    });
  };//listEmployees

  exports.listEmployeesByCode = function(merchantname, offset, range, callback){
    db.find({
      selector: { merchantname: merchantname, code: {'$gt':null} },
      fields: ['merchantname','code'],
      sort: ['code'],
      skip: offset,
      limit: range,
      use_index: 'merchantnameCodeIndex'
    }).then(function (result) {
      // yo, a result
      callback(null, result);
    }).catch(function (err) {
      // ouch, an error
      callback(err);
    });
  }//listEmployeesByCode

  exports.insertEmployee = function(employee, callback){
    db.put(employee).then(function(response){
      db.createIndex({
        index: {
          fields: ['merchantname','code'],
          name: 'merchantnameCodeIndex'
        }
      }).then(function (result) {
        // yo, a result
        console.info(result);
        callback(null, response);
      }).catch(function (err) {
        // ouch, an error
        callback(err);
      });
    }).catch(function(err){
      callback(err, null);
    });
  };

  exports.updateEmployee = function(employee, callback){
    db.put(employee).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err);
    })
  };

  exports.deleteEmployee = function(employee, callback){
    db.remove(employee).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err);
    });
  };
}
