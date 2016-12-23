'use strict';

var response = require('../helpers/response');
//var cards = require('../model/cards');
var openmoneyApi = require('../../third_party/openmoney-api-client/javascript-client2/src/');
var oauth = require('../helpers/oauth');
var async = require('async');
var NodeRSA = require('node-rsa');

var crypto = require('crypto');
//    algorithm = 'aes-256-gcm',
//    password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
//// do not use a global iv for production,
//// generate a new one for each encryption
//    iv = '60iP0h6vJoEa'

function encrypt(text, algorithm, password, iv) {
    var cipher = crypto.createCipheriv(algorithm, password, iv);
    var encrypted = cipher.update(JSON.stringify(text), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    var tag = cipher.getAuthTag();
    return {
        content: encrypted,
        tag: tag
    };
}

function decrypt(encrypted, algorithm, password, iv) {
    var decipher = crypto.createDecipheriv(algorithm, password, iv);
    decipher.setAuthTag(encrypted.tag);
    var dec = decipher.update(encrypted.content, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return JSON.parse(dec);
}

exports.reportsList = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * authorization (String)
  * startPeriod (Integer)
  * endPeriod (Integer)
  * cardholderID (String)
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


    oauth.authenticate(args.merchantname.value, function(err, access_token){
      if(err){
        console.error('Error Returned:');
        console.error(err);
        response.respond(err, res);
      } else {
        console.info('authenticated:');
        console.info(access_token);

        var parallel = {};
        var series = {};

        //TODO: get journal listing for time period
        parallel.giftcard = function(callback){

          var journalsApi = new openmoneyApi.JournalsApi();
          var opt = {};
          opt.authorization = 'Bearer ' + access_token;
          var stewardname = args.merchantname.value;
          // opt.namespace = stewardname + '.cc';
          // opt.account = args.merchantname.value;
          // opt.currency = 'giftcard';
          // opt.currencyNamespace = opt.namespace;

          journalsApi.journalsList(stewardname, opt, function(err, data, response){
            if(err){
              callback(err, response);
            } else {
              callback(err, response.body);
            }
          });//journalsList
        };//giftcard

        //if there are no journal post there will not be a listing
        series.giftcard = function(callback){
          parallel.giftcard(function(err, data){
            console.log('journalList results:', err, data)
            if(err){
              if(err.status == 404){
                //ignore
                callback(null, []);
              } else {
                callback(err, data);
              }
            } else {
              callback(err, data);
            }
          });
        };


        // parallel.promo = function(callback){
        //   var journalsApi = new openmoneyApi.JournalsApi();
        //   var authorization = 'Bearer ' + access_token;
        //   var stewardname = args.merchantname.value.toLowerCase();
        //   var namespace = stewardname + '.cc';
        //   var account = args.merchantname.value.toLowerCase();
        //   var currency = 'promo';
        //   var currencyNamespace = namespace;
        //   var offset = args.offset.value;
        //   if(typeof args.offset.value == 'undefined'){
        //     offset = 0;
        //   }
        //   var range = args.range.value;
        //   if(typeof args.offset.value == 'undefined'){
        //     range = 100; //10 pages of 10 rows
        //   }
        //
        //   journalsApi.journalsList(stewardname, namespace, account, currency, authorization, currencyNamespace, offset, range, function(err, data, response){
        //     if(err){
        //       callback(err, response);
        //     } else {
        //       callback(err, response.body);
        //     }
        //   });//journalsList
        // };//promo
        //
        // //if there are no journal post there will not be a listing
        // series.promo = function(callback){
        //   parallel.promo(function(err, data){
        //     if(err){
        //       if(err.status == 404){
        //         //ignore
        //         callback(null, []);
        //       } else {
        //         callback(err, data);
        //       }
        //     } else {
        //       callback(err, data);
        //     }
        //   });
        // };
        //
        // parallel.points = function(callback){
        //   var journalsApi = new openmoneyApi.JournalsApi();
        //   var authorization = 'Bearer ' + access_token;
        //   var stewardname = args.merchantname.value.toLowerCase();
        //   var namespace = stewardname + '.cc';
        //   var account = args.merchantname.value.toLowerCase();
        //   var currency = 'points';
        //   var currencyNamespace = namespace;
        //   var offset = args.offset.value;
        //   if(typeof args.offset.value == 'undefined'){
        //     offset = 0;
        //   }
        //   var range = args.range.value;
        //   if(typeof args.offset.value == 'undefined'){
        //     range = 100; //10 pages of 10 rows
        //   }
        //
        //   journalsApi.journalsList(stewardname, namespace, account, currency, authorization, currencyNamespace, offset, range, function(err, data, response){
        //     if(err){
        //       callback(err, response);
        //     } else {
        //       callback(err, response.body);
        //     }
        //   });//journalsList
        // };//points
        //
        // //if there are no journal post there will not be a listing
        // series.points = function(callback){
        //   parallel.points(function(err, data){
        //     if(err){
        //       if(err.status == 404){
        //         //ignore
        //         callback(null, []);
        //       } else {
        //         callback(err, data);
        //       }
        //     } else {
        //       callback(err, data);
        //     }
        //   });
        // };
        //
        // parallel.tab = function(callback){
        //   var journalsApi = new openmoneyApi.JournalsApi();
        //   var authorization = 'Bearer ' + access_token;
        //   var stewardname = args.merchantname.value.toLowerCase();
        //   var namespace = stewardname + '.cc';
        //   var account = args.merchantname.value.toLowerCase();
        //   var currency = 'tab';
        //   var currencyNamespace = namespace;
        //   var offset = args.offset.value;
        //   if(typeof args.offset.value == 'undefined'){
        //     offset = 0;
        //   }
        //   var range = args.range.value;
        //   if(typeof args.offset.value == 'undefined'){
        //     range = 100; //10 pages of 10 rows
        //   }
        //
        //   journalsApi.journalsList(stewardname, namespace, account, currency, authorization, currencyNamespace, offset, range, function(err, data, response){
        //     if(err){
        //       callback(err, response);
        //     } else {
        //       callback(err, response.body);
        //     }
        //   });//journalsList
        // };//tab
        //
        // //if there are no journal post there will not be a listing
        // series.tab = function(callback){
        //   parallel.tab(function(err, data){
        //     if(err){
        //       if(err.status == 404){
        //         //ignore
        //         callback(null, []);
        //       } else {
        //         callback(err, data);
        //       }
        //     } else {
        //       callback(err, data);
        //     }
        //   });
        // };
        //
        // parallel.stamp = function(callback){
        //   var journalsApi = new openmoneyApi.JournalsApi();
        //   var authorization = 'Bearer ' + access_token;
        //   var stewardname = args.merchantname.value.toLowerCase();
        //   var namespace = stewardname + '.cc';
        //   var account = args.merchantname.value.toLowerCase();
        //   var currency = 'stamp';
        //   var currencyNamespace = namespace;
        //   var offset = args.offset.value;
        //   if(typeof args.offset.value == 'undefined'){
        //     offset = 0;
        //   }
        //   var range = args.range.value;
        //   if(typeof args.offset.value == 'undefined'){
        //     range = 100; //10 pages of 10 rows
        //   }
        //
        //   journalsApi.journalsList(stewardname, namespace, account, currency, authorization, currencyNamespace, offset, range, function(err, data, response){
        //     if(err){
        //       callback(err, response);
        //     } else {
        //       callback(err, response.body);
        //     }
        //   });//journalsList
        // };//stamp
        //
        // //if there are no journal post there will not be a listing
        // series.stamp = function(callback){
        //   parallel.stamp(function(err, data){
        //     if(err){
        //       if(err.status == 404){
        //         //ignore
        //         callback(null, []);
        //       } else {
        //         callback(err, data);
        //       }
        //     } else {
        //       callback(err, data);
        //     }
        //   });
        // };

        // parallel.points = function(callback){
        //   var journalsApi = new openmoneyApi.JournalsApi();
        //   var authorization = 'Bearer ' + access_token;
        //   var stewardname = args.merchantname.value;
        //   var namespace = stewardname + '.cc';
        //   var account = args.merchantname.value;
        //   var currency = 'points';
        //   var currencyNamespace = namespace;
        //   var offset = args.offset.value;
        //   var range = args.range.value;
        //
        //   journalsApi.journalsList(stewardname, namespace, account, currency, authorization, currencyNamespace, offset, range, function(err, data, response){
        //     callback(err, response.body);
        //   });//journalsList
        // };//points

        async.series(series, function(err, data){
            if(err){
              console.error(err);
              var error = {};
              error.code = 'REPORT_ERROR';
              error.message = 'Could not get report.';
              error.status = 500;
              response.respond(error, res);
            } else {
              //console.info(data);
              if(typeof args.user.privateKey != 'undefined'){
                var key = new NodeRSA();
                key.importKey(args.user.privateKey);

                var resultsArray = [];
                if(typeof data.giftcard != 'undefined'){
                  data.giftcard.forEach(function(journalEntry){
                    var symetricKey = key.decrypt(journalEntry.publicKeyEncryptedSymetricKey, 'utf8');
                    journalEntry.encryptedJournal.tag = new Buffer(journalEntry.encryptedJournal.tag.data);
                    var journal = decrypt(journalEntry.encryptedJournal, journalEntry.algorithm, symetricKey, journalEntry.initializationVector);
                    resultsArray.push(journal);
                  });
                }

                if(typeof data.promo != 'undefined'){
                  data.promo.forEach(function(journalEntry){
                    var symetricKey = key.decrypt(journalEntry.publicKeyEncryptedSymetricKey, 'utf8');
                    journalEntry.encryptedJournal.tag = new Buffer(journalEntry.encryptedJournal.tag.data);
                    var journal = decrypt(journalEntry.encryptedJournal, journalEntry.algorithm, symetricKey, journalEntry.initializationVector);
                    resultsArray.push(journal);
                  });
                }

                if(typeof data.points != 'undefined'){
                  data.points.forEach(function(journalEntry){
                    var symetricKey = key.decrypt(journalEntry.publicKeyEncryptedSymetricKey, 'utf8');
                    journalEntry.encryptedJournal.tag = new Buffer(journalEntry.encryptedJournal.tag.data);
                    var journal = decrypt(journalEntry.encryptedJournal, journalEntry.algorithm, symetricKey, journalEntry.initializationVector);
                    resultsArray.push(journal);
                  });
                }

                if(typeof data.tab != 'undefined'){
                  data.tab.forEach(function(journalEntry){
                    var symetricKey = key.decrypt(journalEntry.publicKeyEncryptedSymetricKey, 'utf8');
                    journalEntry.encryptedJournal.tag = new Buffer(journalEntry.encryptedJournal.tag.data);
                    var journal = decrypt(journalEntry.encryptedJournal, journalEntry.algorithm, symetricKey, journalEntry.initializationVector);
                    resultsArray.push(journal);
                  });
                }

                if(typeof data.stamp != 'undefined'){
                  data.stamp.forEach(function(journalEntry){
                    var symetricKey = key.decrypt(journalEntry.publicKeyEncryptedSymetricKey, 'utf8');
                    journalEntry.encryptedJournal.tag = new Buffer(journalEntry.encryptedJournal.tag.data);
                    var journal = decrypt(journalEntry.encryptedJournal, journalEntry.algorithm, symetricKey, journalEntry.initializationVector);
                    resultsArray.push(journal);
                  });
                }

              } else {
                console.log('Users private key is not defined!');
              }

              // data.points.forEach(function(journalEntry){
              //   var symetricKey = key.decrypt(journalEntry.publicKeyEncryptedSymetricKey, 'utf8');
              //   journalEntry.encryptedJournal.tag = new Buffer(journalEntry.encryptedJournal.tag.data);
              //   var journal = decrypt(journalEntry.encryptedJournal, journalEntry.algorithm, symetricKey, journalEntry.initializationVector);
              //   resultsArray.push(journal);
              // });

              console.info(resultsArray);

              var responseArray = [];
              resultsArray.forEach(function(result){
                var responseObject = {};
                if(typeof result.payload != 'undefined'){
                  responseObject.employeeID = result.payload.employeeID;
                  responseObject.cardholderID = result.payload.cardholderID;
                }

                responseObject.load = false;
                responseObject.redeem = false;
                if(result.from_account.toLowerCase() == args.merchantname.value.toLowerCase()){
                  responseObject.load = true;
                  responseObject.key = result.to_account;
                } else {
                  responseObject.redeem = true;
                  responseObject.key = result.from_account;
                }
                responseObject.currency = result.currency;
                responseObject.timestamp = result.created;
                responseObject.amount = result.amount;


                //filter by date-time parameters
                if(args.start_period.value < responseObject.timestamp && args.end_period.value >= responseObject.timestamp){
                  responseArray.push(responseObject);
                } else if((args.start_period.value == 0 && args.end_period.value == 0) || (typeof args.start_period.value == 'undefined' && typeof args.end_period.value == 'undefined')){
                  responseArray.push(responseObject);
                } else {
                  //ignore
                }
              });

              //TODO: filter response by date-time parameters
              response.respond(responseArray, res);
            }
        });
      }//else err
    });//authenticate
  }//else merchant match
};
