
//database testing
var DATABASE_TYPE = 'pouchdb';

if(DATABASE_TYPE == 'couchbase') {
  var couchbase = require('couchbase'),
      serverAddress = '127.0.0.1',
      cluster = new couchbase.Cluster('couchbase://' + serverAddress),
      db = cluster.openBucket('giftcard');

  exports.findByCardholderId = function(cardholderId, callback){
    db.get(cardholderId, function(err, cardholder){
      if(err && err.code == 13){
        err.status = 404;
      }
      if(err) {
        callback(err, null);
      } else {
        callback(null, cardholder.value);
      }
    })
  };

  exports.insertCardholder = function(cardholder, callback){
    db.insert(cardholder._id, cardholder, function(err, ok){
      callback(err, ok);
    })
  };

  exports.updateCardholder = function(cardholder, callback){
    db.replace(cardholder._id, cardholder, function(err, ok){
      callback(err, ok);
    })
  };
} else if(DATABASE_TYPE == 'pouchdb'){
  var PouchDB = require('pouchdb');
      PouchDB.plugin(require('pouchdb-find'));
  var db = new PouchDB('./database');
  PouchDB.debug.enable('pouchdb:find')

  exports.findByCardholderId = function(cardholderId, callback){
    db.get(cardholderId).then(function(cardholder){
      callback(null, cardholder);
    }).catch(function(err){
      callback(err, null);
    })
  };

  exports.listCardholdersByFirstname = function(merchantname, offset, range, callback){
    console.log('listCardholdersByFirstname', merchantname);
    db.allDocs({
      include_docs: true,
      attachments: true,
      startkey: 'cardholders~' + merchantname + '~',
      endkey: 'cardholders~' + merchantname + '~' + '\uffff',
      skip: offset,
      limit: range
    }).then(function (result) {
      callback(null, result);
    }).catch(function (err) {
      callback(err);
    });
  };//listCardholders

  exports.listCardholdersByLastname = function(merchantname, offset, range, callback){
    console.log('listCardholdersByLastname', merchantname, offset, range);
    if(typeof offset == 'undefined'){
      offset = 0;
    }
    if(typeof range == 'undefined'){
      range = 25;
    }
    db.find({
      selector: { type: 'cardholders~', merchantname: merchantname, lastname: {'$gt': null} },
      fields: ['_id','merchantname','lastname', 'firstname', 'address1', 'address2', 'phone', 'email'],
      sort: ['lastname'],
      skip: offset,
      limit: range,
      use_index: 'lastnameIndex'
    }).then(function (result) {
      // yo, a result
      callback(null, result);
    }).catch(function (err) {
      // ouch, an error
      callback(err);
    });
  }//listCardholdersByCode

  exports.insertCardholder = function(cardholder, callback){
    db.put(cardholder).then(function(response){
      db.createIndex({
        index: {
          fields: ['lastname'],
          name: 'lastnameIndex'
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

  exports.updateCardholder = function(cardholder, callback){
    db.put(cardholder).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err);
    })
  };

  exports.deleteCardholder = function(cardholder, callback){
    db.remove(cardholder).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err);
    });
  };
}
