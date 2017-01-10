'use strict';

var response = require('../helpers/response');
var cardholders = require('../model/cardholders');
var cards = require('../model/cards');
var async = require('async');
var oauth = require('../helpers/oauth');
var openmoneyApi = require('../../third_party/openmoney-api-client/javascript-client3/src/');

exports.cardholderList = function(args, res, next) {
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

    if(args.order_by.value == 'undefined' || args.order_by.value == 'firstname'){
      cardholders.listCardholdersByFirstname(args.merchantname.value, args.offset.value, args.range.value, function(err, merchants){
        if(err){
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Could not get database list of cardholders by firstname.';
          error.status = 500;
          response.respond(error, res);
        } else {
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
      });//listCardholdersByName
    } else {//if orderBy = name
      //order by code
      cardholders.listCardholdersByLastname(args.merchantname.value, args.offset.value, args.range.value, function(err, merchants){
        if(err){
          console.error(err);
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Could not get database list of cardholders by lastname.';
          error.status = 500;
          response.respond(error, res);
        } else {
          console.log(merchants);
          response.respond(merchants.docs, res);
        }//else err
      });//listCardholdersByName
    } //else orderBy = name
  }//else merchant match
};//cardholderList

exports.cardholderPost = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardholder (Cardholders_request)
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
    var cardholder = args.cardholder.value;

    cardholder._id = 'cardholders~' + args.merchantname.value + '~' + cardholder.firstname + '~' + cardholder.lastname;

    cardholders.findByCardholderId(cardholder._id, function(err, old_cardholder){
      if(err){
        console.error(err);
        if(err.status == 404){
          console.info('insert cardholder:');
          //not found insert then.
          //putCardholder
          var cardholder_insert = {};
          cardholder_insert.firstname = cardholder.firstname;
          cardholder_insert.lastname = cardholder.lastname;
          if(typeof cardholder.address1 != 'undefined'){
            cardholder_insert.address1 = cardholder.address1;
          }
          if(typeof cardholder.address2 != 'undefined'){
            cardholder_insert.address2 = cardholder.address2;
          }
          if(typeof cardholder.phone != 'undefined'){
            cardholder_insert.phone = cardholder.phone;
          }
          if(typeof cardholder.email != 'undefined'){
            cardholder_insert.email = cardholder.email;
          }
          cardholder_insert.type = 'cardholders~';
          cardholder_insert.merchantname = args.user.merchantname;
          cardholder_insert._id = cardholder_insert.type + cardholder_insert.merchantname + '~' + cardholder_insert.firstname + '~' + cardholder_insert.lastname;
          console.info(cardholder_insert);
          cardholders.insertCardholder(cardholder_insert, function(err, ok){
            if(err){
              console.error(err);
              //db error
              var error = {};
              error.code = 'CARDHOLDER_INSERT_ERROR';
              error.message = 'Could not insert cardholder.';
              error.status = 500;
              response.respond(error, res);
            } else {
              //make a transaction post for each currencies contributionPerPatron to the omdev account.
              //first get a list of currencies.
              var parallel = {};

              parallel.currenciesList = function(callback){
                oauth.authenticate(args.user.merchantname, function(err, access_token){
                  if(err){
                    console.info(args.user.merchantname);
                    response.respond(err, res);
                  } else {
                    var currenciesApi = new openmoneyApi.CurrenciesApi();
                    var authorization = 'Bearer ' + access_token;
                    var opts = {};
                    opts.namespace = args.user.merchantname + '.cc';
                    opts.authorization = authorization;
                    currenciesApi.currenciesList(args.user.merchantname, opts, function(err, data, response){
                      console.info([err,data,ok]);
                      if(err){
                        callback(err);
                      } else {
                        console.log(response.body);

                        var id = 'cards~' + args.user.merchantname + '~omdev';
                        console.log(id);
                        cards.findByCardId(id, function(err, old_card){
                          //console.log(err, old_card);
                          if(err){
                            console.log(err);
                            callback(err)
                          } else {
                            console.log(old_card);

                            var parallelContributions = {};
                            response.body.forEach(function(currencies){
                              console.log('currency', currencies);
                              if(currencies.currency_namespace == args.user.merchantname + '.cc' && typeof currencies.contributionPerPatron != 'undefined' && parseInt(currencies.contributionPerPatron) > 0){
                                console.log('do a transaction load from currency to omdev account for contributionPerPatron', currencies);
                                console.log('currency', currencies.currency);
                                parallelContributions[currencies.currency] = function(callback){
                                  var series = {};
                                  if(typeof old_card.balances[currencies.currency] == 'undefined'){
                                    //create the account first
                                    series.currencyAccountCreate = function(callback){

                                      var accountsApi = new openmoneyApi.AccountsApi();
                                      var authorization = 'Bearer ' + access_token;
                                      var stewardname = args.user.merchantname;
                                      var namespace = stewardname + '.cc';

                                      var account = {};
                                      account.account = 'omdev';
                                      account.account_namespace = namespace;
                                      account.currency = currencies.currency;
                                      account.currency_namespace = namespace;
                                      account.stewards = ['stewards~' + stewardname, 'stewards~omdev'];
                                      //account.publicKey = card.key;

                                      var opts = {};
                                      opts.authorization = authorization;
                                      opts.account = account;

                                      console.info(account);
                                      accountsApi.accountsPost(stewardname, namespace, opts, function(err, data, response){
                                        callback(err, data);
                                      });//accountsPost
                                    };//giftcardCreate
                                    old_card.balances[currencies.currency] = 0;
                                    old_card.volumes[currencies.currency] = 0;
                                  }
                                  old_card.balances[currencies.currency] += currencies.contributionPerPatron;
                                  old_card.volumes[currencies.currency] += currencies.contributionPerPatron;
                                  series.processJournal = function(callback){
                                    var journalsApi = new openmoneyApi.JournalsApi();
                                    var authorization = 'Bearer ' + access_token;
                                    var stewardname = args.user.merchantname;
                                    var namespace = stewardname + '.cc';
                                    var account = args.user.merchantname;
                                    var currency = currencies.currency;
                                    var currencyNamespace = namespace;

                                    var journal = {};
                                    journal.to_account = 'omdev';
                                    journal.to_account_namespace = namespace;
                                    journal.amount = parseInt(currencies.contributionPerPatron);
                                    journal.payload = { cardholderID: old_card.cardholderID };

                                    var opts = {};
                                    opts.authorization = authorization;
                                    opts.currencyNamespace = currencyNamespace;
                                    opts.journal = journal;

                                    journalsApi.journalsPost(stewardname, namespace, account, currency, opts, function(err, data, response){
                                      callback(err, data);
                                    });//journalsPost
                                  };//giftcardInit

                                  async.series(series, function(err, results){
                                    callback(err, results);
                                  })
                                };


                              }
                            });

                            async.parallel(parallelContributions, function(err, data){
                              callback(err, data);
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }

              async.series(parallel, function(err, ok){
                console.info(ok);
                var result = {};
                result.ok = true;
                response.respond(result, res);
              })

              //for each currency to a load post to the card.



            }//else err
          });//insertCardholder
        } else { //if 404
          //db error
          var error = {};
          error.code = 'GIFTCARD_DB_ERROR';
          error.message = 'Cannot get giftcard database.';
          error.status = 500;
          response.respond(error, res);
        }//else 404
      } else {//if err
        //cardholder exists already
        var error = {};
        error.code = 'CARDHOLDER_EXISTS';
        error.message = 'That cardholder already exists.';
        error.status = 400;
        response.respond(error, res);
      }//else err
    });//findByCardholderId
  }//else merchant match
};//cardholderPost

exports.cardholderGet = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardholderID (String)
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
    var cardholder_firstname = args.cardholder_firstname.value;
    var cardholder_lastname = args.cardholder_lastname.value;
    cardholders.findByCardholderId('cardholders~' + args.merchantname.value + '~' + cardholder_firstname + '~' + cardholder_lastname, function(err, result){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'CARDHOLDER_NOT_FOUND';
          error.message = 'Could not find cardholder by name.';
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
        //delete(result._id);
        delete(result._rev);
        response.respond(result, res);
      }//else err
    });//findByCardholderId
  }//else merchantname match

}

exports.cardholdersPut = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardholderID (String)
  * authorization (String)
  * cardholder (Cardholders_request)
  **/


  console.info(args);

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {
    var cardholder_firstname = args.cardholder_firstname.value;
    var cardholder_lastname = args.cardholder_lastname.value;
    var id = 'cardholders~' + args.merchantname.value + '~' + cardholder_firstname + '~' + cardholder_lastname;
    console.log(id);
    cardholders.findByCardholderId(id, function(err, old_cardholder){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'CARDHOLDER_NOT_FOUND';
          error.message = 'Could not find cardholder by name.';
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

        var cardholder = args.cardholder.value;
        if(cardholder.firstname != cardholder_firstname || cardholder.lastname != cardholder_lastname){
          //change in cardholder name
          //delete old cardholder and intesert new
          console.info(old_cardholder);
          cardholders.deleteCardholder(old_cardholder, function(err, ok){
            if(err){
              console.error(err);
              var error = {};
              error.code = 'GIFTCARD_DB_ERROR';
              error.message = 'Cannot delete data from database.';
              error.status = 500;
              response.respond(error, res);
            } else { //if err
              delete(old_cardholder._id);
              delete(old_cardholder._rev);
              delete(old_cardholder.firstname);
              old_cardholder.firstname = cardholder.firstname;
              old_cardholder.lastname = cardholder.lastname;
              if(typeof cardholder.address1 != 'undefined'){
                old_cardholder.address1 = cardholder.address1;
              }
              if(typeof cardholder.address2 != 'undefined'){
                old_cardholder.address2 = cardholder.address2;
              }
              if(typeof cardholder.phone != 'undefined'){
                old_cardholder.phone = cardholder.phone;
              }
              if(typeof cardholder.email != 'undefined'){
                old_cardholder.email = cardholder.email;
              }

              old_cardholder._id = old_cardholder.type + args.merchantname.value + '~' + old_cardholder.firstname + '~' + old_cardholder.lastname;
              cardholders.insertCardholder(old_cardholder, function(err, ok){
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

          if(typeof cardholder.address1 != 'undefined' && old_cardholder.address1 != cardholder.address1){
            old_cardholder.address1 = cardholder.address1;
            change = true;
          }//if address1

          if(typeof cardholder.address2 != 'undefined' && old_cardholder.address2 != cardholder.address2){
            old_cardholder.address2 = cardholder.address2;
            change = true;
          }//if address2

          if(typeof cardholder.phone != 'undefined' && old_cardholder.phone != cardholder.phone){
            old_cardholder.phone = cardholder.phone;
            change = true;
          }//if phone

          if(typeof cardholder.email != 'undefined' && old_cardholder.email != cardholder.email){
            old_cardholder.email = cardholder.email;
            change = true;
          }//if email

          if(change){
            cardholders.updateCardholder(old_cardholder, function(err, ok){
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
        }//else cardholder name change
      }//else err
    });//findByCardholderId
  }//else merchantname match
}//cardholderPut

exports.cardholderDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * cardholderID (String)
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
    var cardholder_firstname = args.cardholder_firstname.value;
    var cardholder_lastname = args.cardholder_lastname.value;
    var id = 'cardholders~' + args.merchantname.value + '~' + cardholder_firstname + '~' + cardholder_lastname;
    console.log(id);
    cardholders.findByCardholderId(id, function(err, old_cardholder){
      if(err){
        console.error(err);
        if(err.status == 404){
          var error = {};
          error.code = 'CARDHOLDER_NOT_FOUND';
          error.message = 'Could not find cardholder by name.';
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
        cardholders.deleteCardholder(old_cardholder, function(err, ok){
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
        });//deleteCardholder
      }//else err
    });//findByCardholderId
  }//else merchant match
};//cardholderDelete
