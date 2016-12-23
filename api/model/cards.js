
//database testing
var DATABASE_TYPE = 'pouchdb';

if(DATABASE_TYPE == 'couchbase') {
  var couchbase = require('couchbase'),
      serverAddress = '127.0.0.1',
      cluster = new couchbase.Cluster('couchbase://' + serverAddress),
      db = cluster.openBucket('giftcard');

  exports.findByCardId = function(cardId, callback){
    db.get(cardId, function(err, card){
      if(err && err.code == 13){
        err.status = 404;
      }
      if(err) {
        callback(err, null);
      } else {
        callback(null, card.value);
      }
    })
  };

  exports.insertCard = function(card, callback){
    db.insert(card._id, card, function(err, ok){
      callback(err, ok);
    })
  };

  exports.updateCard = function(card, callback){
    db.replace(card._id, card, function(err, ok){
      callback(err, ok);
    })
  };
} else if(DATABASE_TYPE == 'pouchdb'){
  var PouchDB = require('pouchdb');
      PouchDB.plugin(require('pouchdb-find'));
  var db = new PouchDB('./database');
  PouchDB.debug.enable('pouchdb:find')

  exports.findByCardId = function(cardId, callback){
    db.get(cardId).then(function(card){
      callback(null, card);
    }).catch(function(err){
      callback(err, null);
    })
  };

  exports.listCardsByKey = function(merchantname, offset, range, callback){
    db.allDocs({
      include_docs: true,
      attachments: true,
      startkey: 'cards~' + merchantname + '~',
      endkey: 'cards~' + merchantname + '~' + '\uffff',
      skip: offset,
      limit: range
    }).then(function (result) {
      callback(null, result);
    }).catch(function (err) {
      callback(err);
    });
  };//listCards

  exports.listCardsByGift = function(merchantname, offset, range, callback){
    db.find({
      selector: { type: 'cards~', merchantname: merchantname, gift: {'$gt': null} },
      fields: ['_id', 'key', 'gift'],
      sort: ['balance'],
      skip: offset,
      limit: range
    }).then(function (result) {
      // yo, a result
      callback(null, result);
    }).catch(function (err) {
      // ouch, an error
      callback(err);
    });
  }//listCardsByBalance

  exports.listCardsByPoints = function(merchantname, offset, range, callback){
    db.find({
      selector: { type: 'cards~', merchantname: merchantname, points: {'$gt': null} },
      fields: ['_id', 'key', 'points'],
      sort: ['points'],
      skip: offset,
      limit: range
    }).then(function (result) {
      // yo, a result
      callback(null, result);
    }).catch(function (err) {
      // ouch, an error
      callback(err);
    });
  }//listCardsByPoints

  exports.insertCard = function(card, callback){
    db.put(card).then(function(response){
      db.createIndex({
        index: {
          fields: ['balance']
        }
      }).then(function (result) {
        db.createIndex({
          index: {
            fields: ['points']
          }
        }).then(function (result) {
          // yo, a result
          console.info(result);
          callback(null, response);
        }).catch(function (err) {
          // ouch, an error
          callback(err);
        });
      }).catch(function (err) {
        // ouch, an error
        callback(err);
      });
    }).catch(function(err){
      callback(err, null);
    });
  };

  exports.updateCard = function(card, callback){
    db.put(card).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err);
    })
  };

  exports.deleteCard = function(card, callback){
    db.remove(card).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err);
    });
  };
}
