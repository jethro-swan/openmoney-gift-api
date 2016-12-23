'use strict';

var response = require('../helpers/response');
var cards = require('../model/cards');
var openmoneyApi = require('../../third_party/openmoney-api-client/javascript-client/src/');
var oauth = require('../helpers/oauth');
var async = require('async');
var templates = require('../model/templates');


exports.cardsList = function(args, res, next) {
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

    if(typeof args.order_by.value == 'undefined' || args.order_by.value == 'key'){
      args.order_by.value = 'key';
      cards.listCardsByKey(args.merchantname.value, args.offset.value, args.range.value, function(err, cards){
        if(err){
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Could not get database list of cards by key.';
          error.status = 500;
          response.respond(error, res);
        } else {
          var results = [];
          cards.rows.forEach(function(row){
            delete(row.doc.type);
            delete(row.doc.merchantname);
            delete(row.doc._rev);
            //delete(row.doc._id);
            results.push(row.doc);
          })
          response.respond(results, res);
        }//else err
      });//listCardholdersByName
    } else if(args.order_by.value == 'gift'){//if orderBy = name
      //order by code
      cards.listCardsByBalance(args.merchantname.value, args.offset.value, args.range.value, function(err, cards){
        if(err){
          console.error(err);
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Could not get database list of cards by gift.';
          error.status = 500;
          response.respond(error, res);
        } else {
          console.log(cards);
          response.respond(cards.docs, res);
        }//else err
      });//listCardholdersByName
    } else if(args.order_by.value == 'points'){//if orderBy = name
      //order by code
      cards.listCardsByPoints(args.merchantname.value, args.offset.value, args.range.value, function(err, cards){
        if(err){
          console.error(err);
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Could not get database list of cards by points.';
          error.status = 500;
          response.respond(error, res);
        } else {
          console.log(cards);
          response.respond(cards.docs, res);
        }//else err
      });//listCardholdersByName
    } else {
      var error = {};
      error.code = 'ORDER_BY_NOT_FOUND';
      error.message = 'Could not order by that column.';
      error.status = 400;
      response.respond(error, res);
    } //else orderBy
  }//else merchant match
}//cardsList

exports.cardPost = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * authorization (String)
  * card (Cards_request)
  **/

  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {
    var card_request = args.card.value;

    var card = {};
    card.key = card_request.key;
    card.balances = {};
    // if(typeof card_request.balance != 'undefined') {
    //   card.balance[card_request.currency] = card_request.balance;
    // }

    card.volumes = {};
    // if(typeof card_request.volume != 'undefined'){
    //   card.volume[card_request.currency] = card_request.volume;
    // }


    // if(typeof card_request.gift != 'undefined'){
    //   card.gift = card_request.gift;
    //   card.giftVolume = card_request.gift;
    // }
    // if(typeof card_request.promo != 'undefined'){
    //   card.promo = card_request.promo;
    //   card.promoVolume = card_request.promo;
    // }
    // if(typeof card_request.points != 'undefined'){
    //   card.points = card_request.points;
    //   card.pointsVolume = card_request.points;
    // }
    // if(typeof card_request.tab != 'undefined'){
    //   card.tab = card_request.tab;
    //   card.tabVolume = card_request.tab;
    // }
    // if(typeof card_request.stamp != 'undefined'){
    //   card.stamp = card_request.stamp;
    //   card.stampVolume = card_request.stamp;
    // }
    if(typeof card_request.cardholderID != 'undefined'){
      card.cardholderID = card_request.cardholderID;
    }
    if(typeof card_request.employeeID != 'undefined'){
      card.employeeID = card_request.employeeID;
    }
    card.type = 'cards~';
    card.merchantname = args.merchantname.value;
    card._id = card.type + args.merchantname.value + '~' + card.key;
    card.created_by = card_request.employeeID;

    cards.findByCardId(card._id, function(err, old_card){
      if(err){
        console.error(err);
        if(err.status == 404){
          console.info('card not found insert card:');
          console.info(card);

          oauth.authenticate(args.merchantname.value, function(err, access_token){
            if(err){
              console.error('Error Returned:');
              console.error(err);
              response.respond(error, res);
            } else {
              console.info('authenticated:');
              console.info(access_token);
              //TODO:Create openmoney accounts in giftcard and points currency.

              var parallel = {};
              if(typeof card.gift != 'undefined'){
                parallel.giftcardCreate = function(callback){

                  var accountsApi = new openmoneyApi.AccountsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';

                  var account = {};
                  account.account = card.key;
                  account.account_namespace = namespace;
                  account.currency = 'giftcard';
                  account.currency_namespace = namespace;
                  account.stewards = ['stewards~' + stewardname];
                  //account.publicKey = card.key;

                  console.info(account);
                  accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
                    callback(err, data);
                  });//accountsPost
                };//giftcardCreate
              }

              if(typeof card.promo != 'undefined'){
                parallel.promoCreate = function(callback){

                  var accountsApi = new openmoneyApi.AccountsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';

                  var account = {};
                  account.account = card.key;
                  account.account_namespace = namespace;
                  account.currency = 'promo';
                  account.currency_namespace = namespace;
                  account.stewards = ['stewards~' + stewardname];
                  //account.publicKey = card.key;

                  console.log(account)
                  accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
                    callback(err, data);
                  });//accountsPost
                };//promoCreate
              }//if promo

              if(typeof card.points != 'undefined'){
                parallel.pointsCreate = function(callback){

                  var accountsApi = new openmoneyApi.AccountsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';

                  var account = {};
                  account.account = card.key;
                  account.account_namespace = namespace;
                  account.currency = 'points';
                  account.currency_namespace = namespace;
                  account.stewards = ['stewards~' + stewardname];
                  //account.publicKey = card.key;

                  console.log(account)
                  accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
                    callback(err, data);
                  });//accountsPost
                };//pointsCreate
              }//if points

              if(typeof card.tab != 'undefined'){
                parallel.tabCreate = function(callback){

                  var accountsApi = new openmoneyApi.AccountsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';

                  var account = {};
                  account.account = card.key;
                  account.account_namespace = namespace;
                  account.currency = 'tab';
                  account.currency_namespace = namespace;
                  account.stewards = ['stewards~' + stewardname];
                  //account.publicKey = card.key;

                  console.log(account)
                  accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
                    callback(err, data);
                  });//accountsPost
                };//tabCreate
              }//if tab

              if(typeof card.stamp != 'undefined'){
                parallel.stampCreate = function(callback){

                  var accountsApi = new openmoneyApi.AccountsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';

                  var account = {};
                  account.account = card.key;
                  account.account_namespace = namespace;
                  account.currency = 'stamp';
                  account.currency_namespace = namespace;
                  account.stewards = ['stewards~' + stewardname];
                  //account.publicKey = card.key;

                  console.log(account)
                  accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
                    callback(err, data);
                  });//accountsPost
                };//stampCreate
              }//if stamp

              parallel.cardCreate = function(callback){
                cards.insertCard(card, function(err, ok){
                  callback(err, ok);
                });//insertCard
              };//cardCreate

              //TODO:If balance is not zero do initial transaction on accounts.
              if(card.gift > 0){
                parallel.giftcardInit = function(callback){
                  var journalsApi = new openmoneyApi.JournalsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';
                  var account = args.merchantname.value;
                  var currency = 'giftcard';
                  var currencyNamespace = namespace;

                  var journal = {};
                  journal.to_account = card.key;
                  journal.to_account_namespace = namespace;
                  journal.amount = card.gift;
                  journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                  journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                    callback(err, data);
                  });//journalsPost
                };//giftcardInit
              } else {//balance > 0
                //balance is in the negative so insert into card.
                if(typeof card.gift != 'undefined'){
                  parallel.giftcardInit = function(callback){
                    var journalsApi = new openmoneyApi.JournalsApi();
                    var authorization = 'Bearer ' + access_token;
                    var stewardname = args.merchantname.value;
                    var namespace = stewardname + '.cc';
                    var account = card.key;
                    var currency = 'giftcard';
                    var currencyNamespace = namespace;

                    var journal = {};
                    journal.to_account = args.merchantname.value;
                    journal.to_account_namespace = namespace;
                    journal.amount = -1 * card.gift;
                    journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                    journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                      callback(err, data);
                    });//journalsPost
                  };//giftcardInit
                }//if gift defined
              }//balance < 0

              if(card.points > 0){
                parallel.pointsInit = function(callback){
                  var journalsApi = new openmoneyApi.JournalsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';
                  var account = args.merchantname.value;
                  var currency = 'points';
                  var currencyNamespace = namespace;

                  var journal = {};
                  journal.to_account = card.key;
                  journal.to_account_namespace = namespace;
                  journal.amount = card.points;
                  journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                  journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                    callback(err, data);
                  });//journalsPost
                };//pointsInit
              } else {//points > 0
                if(typeof card.points != 'undefined'){
                  parallel.pointsInit = function(callback){
                    var journalsApi = new openmoneyApi.JournalsApi();
                    var authorization = 'Bearer ' + access_token;
                    var stewardname = args.merchantname.value;
                    var namespace = stewardname + '.cc';
                    var account = card.key;
                    var currency = 'points';
                    var currencyNamespace = namespace;

                    var journal = {};
                    journal.to_account = args.merchantname.value;
                    journal.to_account_namespace = namespace;
                    journal.amount = -1 * card.points;
                    journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                    journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                      callback(err, data);
                    });//journalsPost
                  };//pointsInit
                }//points not null
              }// else points > 0

              if(card.promo > 0){
                parallel.promoInit = function(callback){
                  var journalsApi = new openmoneyApi.JournalsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';
                  var account = args.merchantname.value;
                  var currency = 'promo';
                  var currencyNamespace = namespace;

                  var journal = {};
                  journal.to_account = card.key;
                  journal.to_account_namespace = namespace;
                  journal.amount = card.promo;
                  journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                  journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                    callback(err, data);
                  });//journalsPost
                };//promoInit
              } else {//promo > 0
                if(typeof card.promo != 'undefined'){
                  parallel.promoInit = function(callback){
                    var journalsApi = new openmoneyApi.JournalsApi();
                    var authorization = 'Bearer ' + access_token;
                    var stewardname = args.merchantname.value;
                    var namespace = stewardname + '.cc';
                    var account = card.key;
                    var currency = 'promo';
                    var currencyNamespace = namespace;

                    var journal = {};
                    journal.to_account = args.merchantname.value;
                    journal.to_account_namespace = namespace;
                    journal.amount = -1 * card.promo;
                    journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                    journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                      callback(err, data);
                    });//journalsPost
                  };//promoInit
                }//promo not null
              }// else promo > 0

              if(card.tab > 0){
                parallel.tabInit = function(callback){
                  var journalsApi = new openmoneyApi.JournalsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';
                  var account = args.merchantname.value;
                  var currency = 'tab';
                  var currencyNamespace = namespace;

                  var journal = {};
                  journal.to_account = card.key;
                  journal.to_account_namespace = namespace;
                  journal.amount = card.tab;
                  journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                  journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                    callback(err, data);
                  });//journalsPost
                };//tabInit
              } else {//tab > 0
                if(typeof card.tab != 'undefined'){
                  parallel.tabInit = function(callback){
                    var journalsApi = new openmoneyApi.JournalsApi();
                    var authorization = 'Bearer ' + access_token;
                    var stewardname = args.merchantname.value;
                    var namespace = stewardname + '.cc';
                    var account = card.key;
                    var currency = 'tab';
                    var currencyNamespace = namespace;

                    var journal = {};
                    journal.to_account = args.merchantname.value;
                    journal.to_account_namespace = namespace;
                    journal.amount = -1 * card.tab;
                    journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                    journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                      callback(err, data);
                    });//journalsPost
                  };//tabInit
                }//tab not null
              }// else tab > 0

              if(card.stamp > 0){
                parallel.stampInit = function(callback){
                  var journalsApi = new openmoneyApi.JournalsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';
                  var account = args.merchantname.value;
                  var currency = 'stamp';
                  var currencyNamespace = namespace;

                  var journal = {};
                  journal.to_account = card.key;
                  journal.to_account_namespace = namespace;
                  journal.amount = card.stamp;
                  journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                  journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                    callback(err, data);
                  });//journalsPost
                };//stmapInit
              } else {//stamp > 0
                if(typeof card.stamp != 'undefined'){
                  parallel.stampInit = function(callback){
                    var journalsApi = new openmoneyApi.JournalsApi();
                    var authorization = 'Bearer ' + access_token;
                    var stewardname = args.merchantname.value;
                    var namespace = stewardname + '.cc';
                    var account = card.key;
                    var currency = 'stamp';
                    var currencyNamespace = namespace;

                    var journal = {};
                    journal.to_account = args.merchantname.value;
                    journal.to_account_namespace = namespace;
                    journal.amount = -1 * card.stamp;
                    journal.payload = { employeeID: card.employeeID, cardholderID: card.cardholderID };

                    journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                      callback(err, data);
                    });//journalsPost
                  };//stampInit
                }//stamp not null
              }// else stamp > 0

              //TODO:switch to parallel in performance improvements
              async.series(parallel, function(err, data){
                if(err){
                  console.error(err);
                  var error = {};
                  error.code = 'CARD_INSERT_ERROR';
                  error.message = 'Could not insert card.';
                  error.status = 500;
                  response.respond(error, res);
                } else {
                  console.info(data);
                  var result = {};
                  result.ok = true;
                  response.respond(result, res);
                }
              });//asyncPost
            }//else err
          });//authenticate
        } else { //if 404
          //db error
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Cannot get giftcard database.';
          error.status = 500;
          response.respond(error, res);
        }//else 404
      } else {//if err
        //card exists already
        var error = {};
        error.code = 'CARD_EXISTS';
        error.message = 'That card already exists.';
        error.status = 400;
        response.respond(error, res);
      }//else err
    });//findByCardId
  }//else merchant match
};//cardPost

exports.cardsBalance = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardID (String)
  * authorization (String)
  **/


  console.info(args);

  // if(args.merchantname.value != args.user.merchantname){
  //   var error = {};
  //   error.code = 'MERCHANT_UNAUTHORIZED';
  //   error.message = 'Cannot access another merchants data.';
  //   error.status = 400;
  //   response.respond(error, res);
  // } else {
    var card_key = args.cardID.value;
    cards.findByCardId('cards~' + args.merchantname.value + '~' + card_key, function(err, result){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'CARD_NOT_FOUND';
          error.message = 'Could not find card by key.';
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
    });//findByCardholderId
  // }//else merchantname match
}//cardsBalance

exports.cardsLoad = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardID (String)
  * authorization (String)
  * giftload (Load_request)
  **/

  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {
    var card_key = args.cardID.value;
    var id = 'cards~' + args.merchantname.value + '~' + card_key;
    console.log(id);
    cards.findByCardId(id, function(err, old_card){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'CARD_NOT_FOUND';
          error.message = 'Could not find card by name.';
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

        //authenticate against openmoney network
        oauth.authenticate(args.merchantname.value, function(err, access_token){
          if(err){
            console.error('Error Returned:');
            console.error(err);
            response.respond(err, res);
          } else {
            console.info('authenticated:');
            console.info(access_token);

            var parallel = {};
            var change = false;

            var giftload = args.giftload.value;
            if(typeof giftload.amount != 'undefined' && giftload.amount > 0 && typeof giftload.currency != 'undefined'){
              change = true;
              if(typeof old_card.balances == 'undefined'){
                old_card.balances = {};
                old_card.volumes = {};
              }
              if(typeof old_card.balances[giftload.currency] == 'undefined'){
                //create the account first
                parallel.currencyAccountCreate = function(callback){

                  var accountsApi = new openmoneyApi.AccountsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';

                  var account = {};
                  account.account = card_key;
                  account.account_namespace = namespace;
                  account.currency = giftload.currency;
                  account.currency_namespace = namespace;
                  account.stewards = ['stewards~' + stewardname];
                  //account.publicKey = card.key;

                  console.info(account);
                  accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
                    callback(err, data);
                  });//accountsPost
                };//giftcardCreate
                old_card.balances[giftload.currency] = 0;
                old_card.volumes[giftload.currency] = 0;
              }
              old_card.balances[giftload.currency] += giftload.amount;
              old_card.volumes[giftload.currency] += giftload.amount;
              parallel.processJournal = function(callback){
                var journalsApi = new openmoneyApi.JournalsApi();
                var authorization = 'Bearer ' + access_token;
                var stewardname = args.merchantname.value;
                var namespace = stewardname + '.cc';
                var account = args.merchantname.value;
                var currency = giftload.currency;
                var currencyNamespace = namespace;

                var journal = {};
                journal.to_account = card_key;
                journal.to_account_namespace = namespace;
                journal.amount = giftload.amount;
                journal.payload = { employeeID: giftload.employeeID, cardholderID: giftload.cardholderID };

                journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                  callback(err, data);
                });//journalsPost
              };//giftcardInit

            }
            // if(typeof giftload.gift != 'undefined' && giftload.gift > 0){
            //   change = true;
            //   if(typeof old_card.gift == 'undefined'){
            //     //create the account first
            //     parallel.giftcardCreate = function(callback){
            //
            //       var accountsApi = new openmoneyApi.AccountsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //
            //       var account = {};
            //       account.account = card_key;
            //       account.account_namespace = namespace;
            //       account.currency = 'giftcard';
            //       account.currency_namespace = namespace;
            //       account.stewards = ['stewards~' + stewardname];
            //       //account.publicKey = card.key;
            //
            //       console.info(account);
            //       accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
            //         callback(err, data);
            //       });//accountsPost
            //     };//giftcardCreate
            //     old_card.gift = 0;
            //     old_card.giftVolume = 0;
            //   }
            //   old_card.gift = old_card.gift + giftload.gift;
            //   old_card.giftVolume = old_card.giftVolume + giftload.gift;
            //   parallel.giftcardInit = function(callback){
            //     var journalsApi = new openmoneyApi.JournalsApi();
            //     var authorization = 'Bearer ' + access_token;
            //     var stewardname = args.merchantname.value;
            //     var namespace = stewardname + '.cc';
            //     var account = args.merchantname.value;
            //     var currency = 'giftcard';
            //     var currencyNamespace = namespace;
            //
            //     var journal = {};
            //     journal.to_account = card_key;
            //     journal.to_account_namespace = namespace;
            //     journal.amount = giftload.gift;
            //     journal.payload = { employeeID: giftload.employeeID, cardholderID: giftload.cardholderID };
            //
            //     journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //       callback(err, data);
            //     });//journalsPost
            //   };//giftcardInit
            // }//if giftload.amount
            //
            //
            // if(typeof giftload.promo != 'undefined' && giftload.promo > 0){
            //   change = true;
            //   if(typeof old_card.promo == 'undefined'){
            //
            //     parallel.promoCreate = function(callback){
            //
            //       var accountsApi = new openmoneyApi.AccountsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //
            //       var account = {};
            //       account.account = card_key;
            //       account.account_namespace = namespace;
            //       account.currency = 'promo';
            //       account.currency_namespace = namespace;
            //       account.stewards = ['stewards~' + stewardname];
            //       //account.publicKey = card.key;
            //
            //       console.log(account)
            //       accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
            //         callback(err, data);
            //       });//accountsPost
            //
            //     }//if promo
            //     old_card.promo = 0;
            //     old_card.promoVolume = 0;
            //   }
            //   old_card.promo = old_card.promo + giftload.promo;
            //   old_card.promoVolume = old_card.promoVolume + giftload.promo;
            //   parallel.promoInit = function(callback){
            //     var journalsApi = new openmoneyApi.JournalsApi();
            //     var authorization = 'Bearer ' + access_token;
            //     var stewardname = args.merchantname.value;
            //     var namespace = stewardname + '.cc';
            //     var account = args.merchantname.value
            //     var currency = 'promo';
            //     var currencyNamespace = namespace;
            //
            //     var journal = {};
            //     journal.to_account = card_key;
            //     journal.to_account_namespace = namespace;
            //     journal.amount = giftload.promo;
            //     journal.payload = { employeeID: giftload.employeeID, cardholderID: giftload.cardholderID };
            //
            //     journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //       callback(err, data);
            //     });//journalsPost
            //   };//giftcardInit
            // }//if giftload.promo
            //
            // if(typeof giftload.points != 'undefined' && giftload.points > 0){
            //   change = true;
            //   if(typeof old_card.points == 'undefined'){
            //     parallel.pointsCreate = function(callback){
            //
            //       var accountsApi = new openmoneyApi.AccountsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //
            //       var account = {};
            //       account.account = card_key;
            //       account.account_namespace = namespace;
            //       account.currency = 'points';
            //       account.currency_namespace = namespace;
            //       account.stewards = ['stewards~' + stewardname];
            //       //account.publicKey = card.key;
            //
            //       console.log(account)
            //       accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
            //         callback(err, data);
            //       });//accountsPost
            //     };//pointsCreate
            //     old_card.points = 0;
            //     old_card.pointsVolume = 0;
            //   }
            //   old_card.points = old_card.points + giftload.points;
            //   old_card.pointsVolume = old_card.pointsVolume + giftload.points;
            //   parallel.pointsInit = function(callback){
            //     var journalsApi = new openmoneyApi.JournalsApi();
            //     var authorization = 'Bearer ' + access_token;
            //     var stewardname = args.merchantname.value;
            //     var namespace = stewardname + '.cc';
            //     var account = args.merchantname.value
            //     var currency = 'points';
            //     var currencyNamespace = namespace;
            //
            //     var journal = {};
            //     journal.to_account = card_key;
            //     journal.to_account_namespace = namespace;
            //     journal.amount = giftload.points;
            //     journal.payload = { employeeID: giftload.employeeID, cardholderID: giftload.cardholderID };
            //
            //     journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //       callback(err, data);
            //     });//journalsPost
            //   };//giftcardInit
            // }//if giftload.points
            //
            //
            //
            // if(typeof giftload.tab != 'undefined' && giftload.tab > 0){
            //   change = true;
            //   if(typeof old_card.tab == 'undefined'){
            //     parallel.tabCreate = function(callback){
            //
            //       var accountsApi = new openmoneyApi.AccountsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //
            //       var account = {};
            //       account.account = card_key;
            //       account.account_namespace = namespace;
            //       account.currency = 'tab';
            //       account.currency_namespace = namespace;
            //       account.stewards = ['stewards~' + stewardname];
            //       //account.publicKey = card.key;
            //
            //       console.log(account)
            //       accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
            //         callback(err, data);
            //       });//accountsPost
            //     };//tabCreate
            //     old_card.tab = 0;
            //     old_card.tabVolume = 0;
            //   }
            //   old_card.tab = old_card.tab + giftload.tab;
            //   old_card.tabVolume = old_card.tabVolume + giftload.tab;
            //   parallel.tabInit = function(callback){
            //     var journalsApi = new openmoneyApi.JournalsApi();
            //     var authorization = 'Bearer ' + access_token;
            //     var stewardname = args.merchantname.value;
            //     var namespace = stewardname + '.cc';
            //     var account = args.merchantname.value
            //     var currency = 'tab';
            //     var currencyNamespace = namespace;
            //
            //     var journal = {};
            //     journal.to_account = card_key;
            //     journal.to_account_namespace = namespace;
            //     journal.amount = giftload.tab;
            //     journal.payload = { employeeID: giftload.employeeID, cardholderID: giftload.cardholderID };
            //
            //     journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //       callback(err, data);
            //     });//journalsPost
            //   };//giftcardInit
            // }//if giftload.tab
            //
            // if(typeof giftload.stamp != 'undefined' && giftload.stamp > 0){
            //   change = true;
            //   if(typeof old_card.stamp == 'undefined'){
            //     parallel.stampCreate = function(callback){
            //
            //       var accountsApi = new openmoneyApi.AccountsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //
            //       var account = {};
            //       account.account = card_key;
            //       account.account_namespace = namespace;
            //       account.currency = 'stamp';
            //       account.currency_namespace = namespace;
            //       account.stewards = ['stewards~' + stewardname];
            //       //account.publicKey = card.key;
            //
            //       console.log(account)
            //       accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
            //         callback(err, data);
            //       });//accountsPost
            //     };//stampCreate
            //     old_card.stamp = 0;
            //     old_card.stampVolume = 0;
            //   }
            //   old_card.stamp = old_card.stamp + giftload.stamp;
            //   old_card.stampVolume = old_card.stampVolume + giftload.stamp;
            //   parallel.stampInit = function(callback){
            //     var journalsApi = new openmoneyApi.JournalsApi();
            //     var authorization = 'Bearer ' + access_token;
            //     var stewardname = args.merchantname.value;
            //     var namespace = stewardname + '.cc';
            //     var account = args.merchantname.value
            //     var currency = 'stamp';
            //     var currencyNamespace = namespace;
            //
            //     var journal = {};
            //     journal.to_account = card_key;
            //     journal.to_account_namespace = namespace;
            //     journal.amount = giftload.stamp;
            //     journal.payload = { employeeID: giftload.employeeID, cardholderID: giftload.cardholderID };
            //
            //     journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //       callback(err, data);
            //     });//journalsPost
            //   };//giftcardInit
            // }//if giftload.points

            console.info(old_card);
            if(change){
              parallel.updateCard = function(callback){
                cards.updateCard(old_card, function(err, ok){
                  callback(err, ok);
                });//updateCard
              }

              async.series(parallel, function(err, results){
                if(err){
                  console.error(err);
                  if(err.response.body.code == 5009){
                    var error = {};
                    error.code = 'OPENMONEY_NETWORK_ERROR';
                    error.message = 'The card is frozen, goto card and unfreeze.';
                    error.status = 403;
                    response.respond(error, res);
                  } else {
                    var error = {};
                    error.code = 'GIFTCARD_DB_ERROR';
                    error.message = 'Could not update database, please try again.';
                    error.status = 500;
                    response.respond(error, res);
                  }
                } else {//if err
                  console.log(results);
                  var result = {};
                  result.balance = old_card.balances[giftload.currency];
                  result.volume = old_card.volumes[giftload.currency];
                  result.timestamp = results.processJournal.id.split('~')[4];
                  // if(typeof old_card.gift != 'undefined'){
                  //   result.gift = old_card.gift;
                  //   result.giftVolume = old_card.giftVolume;
                  //   if(typeof results.giftcardInit != 'undefined'){
                  //     result.timestamp = results.giftcardInit.id.split('~')[4];
                  //   }
                  // }
                  // if(typeof old_card.promo != 'undefined'){
                  //   result.promo = old_card.promo;
                  //   result.promoVolume = old_card.promoVolume;
                  //   if(typeof results.promoInit != 'undefined'){
                  //     result.timestamp = results.promoInit.id.split('~')[4];
                  //   }
                  // }
                  // if(typeof old_card.points != 'undefined'){
                  //   result.points = old_card.points;
                  //   result.pointsVolume = old_card.pointsVolume;
                  //   if(typeof results.pointsInit != 'undefined'){
                  //     result.timestamp = results.pointsInit.id.split('~')[4];
                  //   }
                  // }
                  // if(typeof old_card.tab != 'undefined'){
                  //   result.tab = old_card.tab;
                  //   result.tabVolume = old_card.tabVolume;
                  //   if(typeof results.tabInit != 'undefined'){
                  //     result.timestamp = results.tabInit.id.split('~')[4];
                  //   }
                  // }
                  // if(typeof old_card.stamp != 'undefined'){
                  //   result.stamp = old_card.stamp;
                  //   result.stampVolume = old_card.stampVolume;
                  //   if(typeof results.stampInit != 'undefined'){
                  //     result.timestamp = results.stampInit.id.split('~')[4];
                  //   }
                  // }
                  response.respond(result, res);
                }//else err
              });//async
            } else {//if change
              var error = {};
              error.code = 'NO_CHANGE';
              error.message = 'No Change Found.';
              error.status = 400;
              response.respond(error, res);
            }//else change
          }//else err
        });//oauth
      }//else err
    });//findByCardId
  }//else merchantname match
}//cardsLoad

exports.cardsRedeem = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardID (String)
  * authorization (String)
  * giftredeem (Redeem_request)
  **/
  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {
    var card_key = args.cardID.value;
    var id = 'cards~' + args.merchantname.value + '~' + card_key;
    console.log(id);
    cards.findByCardId(id, function(err, old_card){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'CARD_NOT_FOUND';
          error.message = 'Could not find card by name.';
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

        //authenticate against openmoney network
        oauth.authenticate(args.merchantname.value, function(err, access_token){
          if(err){
            console.error('Error Returned:');
            console.error(err);
            response.respond(error, res);
          } else {
            console.info('authenticated:');
            console.info(access_token);

            var parallel = {};
            var change = false;
            var error = false;

            var giftredeem = args.giftredeem.value;
            if(typeof giftredeem.amount != 'undefined' && giftredeem.amount > 0 && typeof giftredeem.currency != 'undefined'){
              if(typeof typeof old_card.balances == 'undefined' || typeof old_card.balances[giftredeem.currency] == 'undefined' || old_card.balances[giftredeem.currency] < giftredeem.amount) {
                error = {};
                error.code = 'GIFTCARD_INSUFFICENT_GIFT';
                error.message = 'Insufficent Gift Value.';
                error.status = 400;
                response.respond(error, res);
              } else {
                change = true;
                old_card.balances[giftredeem.currency] -= giftredeem.amount;
                old_card.volumes[giftredeem.currency] += giftredeem.amount;
                parallel.processJournal = function(callback){
                  var journalsApi = new openmoneyApi.JournalsApi();
                  var authorization = 'Bearer ' + access_token;
                  var stewardname = args.merchantname.value;
                  var namespace = stewardname + '.cc';
                  var account = card_key;
                  var currency = giftredeem.currency;
                  var currencyNamespace = namespace;

                  var journal = {};
                  journal.to_account = args.merchantname.value;
                  journal.to_account_namespace = namespace;
                  journal.amount = giftredeem.amount;
                  journal.payload = { employeeID: giftredeem.employeeID, cardholderID: giftredeem.cardholderID };

                  journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
                    callback(err, data);
                  });//journalsPost
                };//giftcardInit
              }
            }
            // if(typeof giftredeem.gift != 'undefined' && giftredeem.gift > 0){
            //   if(old_card.gift < giftredeem.gift) {
            //     error = {};
            //     error.code = 'GIFTCARD_INSUFFICENT_GIFT';
            //     error.message = 'Insufficent Gift Value.';
            //     error.status = 400;
            //     response.respond(error, res);
            //   } else {
            //     change = true;
            //     old_card.gift = old_card.gift - giftredeem.gift;
            //     old_card.giftVolume = old_card.giftVolume + giftredeem.gift;
            //     parallel.giftredeem = function(callback){
            //       var journalsApi = new openmoneyApi.JournalsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //       var account = card_key;
            //       var currency = 'giftcard';
            //       var currencyNamespace = namespace;
            //
            //       var journal = {};
            //       journal.to_account = args.merchantname.value;
            //       journal.to_account_namespace = namespace;
            //       journal.amount = giftredeem.gift;
            //       journal.payload = { employeeID: giftredeem.employeeID, cardholderID: giftredeem.cardholderID };
            //
            //       journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //         callback(err, data);
            //       });//journalsPost
            //     };//giftredeem
            //   }//else err
            // }//if redeem gift
            //
            // if(typeof giftredeem.points != 'undefined' && giftredeem.points > 0){
            //   if(old_card.points < giftredeem.points) {
            //     error = {};
            //     error.code = 'GIFTCARD_INSUFFICENT_POINTS';
            //     error.message = 'Insufficent Points.';
            //     error.status = 400;
            //     response.respond(error, res);
            //   } else {
            //     change = true;
            //     old_card.points = old_card.points - giftredeem.points;
            //     old_card.pointsVolume = old_card.pointsVolume + giftredeem.points;
            //     parallel.pointsredeem = function(callback){
            //       var journalsApi = new openmoneyApi.JournalsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //       var account = card_key;
            //       var currency = 'points';
            //       var currencyNamespace = namespace;
            //
            //       var journal = {};
            //       journal.to_account = args.merchantname.value;
            //       journal.to_account_namespace = namespace;
            //       journal.amount = giftredeem.points;
            //       journal.payload = { employeeID: giftredeem.employeeID, cardholderID: giftredeem.cardholderID };
            //
            //       journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //         callback(err, data);
            //       });//journalsPost
            //     };//giftredeem
            //   }//else err
            // }//if redeem amount
            //
            // if(typeof giftredeem.promo != 'undefined' && giftredeem.promo > 0){
            //   if(old_card.promo < giftredeem.promo) {
            //     error = {};
            //     error.code = 'GIFTCARD_INSUFFICENT_PROMO';
            //     error.message = 'Insufficent Promotional Value.';
            //     error.status = 400;
            //     response.respond(error, res);
            //   } else {
            //     change = true;
            //     old_card.promo = old_card.promo - giftredeem.promo;
            //     old_card.promoVolume = old_card.promoVolume + giftredeem.promo;
            //     parallel.promoredeem = function(callback){
            //       var journalsApi = new openmoneyApi.JournalsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //       var account = card_key;
            //       var currency = 'promo';
            //       var currencyNamespace = namespace;
            //
            //       var journal = {};
            //       journal.to_account = args.merchantname.value;
            //       journal.to_account_namespace = namespace;
            //       journal.amount = giftredeem.promo;
            //       journal.payload = { employeeID: giftredeem.employeeID, cardholderID: giftredeem.cardholderID };
            //
            //       journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //         callback(err, data);
            //       });//journalsPost
            //     };//giftredeem
            //   }//else err
            // }//if redeem promo
            //
            // if(typeof giftredeem.tab != 'undefined' && giftredeem.tab > 0){
            //   if(old_card.tab < giftredeem.tab) {
            //     error = {};
            //     error.code = 'GIFTCARD_INSUFFICENT_TAB';
            //     error.message = 'Insufficent Tab Value';
            //     error.status = 400;
            //     response.respond(error, res);
            //   } else {
            //     change = true;
            //     old_card.tab = old_card.tab - giftredeem.tab;
            //     old_card.tabVolume = old_card.tabVolume + giftredeem.tab;
            //     parallel.tabredeem = function(callback){
            //       var journalsApi = new openmoneyApi.JournalsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //       var account = card_key;
            //       var currency = 'tab';
            //       var currencyNamespace = namespace;
            //
            //       var journal = {};
            //       journal.to_account = args.merchantname.value;
            //       journal.to_account_namespace = namespace;
            //       journal.amount = giftredeem.tab;
            //       journal.payload = { employeeID: giftredeem.employeeID, cardholderID: giftredeem.cardholderID };
            //
            //       journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //         callback(err, data);
            //       });//journalsPost
            //     };//giftredeem
            //   }//else err
            // }//if redeem tab
            //
            // if(typeof giftredeem.stamp != 'undefined' && giftredeem.stamp > 0){
            //   if(old_card.stamp < giftredeem.stamp) {
            //     error = {};
            //     error.code = 'GIFTCARD_INSUFFICENT_STAMP';
            //     error.message = 'Insufficent Stamps.';
            //     error.status = 400;
            //     response.respond(error, res);
            //   } else {
            //     change = true;
            //     old_card.stamp = old_card.stamp - giftredeem.stamp;
            //     old_card.stampVolume = old_card.stampVolume + giftredeem.stamp;
            //     parallel.stampredeem = function(callback){
            //       var journalsApi = new openmoneyApi.JournalsApi();
            //       var authorization = 'Bearer ' + access_token;
            //       var stewardname = args.merchantname.value;
            //       var namespace = stewardname + '.cc';
            //       var account = card_key;
            //       var currency = 'stamp';
            //       var currencyNamespace = namespace;
            //
            //       var journal = {};
            //       journal.to_account = args.merchantname.value;
            //       journal.to_account_namespace = namespace;
            //       journal.amount = giftredeem.stamp;
            //       journal.payload = { employeeID: giftredeem.employeeID, cardholderID: giftredeem.cardholderID };
            //
            //       journalsApi.journalsPost(stewardname, namespace, account, currency, authorization, currencyNamespace, journal, function(err, data, response){
            //         callback(err, data);
            //       });//journalsPost
            //     };//giftredeem
            //   }//else err
            // }//if redeem amount

            if (change && !error){
              parallel.updateCard = function(callback){
                console.info(old_card);
                cards.updateCard(old_card, function(err, ok){
                  callback(err, ok);
                });//updateCard
              }//updateCard

              async.series(parallel, function(err, results){
                if(err){
                  console.error(err);
                  if(err.response.body.code == 5004){
                    var error = {};
                    error.code = 'OPENMONEY_NETWORK_ERROR';
                    error.message = 'The card is frozen, goto card and unfreeze.';
                    error.status = 403;
                    response.respond(error, res);
                  } else {
                    var error = {};
                    error.code = 'GIFTCARD_DB_ERROR';
                    error.message = 'Could not update database, please try again.';
                    error.status = 500;
                    response.respond(error, res);
                  }

                } else {//if err
                  //delete(ok.rev);
                  var result = {};

                  result.balance = old_card.balances[giftredeem.currency];
                  result.volume = old_card.volumes[giftredeem.currency];
                  result.timestamp = results.processJournal.id.split('~')[4];
                  //
                  // if(typeof old_card.gift != 'undefined'){
                  //   result.gift = old_card.gift;
                  //   result.giftVolume = old_card.giftVolume;
                  //   if(typeof results.giftredeem != 'undefined'){
                  //     result.currency = 'gift';
                  //     result.timestamp = results.giftredeem.id.split('~')[4];
                  //   }
                  // }
                  // if(typeof old_card.promo != 'undefined'){
                  //   result.promo = old_card.promo;
                  //   result.promoVolume = old_card.promoVolume;
                  //   if(typeof results.promoredeem != 'undefined'){
                  //     result.currency = 'promo';
                  //     result.timestamp = results.promoredeem.id.split('~')[4];
                  //   }
                  // }
                  // if(typeof old_card.points != 'undefined'){
                  //   result.points = old_card.points;
                  //   result.pointsVolume = old_card.pointsVolume;
                  //   if(typeof results.pointsredeem != 'undefined'){
                  //     result.currency = 'points';
                  //     result.timestamp = results.pointsredeem.id.split('~')[4];
                  //   }
                  // }
                  // if(typeof old_card.tab != 'undefined'){
                  //   result.tab = old_card.tab;
                  //   result.tabVolume = old_card.tabVolume;
                  //   if(typeof results.tabredeem != 'undefined'){
                  //     result.currency = 'tab';
                  //     result.timestamp = results.tabredeem.id.split('~')[4];
                  //   }
                  // }
                  // if(typeof old_card.stamp != 'undefined'){
                  //   result.stamp = old_card.stamp;
                  //   result.stampVolume = old_card.stampVolume;
                  //   if(typeof results.stampredeem != 'undefined'){
                  //     result.currency = 'stamp';
                  //     result.timestamp = results.stampredeem.id.split('~')[4];
                  //   }
                  // }
                  response.respond(result, res);
                }//else err

              });
            } else {//if name change
              if(!error){
                var error = {};
                error.code = 'NO_CHANGE';
                error.message = 'No Change Found.';
                error.status = 400;
                response.respond(error, res);
              }
            }//else card name change
          }//else err
        });//authenticate
      }//else err
    });//findByCardId
  }//else merchantname match
}//cardsRedeem

exports.cardsPut = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardID (String)
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
    var card_key = args.cardID.value;
    var id = 'cards~' + args.merchantname.value + '~' + card_key;
    console.log(id);
    cards.findByCardId(id, function(err, old_card){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'CARD_NOT_FOUND';
          error.message = 'Could not find card by key.';
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
        console.log('found card:', old_card, args.card.value);

        if(old_card.key != args.card.value.key){
          var error = {};
          error.code = 'GIFTCARD_PUT_DB_ERROR';
          error.message = 'Cannot change the card number.';
          error.status = 400;
          response.respond(error, res);
        } else if(typeof old_card.disabled == 'undefined' || old_card.disabled != args.card.value.disabled){
          old_card.disabled = args.card.value.disabled;

          var currencyTasks = {};
          for(var currency in old_card.balances) {
            if(old_card.balances.hasOwnProperty(currency)) {
              //update each account in each currency
              currencyTasks[currency] = function(callback){

                //authenticate against openmoney network
                oauth.authenticate(args.merchantname.value, function(err, access_token){
                  if(err){
                    console.error('Error Returned:');
                    console.error(err);
                    response.respond(err, res);
                  } else {
                    console.info('authenticated:');
                    console.info(access_token);

                    var accountsApi = new openmoneyApi.AccountsApi();
                    var authorization = 'Bearer ' + access_token;
                    var stewardname = args.merchantname.value;
                    var namespace = stewardname + '.cc';

                    var account = {};
                    account.account = old_card.key;
                    account.account_namespace = namespace;
                    account.currency = currency;
                    account.currency_namespace = namespace;
                    account.stewards = ['stewards~' + stewardname];
                    account.disabled = old_card.disabled;
                    console.log(account)

                    accountsApi.accountsGet(stewardname, namespace, account.account, currency, account.currency_namespace, authorization, function(err, data, response){
                      if(err){
                        callback(err);
                      } else {
                        console.log('successfully fetched account:', data);
                        //update account stewards
                        account.stewards = data.stewards;
                        accountsApi.accountsPut(stewardname, namespace, account.account, authorization, account, function(err, data, response){
                          console.log('accountsPut:', err, data);
                          callback(err, data);
                        });//accountsPost
                      }//err else
                    });//accountsGET
                  }
                });

              };
            }
          }

          async.series(currencyTasks, function(err, results){
            if(err){
              var error = {};
              error.code = 'OPENMONEY_ACCOUNT_PUT_ERROR';
              error.message = 'Error updating account on openmoney network.';
              error.status = 400;
              console.log(error.code, err);
              response.respond(error, res);
            } else {
              console.log('OPENMONEY_ACCOUNT_RESULTS', results);

              cards.updateCard(old_card, function(err, ok){
                if(err){
                  var error = {};
                  error.code = 'GIFTCARD_GET_DB_ERROR';
                  error.message = 'Cannot update data from database.';
                  error.status = 500;
                  response.respond(error, res);
                } else {
                  var ok = {'ok': true};
                  response.respond(ok, res);
                }
              });
            }
          });
        } else {
          //no change
          var ok = {'ok': true};
          response.respond(ok, res);
        }

        // //check if there is a balance or points owing
        // if(old_card.balance != 0) {
        //   var error = {};
        //   error.code = 'GIFTCARD_BALANCE_OWING';
        //   error.message = 'Cannot delete, There is a balance owing on the card.';
        //   error.status = 400;
        //   response.respond(error, res);
        // } else if(old_card.points != 0){
        //   var error = {};
        //   error.code = 'GIFTCARD_POINTS_OWING';
        //   error.message = 'Cannot delete, There are points owing on the card.';
        //   error.status = 400;
        //   response.respond(error, res);
        // } else {
        //   //there is no balance owing and no points owing delete
        //   cards.deleteCard(old_card, function(err, ok){
        //     if(err){
        //       console.error(err);
        //       var error = {};
        //       error.code = 'GIFTCARD_DELETE_DB_ERROR';
        //       error.message = 'Cannot delete data from database.';
        //       error.status = 500;
        //       response.respond(error, res);
        //     } else {//if err
        //       response.respond(ok, res);
        //     }//else err
        //   });//deleteCard
        //}//else balance owing
      }//else err
    });//findByCardId
  }//else merchant match
};//cardsPut

exports.cardsDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardID (String)
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
    var card_key = args.cardID.value;
    var id = 'cards~' + args.merchantname.value + '~' + card_key;
    console.log(id);
    cards.findByCardId(id, function(err, old_card){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'CARD_NOT_FOUND';
          error.message = 'Could not find card by key.';
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
        //check if there is a balance or points owing
        if(old_card.balance != 0) {
          var error = {};
          error.code = 'GIFTCARD_BALANCE_OWING';
          error.message = 'Cannot delete, There is a balance owing on the card.';
          error.status = 400;
          response.respond(error, res);
        } else if(old_card.points != 0){
          var error = {};
          error.code = 'GIFTCARD_POINTS_OWING';
          error.message = 'Cannot delete, There are points owing on the card.';
          error.status = 400;
          response.respond(error, res);
        } else {
          //there is no balance owing and no points owing delete
          cards.deleteCard(old_card, function(err, ok){
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
          });//deleteCard

        }//else balance owing
      }//else err
    });//findByCardId
  }//else merchant match
};//cardsDelete


exports.templatesPost = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
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

    var template = {};
    template.cardWidth = args.template.value.cardWidth;
    template.cardHeight = args.template.value.cardHeight;
    template.keyDisplay = args.template.value.keyDisplay;
    template.keySize = args.template.value.keySize;
    template.keyTop = args.template.value.keyTop;
    template.keyLeft = args.template.value.keyLeft;
    template.keyColor = args.template.value.keyColor;
    template.qrDisplay = args.template.value.qrDisplay;
    template.qrBackground = args.template.value.qrBackground;
    template.qrForeground = args.template.value.qrForeground;
    template.qrSize = args.template.value.qrSize;
    template.qrTop = args.template.value.qrTop;
    template.qrLeft = args.template.value.qrLeft;
    template.default = args.template.value.default;
    template.vertical = args.template.value.vertical;
    //use pouchdb attachements
    //check if exists
    if(typeof args.template.value.frontImgSrc != 'undefined'){
      var frontImgSrc = args.template.value.frontImgSrc;
      template.frontImgWidth = args.template.value.frontImgWidth;
      template.frontImgHeight = args.template.value.frontImgHeight;

      template._attachments = {};
      template._attachments['frontImg.' + frontImgSrc.substring(frontImgSrc.indexOf('/') + 1, frontImgSrc.indexOf(';'))] = {
          content_type: frontImgSrc.substring(frontImgSrc.indexOf(":") + 1 ,frontImgSrc.indexOf("\;")),
          data: Buffer.from(frontImgSrc.substring(frontImgSrc.indexOf(',') + 1, frontImgSrc.length), 'base64')
        };
    }

    if(typeof args.template.value.backImgSrc != 'undefined'){
      var backImgSrc = args.template.value.backImgSrc;
      template.backImgWidth = args.template.value.backImgWidth;
      template.backImgHeight = args.template.value.backImgHeight;

      if(typeof template._attachments == 'undefined'){
        template._attachments = {};
      }
      template._attachments['backImg.' + backImgSrc.substring(backImgSrc.indexOf('/') + 1, backImgSrc.indexOf("\;"))] = {
          content_type: backImgSrc.substring(backImgSrc.indexOf(":") + 1 ,backImgSrc.indexOf("\;")),
          data: Buffer.from(backImgSrc.substring(backImgSrc.indexOf(',') + 1, backImgSrc.length), 'base64')
        };
    }

    //template name should be strict. A-Za-z0-9 no spaces, underscores or hyphens.
    //TODO: define restrictions in swagger API definitions for templateName;
    template.templateName = args.template.value.templateName;
    template.type = "templates";
    template._id = template.type + '~' + args.merchantname.value + '~' + template.templateName;
    console.log('lookup templateID:', template._id);

    templates.findByTemplateId(template._id, function(err, exists){
      if(err){
        if(err.status === 404){
          console.log('not found save template', template);
          //not found insert
          templates.insertTemplate(template, function(inserterr, ok){
            console.log('insertTemplate response:', inserterr, ok);
            if(inserterr){
              var error = {};
              error.code = 'POUCHDB_INSERT_ERROR';
              error.message = 'Cannot insert data into local db:' + JSON.stringify(inserterr);
              error.status = 500;
              response.respond(error, res);
            } else {
              console.log(ok);
              response.respond(ok, res);
            }
          });
        } else {
          var error = {};
          error.code = 'POUCHDB_ERROR';
          error.message = 'Cannot get data from local db:' + JSON.stringify(err);
          error.status = 500;
          response.respond(error, res);
        }
      } else {
        //update template
        var error = {};
        error.code = 'TEMPLATE_EXISTS';
        error.message = 'Template exists with that name.';
        error.status = 400;
        response.respond(error, res);
      }
    })

  }//else merchant match
};//cardsTemplatePost


exports.templatesList = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * authorization (String)
  **/

  console.info('templatesList:',args);



    templates.listTemplatesById(args.merchantname.value, args.offset.value, args.range.value, function(err, results){

      if(err){
        var error = {};
        error.code = 'TEMPLATE_LIST_ERROR';
        error.message = 'Template list error: ' + JSON.stringify(err);
        error.status = 500;
        response.respond(error, res);
      } else {
        console.log('templates.listTemplates results:', results);

        var list = [];
        results.rows.forEach(function(row){
          delete row.doc._rev;
          list.push(row.doc);
        })

        response.respond(list, res);
      }
    });

};//cardsTemplateList

exports.templatesPut = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * authorization (String)
  **/

  console.info('templatesPut:',args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {//if merchant match

    var template = {};
    template.cardWidth = args.template.value.cardWidth;
    template.cardHeight = args.template.value.cardHeight;
    template.keyDisplay = args.template.value.keyDisplay;
    template.keySize = args.template.value.keySize;
    template.keyTop = args.template.value.keyTop;
    template.keyLeft = args.template.value.keyLeft;
    template.keyColor = args.template.value.keyColor;
    template.qrDisplay = args.template.value.qrDisplay;
    template.qrBackground = args.template.value.qrBackground;
    template.qrForeground = args.template.value.qrForeground;
    template.qrSize = args.template.value.qrSize;
    template.qrTop = args.template.value.qrTop;
    template.qrLeft = args.template.value.qrLeft;
    template.default = args.template.value.default;
    template.vertical = args.template.value.vertical;

    //use pouchdb attachements
    //check if exists
    if(typeof args.template.value.frontImgSrc != 'undefined'){
      var frontImgSrc = args.template.value.frontImgSrc;
      template.frontImgWidth = args.template.value.frontImgWidth;
      template.frontImgHeight = args.template.value.frontImgHeight;

      template._attachments = {};
      template._attachments['frontImg.' + frontImgSrc.substring(frontImgSrc.indexOf('/') + 1, frontImgSrc.indexOf(';'))] = {
          content_type: frontImgSrc.substring(frontImgSrc.indexOf(":") + 1 ,frontImgSrc.indexOf("\;")),
          data: Buffer.from(frontImgSrc.substring(frontImgSrc.indexOf(',') + 1, frontImgSrc.length), 'base64')
        };
    }

    if(typeof args.template.value.backImgSrc != 'undefined'){
      var backImgSrc = args.template.value.backImgSrc;
      template.backImgWidth = args.template.value.backImgWidth;
      template.backImgHeight = args.template.value.backImgHeight;

      if(typeof template._attachments == 'undefined'){
        template._attachments = {};
      }
      template._attachments['backImg.' + backImgSrc.substring(backImgSrc.indexOf('/') + 1, backImgSrc.indexOf("\;"))] = {
          content_type: backImgSrc.substring(backImgSrc.indexOf(":") + 1 ,backImgSrc.indexOf("\;")),
          data: Buffer.from(backImgSrc.substring(backImgSrc.indexOf(',') + 1, backImgSrc.length), 'base64')
        };
    }

    if(typeof args.template.value._attachments != 'undefined'){
      template._attachments = args.template.value._attachments;
      template.frontImgWidth = args.template.value.frontImgWidth;
      template.frontImgHeight = args.template.value.frontImgHeight;
      template.backImgWidth = args.template.value.backImgWidth;
      template.backImgHeight = args.template.value.backImgHeight;
    }

    //template name should be strict. A-Za-z0-9 no spaces, underscores or hyphens.
    //TODO: define restrictions in swagger API definitions for templateName;
    template.templateName = args.template.value.templateName;
    template.type = "templates";
    template._id = template.type + '~' + args.merchantname.value + '~' + args.templateName.value;
    console.log('lookup templateID:', template._id);

    templates.findByTemplateId(template._id, function(err, old_template){
      if(err){
        console.log('findByTemplateId error', err);
        if(err.status === 404){
          console.log('not found save template', template);

          var error = {};
          error.code = 'TEMPLATE_DOES_NOT_EXIST';
          error.message = 'Template does not exist in db.';
          error.status = 400;
          response.respond(error, res);

        } else {
          var error = {};
          error.code = 'POUCHDB_ERROR';
          error.message = 'Cannot get data from local db:' + JSON.stringify(err);
          error.status = 500;
          response.respond(error, res);
        }
      } else {
        //update template
        console.log('old template:', old_template);
        //detect changes
        if(old_template._id != template.type + '~' + args.merchantname.value + '~' + template.templateName){
          console.log('change in template name');
          //TODO: delete old doc and create new doc
          var error = {};
          error.code = 'METHOD_NOT_IMPLEMENTED';
          error.message = 'Changing the template name is not implemented yet.';
          error.status = 400;
          response.respond(error, res);
        } else {
          //if attachements are attached then there is a change in them otherwise they are considered the same.

          if(typeof template._attachments != 'undefined' && typeof template._attachments['frontImg.png'] != 'undefined'){
            if(typeof old_template._attachments != 'undefined' && typeof old_template._attachments['frontImg.png'] != 'undefined'){
              delete old_template._attachments['frontImg.png'];
              delete old_template.frontImgWidth;
              delete old_template.frontImgHeight;
            } else {
              if(typeof old_template._attachments == 'undefined'){
                old_template._attachments = {};
              }
            }

            old_template._attachments['frontImg.png'] = template._attachments['frontImg.png'];

          }

          if(typeof template._attachments != 'undefined' && typeof template._attachments['backImg.png'] != 'undefined'){
            if(typeof old_template._attachments != 'undefined' && typeof old_template._attachments['backImg.png'] != 'undefined'){
              delete old_template._attachments['backImg.png'];
              delete old_template.backImgWidth;
              delete old_template.backImgHeight;
            } else {
              if(typeof old_template._attachments == 'undefined'){
                old_template._attachments = {};
              }
            }
            old_template._attachments['backImg.png'] = template._attachments['backImg.png'];

          }

          old_template.backImgWidth = template.backImgWidth;
          old_template.backImgHeight = template.backImgHeight;
          old_template.frontImgWidth = template.frontImgWidth;
          old_template.frontImgHeight = template.frontImgHeight;
          old_template.cardWidth = template.cardWidth;
          old_template.cardHeight = template.cardHeight;
          old_template.keyDisplay = template.keyDisplay;
          old_template.keySize = template.keySize;
          old_template.keyTop = template.keyTop;
          old_template.keyLeft = template.keyLeft;
          old_template.keyColor = template.keyColor;
          old_template.qrDisplay = template.qrDisplay;
          old_template.qrBackground = template.qrBackground;
          old_template.qrForeground = template.qrForeground;
          old_template.qrSize = template.qrSize;
          old_template.qrTop = template.qrTop;
          old_template.qrLeft = template.qrLeft;
          old_template.default = template.default;
          old_template.vertical = template.vertical;

          console.log('save template', old_template);

          //not found insert
          templates.updateTemplate(old_template, function(inserterr, ok){
            console.log('insertTemplate response:', inserterr, ok);
            if(inserterr){
              var error = {};
              error.code = 'POUCHDB_INSERT_ERROR';
              error.message = 'Cannot insert data into local db:' + JSON.stringify(inserterr);
              error.status = 500;
              response.respond(error, res);
            } else {
              console.log(ok);
              response.respond(ok, res);
            }
          });
        }

      }
    })

  }//else merchant match
};//cardsTemplatePut
