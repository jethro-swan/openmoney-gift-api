
//database testing
var DATABASE_TYPE = 'pouchdb';

if(DATABASE_TYPE == 'couchbase') {
  var couchbase = require('couchbase'),
      serverAddress = '127.0.0.1',
      cluster = new couchbase.Cluster('couchbase://' + serverAddress),
      db = cluster.openBucket('giftcard');

  exports.findByMerchantId = function(merchantId, callback){
    db.get(merchantId, function(err, merchant){
      if(err && err.code == 13){
        err.status = 404;
      }
      if(err) {
        callback(err, null);
      } else {
        callback(null, merchant.value);
      }
    })
  };



  exports.insertMerchant = function(merchant, callback){
    db.insert(merchant._id, merchant, function(err, ok){
      callback(err, ok);
    })
  };

  exports.updateMerchant = function(merchant, callback){
    db.replace(merchant._id, merchant, function(err, ok){
      callback(err, ok);
    })
  };
} else if(DATABASE_TYPE == 'pouchdb'){
  var PouchDB = require('pouchdb'),
      db = new PouchDB('./database');

  exports.findByMerchantId = function(merchantId, callback){
    db.get(merchantId).then(function(merchant){
      callback(null, merchant);
    }).catch(function(err){
      callback(err, null);
    })
  };

  exports.findByEmail = function(email, callback){
    console.info('findByEmail', email);
    db.find({
      selector: { type: 'merchants~', email: email },
      fields: ['_id','merchantname','email'],
      sort: ['email'],
      use_index: 'emailIndex'
    }).then(function (result) {
      // yo, a result
      callback(null, result);
    }).catch(function (err) {
      // ouch, an error
      callback(err);
    });
  }//findByEmail

  exports.insertMerchant = function(merchant, callback){
    db.put(merchant).then(function(response){
      db.createIndex({
        index: {
          fields: ['email', 'type'],
          name: 'emailIndex'
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

  exports.updateMerchant = function(merchant, callback){
    db.put(merchant).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err,null);
    })
  };
}
