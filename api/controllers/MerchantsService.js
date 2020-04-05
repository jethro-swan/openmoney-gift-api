'use strict';
var scrypt = require('scrypt');
//TODO: Change parameter to 0.5 for production and enable Local login pattern for faster API's
var scryptParameters = scrypt.paramsSync(1.0);
var crypto = require('crypto');
var merchants = require('../model/merchants');
var openmoneyApi = require('../../third_party/openmoney-api-client/javascript-client3/src/');
var oauth = require('../helpers/oauth');
var response = require('../helpers/response');
var async = require('async');
require('dotenv').config();
var nodemailer = require('nodemailer');
var smtpConfig = process.env.SMTP_CONFIG;
var domain = process.env.API_URL;
// var smtpConfig = 'smtps://openmoney.gift%40gmail.com:WTduoViyLHjTld5ale8JKEaFybPmqQp@smtp.gmail.com';
// var domain = 'https://openmoney.gift';

var cardholders = require('../model/cardholders');
var cards = require('../model/cards');

// create reusable transporter object using the default SMTP transport
let transporter;
if (smtpConfig)
    transporter = nodemailer.createTransport(smtpConfig);

function sendmail(to, subject, messageText, messageHTML, callback){
  console.log('send email to ', to, subject, messageText);

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: process.env.API_EMAIL,
      //from: '"Openmoney Gift" <openmoney.gift@gmail.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: messageText, // plaintext body
      html: messageHTML // html body
  };

  // send mail with defined transport object
  if(typeof smtpConfig == 'undefined'){
    callback(null,"SMTP Configuration is not defined, no email sent.")
  } else {
    transporter.sendMail(mailOptions, function(error, info){
        callback(error, info);
        // if(error){
        //     return console.log(error);
        // }
        // console.log('Message sent: ' + info.response);
    });
  }
}

// var openmoneyTS = require('../../../openmoney-api-client/typescript-node-client/api.ts');
exports.merchantsSupportPost = function(args, res, next) {
  /**
   * parameters expected in the args:
   * merchant_request object with values of
   * merchantname (String) or
   * email (String)
   **/

  console.info('in merchantsSupportPost');
  console.info(args);

  if(typeof args.request.value != 'undefined'){
    var request = args.request.value;
    if(typeof args.merchantname.value != 'undefined'){

      //var to = 'deefactorial@gmail.com, michael.linton@gmail.com';
      var to = process.env.API_STEWARDS
      var subject = 'Openmoney.Gift Support Request: ' + args.merchantname.value;
      var messageHTML = '<div><h1>Support Request For: ' + args.merchantname.value + '</h1></div>';
      messageHTML += '<div><h3>Request:</h3> ' + request.request + '</div>'
      var messageText = messageHTML.replace(/<\/?[^>]+(>|$)/g, "");
      console.log('messageText: ',messageText)

      sendmail(to, subject, messageText, messageHTML, function(err, info){
        if(err){
          var error = {};
          error.code = 'EMAIL_SEND_FAILURE';
          error.message = 'Could not send email.';
          error.status = 400;
          response.respond(error, res);
        } else {
          var result = {};
          result.message = info;
          result.sent = true;
          response.respond(result, res);
        }
      });

    } else {
      var error = {};
      error.code = 'MERCHANT_OR_EMAIL_REQUIRED';
      error.message = 'You must provide a merchantname or email.';
      error.status = 400;
      response.respond(error, res);
    }
  } else {
    var error = {};
    error.code = 'MERCHANT_OR_EMAIL_REQUIRED';
    error.message = 'You must provide a merchantname or email.';
    error.status = 400;
    response.respond(error, res);
  }

};//merchantsForgot

exports.merchantsForgot = function(args, res, next) {
  /**
   * parameters expected in the args:
   * merchant_request object with values of
   * merchantname (String) or
   * email (String)
   **/

  console.info('in merchantsForgot');
  console.info(args);

  if(typeof args.forgot_request.value != 'undefined'){
    var request = args.forgot_request.value;
    if(typeof request.merchantname != 'undefined'){


      sendForgotPasswordRequest(request.merchantname, function(err, info){

        if(err){
          if(typeof err.code != 'undefined'){
            response.respond(err, res);
          } else {
            console.log('error sending mail:', err);
            var error = {};
            error.code = 'DB_ERROR';
            error.message = 'Error sending the mail message: ' + err;
            error.status = err.status;
            response.respond(error, res);
          }
        } else {
          console.log('successfully sent mail message', info);
          var result = {};
          result.message = info;
          response.respond(result, res);
        }
      });

    } else if(typeof request.email != 'undefined'){
      //check for eamil
      merchants.findByEmail(request.email, function(err, results){
        if(err){
          console.log(err);
          if(err.status == 404){
            var error = {};
            error.code = 'MERCHANT_NOT_FOUND';
            error.message = 'That merchant could not be found.';
            error.status = 404;
            response.respond(error, res);
          } else {
            var error = {};
            error.code = 'DB_ERROR';
            error.message = 'Error getting the merchant.';
            error.status = err.status;
            response.respond(error, res);
          }
        } else {

          console.log(results)

          var parallel = {};

          results.docs.forEach(function(request){
            parallel[request.merchantname] = function(callback){
              sendForgotPasswordRequest(request.merchantname, function(err, info){
                if(err){
                  if(typeof err.code != 'undefined'){
                    callback(err);
                  } else {
                    console.log('error sending mail:', err);
                    var error = {};
                    error.code = 'DB_ERROR';
                    error.message = 'Error sending the mail message: ' + err;
                    error.status = err.status;
                    callback(error);
                  }
                  //response.respond(error, res);
                } else {
                  console.log('successfully sent mail message', info);
                  var result = {};
                  result.message = info;
                  callback(null, result);
                  //response.respond(result, res);
                }
              });

            };//each merchants
          });//for each results

          async.series(parallel, function(err, results){
            if(err){
              console.log('async error', err);
              response.respond(err, res);
            } else {
              console.log('async success', results);
              response.respond(results, res);
            }
          })

        }//else err
      });
    } else {
      var error = {};
      error.code = 'MERCHANT_OR_EMAIL_REQUIRED';
      error.message = 'You must provide a merchantname or email.';
      error.status = 400;
      response.respond(error, res);
    }
  } else {
    var error = {};
    error.code = 'MERCHANT_OR_EMAIL_REQUIRED';
    error.message = 'You must provide a merchantname or email.';
    error.status = 400;
    response.respond(error, res);
  }

};//merchantsForgot

exports.merchantsReset = function(args, res, next) {
  /**
   * parameters expected in the args:
   * reset_request object with values of
   * merchantname (String) or
   * email (String)
   **/

  console.info('in merchantsForgot');
  console.info(args);

  if(typeof args.reset_request.value != 'undefined'){
    var request = args.reset_request.value;
    if(typeof request.merchantname != 'undefined' && typeof request.password != 'undefined'){
      merchants.findByMerchantId('merchants~' + request.merchantname, function(err, oldMerchant){
        if(err){
          console.log(err);
          if(err.status == 404){
            var error = {};
            error.code = 'MERCHANT_NOT_FOUND';
            error.message = 'That merchant could not be found.';
            error.status = 404;
            response.respond(error, res);
          } else {
            var error = {};
            error.code = 'DB_ERROR';
            error.message = 'Error getting the merchant.';
            error.status = err.status;
            response.respond(error, res);
          }
        } else {

          //var newpassword = scrypt.kdfSync(request.password, scryptParameters).toString('base64');
          var newpassword = request.password;

          oauth.authenticate(oldMerchant.merchantname, function(err, access_token){
            if(err){
              examples['application/json'] = err;
              console.error('Error Returned:');
              console.error(err);
              response.respond(err, res);
            } else {
              var steward = {};
              steward.stewardname = oldMerchant.merchantname;
              steward.email = oldMerchant.email;
              steward.email_notifications = false;
              steward.password = newpassword;

              var stewardsApi = new openmoneyApi.StewardsApi();
              var authorization = 'Bearer ' + access_token;
              var opts = {};
              opts.authorization = authorization;

              stewardsApi.stewardsPut(steward.stewardname, steward, opts, function(err, data, result){
                if(err){
                  console.error(err);
                  var error = {};
                  error.code = 'OPENMONEY_SERVICE_ERROR';
                  error.message = 'Openmoney Service Error.';
                  error.status = 500;
                  response.respond(error, res);
                } else {
                  console.log(result.body);
                  //update password in local db.
                  merchants.findByMerchantId('merchants~' + oldMerchant.merchantname, function(err, merchant){
                    if (err){
                      console.error(err)
                      var error = {};
                      error.code = 'MERCHANT_GET_ERROR';
                      error.message = 'Could not get merchant.';
                      error.status = err.status;
                      response.respond(error, res);
                    } else {
                      merchant.password = newpassword;
                      merchants.updateMerchant(merchant, function(err, ok){
                        if (err){
                          console.info(err)
                          var error = {};
                          error.code = 'MERCHANT_UPDATE_ERROR_PASSWORD';
                          error.message = 'Could not update merchant.';
                          error.status = err.status;
                          response.respond(error, res);
                        } else {
                          oauth.invalidateCache(merchant.merchantname, function(err, ok){
                            console.log([err, ok]);
                            if (err){
                              console.info(err)
                              var error = {};
                              error.code = 'INVALIDATE_CACHE_ERROR';
                              error.message = 'Could not invalidate cache.';
                              error.status = err.status;
                              response.respond(error, res);
                            } else {
                              console.info(ok);
                              var result = {'message': {}};
                              response.respond(result, res);
                            }//else err
                          });//invalidateCache
                        }//else err
                      });//updateMerchant
                    }//else err
                  });//findByMerchantId
                }//else err
              });//stewardsPut
            }//else err
          });//authenticate

        }//else err
      });//findByMerchantId
    } else {
      var error = {};
      error.code = 'FORGOT_TOKEN_REQUIRED';
      error.message = 'You must provide a token and merchantname.';
      error.status = 400;
      response.respond(error, res);
    }
  } else {
    var error = {};
    error.code = 'FORGOT_TOKEN_REQUIRED';
    error.message = 'You must provide a token and merchantname.';
    error.status = 400;
    response.respond(error, res);
  }

};//merchantsGet

function sendForgotPasswordRequest(merchantname, callback){

  merchants.findByMerchantId('merchants~' + merchantname, function(err, merchant){
    if(err){
      console.log(err);
      if(err.status == 404){
        var error = {};
        error.code = 'MERCHANT_NOT_FOUND';
        error.message = 'That merchant could not be found.';
        error.status = 404;
        //response.respond(error, res);
        callback(error);
      } else {
        var error = {};
        error.code = 'DB_ERROR';
        error.message = 'Error getting the merchant.';
        error.status = err.status;
        //response.respond(error, res);
        callback(error);
      }
    } else {
      console.log('send forgot password request with merchantname:', merchantname)


      var to = merchant.merchantname + ' ' + merchant.email;
      var subject = 'Forgot Password Request For: ' + merchantname;

      //generate random string
      //TODO: issue with expiry not working
      if(typeof merchant.forgot_token != 'undefined' && typeof merchant.forgot_expiry != 'undefined' && new Date(merchant.forgot_expires) > new Date()){
        //return an error message saying only one request per hour
        callback('Forgot password request can only be sent once an hour. Check your spam folder for messages.');
      } else {
        //generate new token
        crypto.randomBytes(160, function (ex, buffer) {
            if (ex) return callback(error('server_error'));

            var code_secret = buffer;
            var code_secret_encrypted = scrypt.kdfSync(code_secret, scryptParameters).toString('base64');

            var code_secret_string_base64 = code_secret.toString('base64');

            console.log('code_secret_string_base64:',code_secret_string_base64);
            console.log('client_secret_encrypted:',code_secret_encrypted);

            merchant.forgot_token = code_secret_encrypted;
            merchant.forgot_expires = new Date();
            var ttl = 3600; //one Hour
            merchant.forgot_expires.setSeconds(merchant.forgot_expires.getSeconds() + ttl);

            merchants.updateMerchant(merchant, function(err, ok){
              if(err){
                callback(err, null);
              } else {
                var messageHTML = '<div><h1>Forgot Password Request For: ' + merchant.merchantname + '</h1></div><div>Forgot Password Link: <a href="' + domain + '/#forgot/' + encodeURIComponent(merchant.merchantname) + '/' + encodeURIComponent(code_secret_string_base64) + '">Reset Password</a></div><div>Or goto this url in your browser: ' + domain + '/#forgot/' + encodeURIComponent(merchant.merchantname) + '/' + encodeURIComponent(code_secret_string_base64) + '</div>';
                var messageText = messageHTML.replace(/<\/?[^>]+(>|$)/g, "");
                console.log('messageText: ',messageText)

                sendmail(to, subject, messageText, messageHTML, function(err, info){
                  callback(err, info);
                });
              }
            })
        });
      }
    }
  });
};


exports.merchantsGet = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * Authorization (String)
  **/

  console.info('in merchantsGet');
  console.info(args);

  merchants.findByMerchantId('merchants~' + args.merchantname.value.toLowerCase(), function(err, merchant){
    if(err){
      if(err.status == 404){
        var error = {};
        error.code = 'MERCHANT_NOT_FOUND';
        error.message = 'That merchant could not be found.';
        error.status = 404;
        response.respond(error, res);
      } else {
        var error = {};
        error.code = 'DB_ERROR';
        error.message = 'Error getting the merchant.';
        error.status = err.status;
        response.respond(error, res);
      }
    } else {
      //don't return the password
      delete merchant.password;
      console.info(merchant);
      response.respond(merchant, res);
    }//else err
  });//findByMerchantId
};//merchantsGet

exports.merchantsPut = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * merchantRequest (Merchant_request)
  * authorization (String)
  **/

  console.info(args);
  var merchant = args.merchant_request.value;
  //console.info(merchant);
  var merchantname = args.merchantname.value;
  var merchantId = 'merchants~' + merchantname;

  merchants.findByMerchantId(merchantId, function(err, oldMerchant){
    if (err){
      if(err.status == 404){
        var error = {};
        error.code = 'MERCHANT_NOT_FOUND';
        error.message = 'That merchant could not be found.';
        error.status = 404;
        response.respond(error, res);
      } else {
        var error = {};
        error.code = 'DB_ERROR';
        error.message = 'Error getting the merchant.';
        error.status = err.status;
        response.respond(error, res);
      }
    } else {
      //merchantname change
      if(typeof merchant.merchantname != 'undefined' && merchant.merchantname != oldMerchant.merchantname){
        //this one requries a new entry delete merchant and insert new one.
        var error = {};
        error.code = 'MERCHANTNAME_UNMODIFIABLE';
        error.message = 'Cannot change the merchants name.';
        error.status = 400;
        response.respond(error, res);
      } else {
        //email change
        if(typeof merchant.email != 'undefined' && merchant.email != oldMerchant.email){
          //TODO:send verification email
          oldMerchant.email = merchant.email;
        }
        //email_notifications change
        if(typeof merchant.email_notifications != 'undefined' && merchant.email_notifications != oldMerchant.email_notifications){
          oldMerchant.email_notifications = merchant.email_notifications;
        }
        //password verify
        //if(typeof merchant.password == 'undefined' || scrypt.verifyKdfSync(new Buffer(oldMerchant.password, 'base64'), merchant.password)){
        if(typeof merchant.password == 'undefined' || oldMerchant.password == merchant.password){
          //no change in password updateMerchant
          merchants.updateMerchant(oldMerchant, function(err, result){
            if (err){
              var error = {};
              error.code = 'MERCHANT_UPDATE_ERROR';
              error.message = 'Could not update merchant.';
              error.status = err.status;
              response.respond(error, res);
            } else {
              console.info(result);
              var result = {'ok': true};
              response.respond(result, res);
            }//else err
          });//updateMerchant
        } else {
          //passwords did not match update users password
          //var newpassword = scrypt.kdfSync(merchant.password, scryptParameters).toString('base64');
          var newpassword = merchant.password;

          oauth.authenticate(oldMerchant.merchantname, function(err, access_token){
            if(err){
              examples['application/json'] = err;
              console.error('Error Returned:');
              console.error(err);
              response.respond(err, res);
            } else {
              var steward = {};
              steward.stewardname = oldMerchant.merchantname;
              steward.email = oldMerchant.email;
              steward.email_notifications = false;
              steward.password = newpassword;

              var stewardsApi = new openmoneyApi.StewardsApi();
              var authorization = 'Bearer ' + access_token;
              var opts = {};
              opts.authorization = authorization;

              stewardsApi.stewardsPut(steward.stewardname, steward, opts, function(err, data, result){
                if(err){
                  console.error(err);
                  var error = {};
                  error.code = 'OPENMONEY_SERVICE_ERROR';
                  error.message = 'Openmoney Service Error.';
                  error.status = 500;
                  response.respond(error, res);
                } else {
                  console.log(result.body);
                  //update password in local db.
                  merchants.findByMerchantId('merchants~' + oldMerchant.merchantname, function(err, merchant){
                    if (err){
                      console.error(err)
                      var error = {};
                      error.code = 'MERCHANT_GET_ERROR';
                      error.message = 'Could not get merchant.';
                      error.status = err.status;
                      response.respond(error, res);
                    } else {
                      merchant.password = newpassword;
                      merchants.updateMerchant(merchant, function(err, ok){
                        if (err){
                          console.info(err)
                          var error = {};
                          error.code = 'MERCHANT_UPDATE_ERROR_PASSWORD';
                          error.message = 'Could not update merchant.';
                          error.status = err.status;
                          response.respond(error, res);
                        } else {
                          oauth.invalidateCache(merchant.merchantname, function(err, ok){
                            console.log([err, ok]);
                            if (err){
                              console.info(err)
                              var error = {};
                              error.code = 'INVALIDATE_CACHE_ERROR';
                              error.message = 'Could not invalidate cache.';
                              error.status = err.status;
                              response.respond(error, res);
                            } else {
                              console.info(ok);
                              var result = {'ok': true};
                              response.respond(result, res);
                            }//else err
                          });//invalidateCache
                        }//else err
                      });//updateMerchant
                    }//else err
                  });//findByMerchantId
                }//else err
              });//stewardsPut
            }//else err
          });//authenticate

          //
          // var authorization = 'Basic ' + new Buffer("openmoney-api:q0LfZKmhvd0H9jXZK56TVJvZM+9tm5zBG0/P60ZPXz/MVh0+/vryhZ5z/X23tME3d0HuzhlB/lRouNauFroLrGmweoXCIHDPqZ19p2EHSCT3JVXQgsQHiyNPDEZiS8b1fl++o5qwFoVx62hx0eO2djFUfTkk9kR+paiyIZLs7jrjwxUVl1J+qmQF0ZPSYdyZSc8KhD7cYITFFp2N2Y9r+A==").toString('base64');
          // var request = {};
          // request.grant_type = 'password';
          // request.username = oldMerchant.merchantname;
          // request.password = oldMerchant.password;
          //
          // var oauthAPI = new openmoneyApi.AuthApi();
          // oauthAPI.oauthAccessTokenPost(oldMerchant.merchantname, request, authorization, function(err, data, response){
          //   if(err){
          //     console.error(err);
          //     var error = {};
          //     error.code = 'OPENMONEY_SERVICE_ERROR';
          //     error.message = 'Openmoney Service Error.';
          //     error.status = 500;
          //     res.statusCode = error.status;
          //     examples['application/json'] = error;
          //     console.error('Error Returned:');
          //     console.error(error);
          //     examples['application/json'] = response;
          //     if(Object.keys(examples).length > 0) {
          //       res.setHeader('Content-Type', 'application/json');
          //       res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
          //     }
          //     else {
          //       res.end();
          //     }
          //   } else {
          //     console.log(response.body);
          //     //password changed so we have to change password on openmoney API
          //     var steward = {};
          //     steward.stewardname = oldMerchant.merchantname;
          //     steward.email = oldMerchant.email;
          //     steward.email_notifications = false;
          //     steward.password = newpassword;
          //
          //     var stewardsApi = new openmoneyApi.StewardsApi();
          //
          //     authorization = 'Bearer ' + response.body.access_token;
          //
          //     stewardsApi.stewardsPut(steward.stewardname, steward, authorization, function(err, data, response){
          //       if(err){
          //         console.error(err);
          //         var error = {};
          //         error.code = 'OPENMONEY_SERVICE_ERROR';
          //         error.message = 'Openmoney Service Error.';
          //         error.status = 500;
          //         res.statusCode = error.status;
          //         examples['application/json'] = error;
          //         console.error('Error Returned:');
          //         console.error(error);
          //         examples['application/json'] = response;
          //       } else {
          //         console.log(response.body);
          //         //update password in local db.
          //         oldMerchant.password = newpassword;
          //         merchants.updateMerchant(oldMerchant, function(err, response){
          //           if (err){
          //             console.info(err)
          //             var error = {};
          //             error.code = 'MERCHANT_UPDATE_ERROR';
          //             error.message = 'Could not update merchant.';
          //             error.status = err.status;
          //             res.statusCode = error.status;
          //             examples['application/json'] = error;
          //           } else {
          //             console.info(response);
          //             var result = {'ok': true};
          //             examples['application/json'] = result;
          //           }//else err
          //
          //           console.info(examples['application/json']);
          //           if(Object.keys(examples).length > 0) {
          //             res.setHeader('Content-Type', 'application/json');
          //             res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
          //           }
          //           else {
          //             res.end();
          //           }
          //         });//updateMerchant
          //       }//else err
          //
          //     });//stewardsPut
          //   }//else err
          // });//oauthAccessTokenPost


        }//if password verify
      }//if merchang namechange
    }//else err
  });//findByMerchantId
}//merchantsPut

exports.merchantsDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantname (String)
  * authorization (String)
  **/

  console.info(args);
  var merchantname = args.merchantname.value;
  // check that the user is the owner
  var basic = new Buffer(args.Authorization.value.replace(/Basic /i,''), 'base64').toString('utf8').split(':');
  var username = basic[0];
  if(merchantname != username) {
    var error = {};
    error.code = 'MERCHANT_DELETE_YOURSELF';
    error.message = 'You can only delete your merchant account.';
    error.status = 400;
    response.respond(error, res);
  } else {
    merchants.findByMerchantId('merchants~' + merchantname, function(err, merchant){
      if(err){
        if(err.code == 404){
          var error = {};
          error.code = 'MERCHANT_NOT_FOUND';
          error.message = 'Could not find the merchant account.';
          error.status = 400;
          response.respond(error, res);
        } else {
          var error = {};
          error.code = 'DB_ERROR';
          error.message = 'Could not get the merchant account.';
          error.status = err.code;
          response.respond(error, res);
        }//else err
      } else {

        merchant.deleted = true;
        console.log(merchant);
        merchants.updateMerchant(merchant, function(err, ok){
          if(err){
            console.error(err);
            var error = {};
            error.code = 'DB_ERROR';
            error.message = 'Could not update the merchant account.';
            error.status = err.code;
            response.respond(error, res);
          } else {
            console.info(ok);
            var result = {'ok': true};
            response.respond(result, res);
          }//else
        });///updateMerchant
      }//else err
    });//findByMerchantId
  }//else merchant match
};//merchantsDelete

exports.merchantList = function(args, res, next) {
  /**
   * parameters expected in the args:
  * authorization (String)
  **/

  console.info('in merchantList');
  console.info(args);



  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }

}

exports.merchantsPost = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantRequest (Merchants_request)
  **/

  console.info(args);

  var merchant = {};
  merchant.type = 'merchants~';
  merchant.merchantname = args.merchant_request.value.merchantname.toLowerCase();
  merchant._id = merchant.type + merchant.merchantname.toLowerCase();
  //TODO: for production enable hash of password so they can't log in to their account and mess with things.
  //merchant.password = scrypt.kdfSync(args.merchant_request.value.password, scryptParameters).toString('base64');
  merchant.password = args.merchant_request.value.password;
  if(typeof args.merchant_request.value.email != 'undefined')
    merchant.email = args.merchant_request.value.email;
  merchant.email_notifications = false;
  if(typeof args.merchant_request.value.email_notifications != 'undefined')
    merchant.email_notifications = args.merchant_request.value.email_notifications;

  //create merchant in openmoney
  var steward = {};
  steward.stewardname = merchant.merchantname.toLowerCase();
  steward.password = merchant.password;
  if(typeof merchant.email != 'undefined'){
    steward.email = merchant.email;
    steward.email_notifications = false;
  }
  //console.log(openmoneyApi.StewardsApi);

  var stewardsApi = new openmoneyApi.StewardsApi();
  // openmoneyTS.stewardsApi.stewardsPost(steward).then(function(response){
  //   console.log(response);
  // }).catch(function(error){
  //   console.log(error);
  // });

  stewardsApi.stewardsPost(steward, function(err, data, result){
    if(err){
      console.error(err, data, result);
      if(typeof result != 'undefined' && result.body.code == 1010) {
        var error = {};
        error.code = 'MERCHANT_EXISTS';
        error.message = 'That merchant name is already taken.';
        error.status = 400;
        response.respond(error, res);
      } else {
        var error = {};
        error.code = 'OPENMONEY_SERVICE_ERROR';
        error.message = 'Openmoney Service Error.';
        error.status = 500;
        response.respond(error, res);
      }
    } else {
      console.info('Stewards Post Success:');
      console.info(result.body);

      //store the public and private keys for this merchant
      result.body.stewards.forEach(function(thisSteward){
        if(thisSteward.stewardname.toLowerCase() == steward.stewardname.toLowerCase()){
          merchant.publicKey = thisSteward.publicKey;
          merchant.privateKey = thisSteward.privateKey;
        }
      })


      merchants.insertMerchant(merchant, function(err, ok){
        if(err){
          console.error(err);
          var error = {};
          error.code = 'MERCHANT_SAVE_ERROR:' + JSON.stringify(err);
          error.message = 'Failed to save merchant';
          error.status = 500;
          response.respond(error, res);
        } else {
          console.info(ok);
          //use stewards namespace and create two currencies in their namespace giftcard and points
          //cureency_name = giftcard.stewardname.cc
          //currency_namespace = stewardname.cc

          //currency_name = points.stewardname.cc
          //currency_namespace = stewardname.cc

          oauth.authenticate(merchant.merchantname, function(err, access_token){
            if(err){
              console.info(merchant.merchantname);
              response.respond(err, res);
            } else {


              var parallel = {};

              var cardholder_insert = {};
              cardholder_insert.firstname = 'Openmoney';
              cardholder_insert.lastname = 'Development';
              cardholder_insert.email = 'openmoney.gift@gmail.com';
              cardholder_insert.phone = '';
              cardholder_insert.type = 'cardholders~';
              cardholder_insert.merchantname = steward.stewardname;
              cardholder_insert._id = cardholder_insert.type + cardholder_insert.merchantname + '~' + cardholder_insert.firstname + '~' + cardholder_insert.lastname;
              parallel.omdevPatron = function(callback){
                console.info(cardholder_insert);
                cardholders.insertCardholder(cardholder_insert, function(err, ok){
                  callback(err, ok);
                });
              };

              parallel.omdevPatronCard = function(callback){
                var card = {};
                card.key = 'omdev';
                card.balances = {
                  'dollars': 0
                };
                card.volumes = {
                  'dollars': 0
                };
                card.cardholderID = cardholder_insert._id;
                card.type = 'cards~';
                card.merchantname = steward.stewardname;
                card._id = card.type + steward.stewardname + '~' + card.key;
                card.created_by = '';
                cards.insertCard(card, function(err, ok){
                  callback(err, ok);
                });//insertCard
              }

              //TODO:create the initial currencies
              parallel.giftPost = function(callback){
                console.info('in giftPost');
                var gift_currency = {};
                gift_currency.currency = 'dollars';
                gift_currency.currency_namespace = steward.stewardname + '.cc'
                gift_currency.stewards = [];
                gift_currency.stewards.push('stewards~' + steward.stewardname);
                gift_currency.currency_name = 'Gift';
                gift_currency.currency_color = 'success';
                gift_currency.default = true;
                gift_currency.contributionPerPatron = '1';
                gift_currency.private = true;
                gift_currency.disabled = false;
                var currenciesApi = new openmoneyApi.CurrenciesApi();
                var authorization = 'Bearer ' + access_token;

                var opts = {};
                opts.currency = gift_currency;
                opts.authorization = authorization;

                currenciesApi.currenciesPost(steward.stewardname, opts, function(err, data, ok){
                  console.info(ok.body);
                  callback(err, ok.body);
                });
              };//giftPost

              parallel.pointsPost = function(callback){
                console.info('in pointsPost');
                var points_currency = {};
                points_currency.currency = 'points';
                points_currency.currency_namespace = steward.stewardname + '.cc'
                points_currency.stewards = [];
                points_currency.stewards.push('stewards~' + steward.stewardname);
                points_currency.currency_name = 'Loyalty';
                points_currency.currency_color = 'warning';
                points_currency.contributionPerPatron = '0';
                points_currency.disabled = true;
                points_currency.private = true;
                var currenciesApi = new openmoneyApi.CurrenciesApi();
                var authorization = 'Bearer ' + access_token;
                var opts = {};
                opts.currency = points_currency;
                opts.authorization = authorization;

                currenciesApi.currenciesPost(steward.stewardname, opts, function(err, data, ok){
                  console.info([err,data,ok]);
                  callback(err, data);
                });
              };//pointsPost

              parallel.promoPost = function(callback){
                console.info('in promoPost');
                var promo_currency = {};
                promo_currency.currency = 'promo';
                promo_currency.currency_namespace = steward.stewardname + '.cc'
                promo_currency.stewards = [];
                promo_currency.stewards.push('stewards~' + steward.stewardname);
                promo_currency.currency_name = 'Promotional';
                promo_currency.currency_color = 'primary';
                promo_currency.contributionPerPatron = '0';
                promo_currency.disabled = true;
                promo_currency.private = true;
                var currenciesApi = new openmoneyApi.CurrenciesApi();
                var authorization = 'Bearer ' + access_token;
                var opts = {};
                opts.currency = promo_currency;
                opts.authorization = authorization;

                currenciesApi.currenciesPost(steward.stewardname, opts, function(err, data, ok){
                  console.info([err,data,ok]);
                  callback(err, data);
                });
              };//promoPost

              parallel.tabPost = function(callback){
                console.info('in tabPost');
                var tab_currency = {};
                tab_currency.currency = 'tab';
                tab_currency.currency_namespace = steward.stewardname + '.cc'
                tab_currency.stewards = [];
                tab_currency.stewards.push('stewards~' + steward.stewardname);
                tab_currency.currency_name = 'Tab';
                tab_currency.currency_color = 'danger';
                tab_currency.contributionPerPatron = '0';
                tab_currency.disabled = true;
                tab_currency.private = true;
                var currenciesApi = new openmoneyApi.CurrenciesApi();
                var authorization = 'Bearer ' + access_token;
                var opts = {};
                opts.currency = tab_currency;
                opts.authorization = authorization;

                currenciesApi.currenciesPost(steward.stewardname, opts, function(err, data, ok){
                  console.info([err,data,ok]);
                  callback(err, data);
                });
              };//tabPost

              parallel.stampPost = function(callback){
                console.info('in stampPost');
                var stamp_currency = {};
                stamp_currency.currency = 'stamp';
                stamp_currency.currency_namespace = steward.stewardname + '.cc'
                stamp_currency.stewards = [];
                stamp_currency.stewards.push('stewards~' + steward.stewardname);
                stamp_currency.currency_name = 'Stamp';
                stamp_currency.currency_color = 'info';
                stamp_currency.contributionPerPatron = '0';
                stamp_currency.disabled = true;
                stamp_currency.private = true;
                var currenciesApi = new openmoneyApi.CurrenciesApi();
                var authorization = 'Bearer ' + access_token;

                var opts = {};
                opts.currency = stamp_currency;
                opts.authorization = authorization;

                currenciesApi.currenciesPost(steward.stewardname, opts, function(err, data, ok){
                  console.info([err,data,ok]);
                  callback(err, data);
                });
              };//tabPost

              //TODO:create the initial system accounts where all the giftcards and points get posted to
              parallel.giftcardCreate = function(callback){
                var accountsApi = new openmoneyApi.AccountsApi();
                var authorization = 'Bearer ' + access_token;
                var stewardname = steward.stewardname;
                var namespace = stewardname + '.cc';

                var account = {};
                account.account = steward.stewardname;
                account.account_namespace = namespace;
                account.currency = 'dollars';
                account.currency_namespace = namespace;
                account.stewards = ['stewards~' + stewardname];
                //account.publicKey = card.key;

                console.info(account);
                var opts = {};
                opts.account = account;
                opts.authorization = authorization;

                accountsApi.accountsPost(stewardname, namespace, opts, function(err, data, response){
                  callback(err, data);
                });//accountsPost
              };//giftcardCreate

              parallel.giftcardOmdevCreate = function(callback){
                var accountsApi = new openmoneyApi.AccountsApi();
                var authorization = 'Bearer ' + access_token;
                var stewardname = steward.stewardname;
                var namespace = stewardname + '.cc';

                var account = {};
                account.account = 'omdev';
                account.account_namespace = namespace;
                account.currency = 'dollars';
                account.currency_namespace = namespace;
                account.stewards = ['stewards~' + stewardname, 'stewards~omdev'];
                //account.publicKey = card.key;

                console.info(account);
                var opts = {};
                opts.account = account;
                opts.authorization = authorization;

                accountsApi.accountsPost(stewardname, namespace, opts, function(err, data, response){
                  callback(err, data);
                });//accountsPost
              };//giftcardOmdevCreate

              parallel.pointsCreate = function(callback){

                var accountsApi = new openmoneyApi.AccountsApi();
                var authorization = 'Bearer ' + access_token;
                var stewardname = steward.stewardname;
                var namespace = stewardname + '.cc';

                var account = {};
                account.account = steward.stewardname;
                account.account_namespace = namespace;
                account.currency = 'points';
                account.currency_namespace = namespace;
                account.stewards = ['stewards~' + stewardname];
                //account.publicKey = card.key;

                console.log(account)
                var opts = {};
                opts.account = account;
                opts.authorization = authorization;

                accountsApi.accountsPost(stewardname, namespace, opts, function(err, data, response){
                  callback(err, data);
                });//accountsPost
              };//pointsCreate

              // parallel.pointsOmdevCreate = function(callback){
              //
              //   var accountsApi = new openmoneyApi.AccountsApi();
              //   var authorization = 'Bearer ' + access_token;
              //   var stewardname = steward.stewardname;
              //   var namespace = stewardname + '.cc';
              //
              //   var account = {};
              //   account.account = 'omdev';
              //   account.account_namespace = namespace;
              //   account.currency = 'points';
              //   account.currency_namespace = namespace;
              //   account.stewards = ['stewards~' + stewardname, 'stewards~omdev'];
              //   //account.publicKey = card.key;
              //
              //   console.log(account)
              //   accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
              //     callback(err, data);
              //   });//accountsPost
              // };//pointsOmdevCreate

              parallel.promoCreate = function(callback){

                var accountsApi = new openmoneyApi.AccountsApi();
                var authorization = 'Bearer ' + access_token;
                var stewardname = steward.stewardname;
                var namespace = stewardname + '.cc';

                var account = {};
                account.account = steward.stewardname;
                account.account_namespace = namespace;
                account.currency = 'promo';
                account.currency_namespace = namespace;
                account.stewards = ['stewards~' + stewardname];
                //account.publicKey = card.key;

                console.log(account)
                var opts = {};
                opts.account = account;
                opts.authorization = authorization;

                accountsApi.accountsPost(stewardname, namespace, opts, function(err, data, response){
                  callback(err, data);
                });//accountsPost
              };//promoCreate

              // parallel.promoOmdevCreate = function(callback){
              //
              //   var accountsApi = new openmoneyApi.AccountsApi();
              //   var authorization = 'Bearer ' + access_token;
              //   var stewardname = steward.stewardname;
              //   var namespace = stewardname + '.cc';
              //
              //   var account = {};
              //   account.account = 'omdev';
              //   account.account_namespace = namespace;
              //   account.currency = 'promo';
              //   account.currency_namespace = namespace;
              //   account.stewards = ['stewards~' + stewardname, 'stewards~omdev'];
              //   //account.publicKey = card.key;
              //
              //   console.log(account)
              //   accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
              //     callback(err, data);
              //   });//accountsPost
              // };//promoCreate

              parallel.tabCreate = function(callback){

                var accountsApi = new openmoneyApi.AccountsApi();
                var authorization = 'Bearer ' + access_token;
                var stewardname = steward.stewardname;
                var namespace = stewardname + '.cc';

                var account = {};
                account.account = steward.stewardname;
                account.account_namespace = namespace;
                account.currency = 'tab';
                account.currency_namespace = namespace;
                account.stewards = ['stewards~' + stewardname];
                //account.publicKey = card.key;

                console.log(account)
                var opts = {};
                opts.account = account;
                opts.authorization = authorization;

                accountsApi.accountsPost(stewardname, namespace, opts, function(err, data, response){
                  callback(err, data);
                });//accountsPost
              };//tabCreate

              // parallel.tabOmdevCreate = function(callback){
              //
              //   var accountsApi = new openmoneyApi.AccountsApi();
              //   var authorization = 'Bearer ' + access_token;
              //   var stewardname = steward.stewardname;
              //   var namespace = stewardname + '.cc';
              //
              //   var account = {};
              //   account.account = 'omdev';
              //   account.account_namespace = namespace;
              //   account.currency = 'tab';
              //   account.currency_namespace = namespace;
              //   account.stewards = ['stewards~' + stewardname, 'stewards~omdev'];
              //   //account.publicKey = card.key;
              //
              //   console.log(account)
              //   accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
              //     callback(err, data);
              //   });//accountsPost
              // };//tabCreate

              parallel.stampCreate = function(callback){

                var accountsApi = new openmoneyApi.AccountsApi();
                var authorization = 'Bearer ' + access_token;
                var stewardname = steward.stewardname;
                var namespace = stewardname + '.cc';

                var account = {};
                account.account = steward.stewardname;
                account.account_namespace = namespace;
                account.currency = 'stamp';
                account.currency_namespace = namespace;
                account.stewards = ['stewards~' + stewardname];
                //account.publicKey = card.key;

                console.log(account)
                var opts = {};
                opts.account = account;
                opts.authorization = authorization;

                accountsApi.accountsPost(stewardname, namespace, opts, function(err, data, response){
                  callback(err, data);
                });//accountsPost
              };//stampCreate

              // parallel.stampOmdevCreate = function(callback){
              //
              //   var accountsApi = new openmoneyApi.AccountsApi();
              //   var authorization = 'Bearer ' + access_token;
              //   var stewardname = steward.stewardname;
              //   var namespace = stewardname + '.cc';
              //
              //   var account = {};
              //   account.account = 'omdev';
              //   account.account_namespace = namespace;
              //   account.currency = 'stamp';
              //   account.currency_namespace = namespace;
              //   account.stewards = ['stewards~' + stewardname, 'stewards~omdev'];
              //   //account.publicKey = card.key;
              //
              //   console.log(account)
              //   accountsApi.accountsPost(stewardname, namespace, authorization, account, function(err, data, response){
              //     callback(err, data);
              //   });//accountsPost
              // };//stampCreate

              //TODO:if posted in parallel this does not work find out why and fix.
              async.series(parallel, function(err, results){
                if(err){
                  console.error(err);
                  var error = {};
                  error.code = 'CURRENCY_CREATE_ERROR';
                  error.message = 'Failed to create currency on openmoney network.';
                  error.status = 500;
                  response.respond(error, res);
                } else {
                  console.info(results);
                  var messageHTML =
                  '<div style="padding-top:20px">\
                    <h2>Welcome To <a href="https://openmoney.gift/">Openmoney.gift</a>, you have the gift.<h2>\
                    <h3>your Merchantname is: ' + merchant.merchantname + '</h3>\
                    <h4>If you forgot your password you can send a <a href="https://openmoney.gift/#forgot">forgot password request here.</a>\
                  </div>';
                  sendmail(merchant.email, "Welcome To Openmoney.gift, you have the gift.", "", messageHTML, function(error, ok){
                    if(error){
                      console.error(err);
                      var error = {};
                      error.code = 'EMAIL_FAILURE';
                      error.message = 'Failed to send registration email on openmoney network. No worries just login.';
                      error.status = 500;
                      var result = {};
                      result._id = merchant._id;
                      result.merchantname = merchant.merchantname;
                      result.email = merchant.email;
                      result.email_notifications = merchant.email_notifications;
                      response.respond(result, res);
                    } else {
                      console.log("Email Sent: ",ok);
                      sendmail("deefactorial@gmail.com, michael.linton@gmail.com", "Registration: <'" + merchant.merchantname + "', " + merchant.email + ">", "", messageHTML, function(error, ok){
                        console.log('sendmail to deefactorial', error, ok);
                      });
                      var result = {};
                      result._id = merchant._id;
                      result.merchantname = merchant.merchantname;
                      result.email = merchant.email;
                      result.email_notifications = merchant.email_notifications;
                      response.respond(result, res);
                    }
                  })

                }//else err
              });//async parallel
            }//else err
          });//authenticate
        }//else err
      });//insertMerchant
    }//else err
  });//stewardsPost
};//merchantsPost


exports.merchantsCurrenciesPost = function(args, res, next) {
  /**
   * parameters expected in the args:
  * merchantRequest (Merchants_request)
  **/

  console.info(args);

  var currency = {};
  currency.currency = args.currency.value.currency;
  currency.currency_namespace = args.user.merchantname + '.cc';
  currency.stewards = [ 'stewards~' + args.user.merchantname ];
  currency.currency_color = args.currency.value.currency_color;
  currency.currency_name = args.currency.value.currency_name;
  currency.contributionPerPatron = args.currency.value.contributionPerPatron;
  currency.private = true;
  currency.disabled = false;

  var account = {};
  account.account = args.user.merchantname;
  account.account_namespace = args.user.merchantname + '.cc';
  account.currency = currency.currency;
  account.currency_namespace = currency.currency_namespace;
  account.stewards = [ 'stewards~' + args.user.merchantname ];

  if(args.merchantname.value != args.user.merchantname){
    var error = {};
    error.code = 'MERCHANT_UNAUTHORIZED';
    error.message = 'Cannot access another merchants data.';
    error.status = 400;
    response.respond(error, res);
  } else {
    oauth.authenticate(args.merchantname.value, function(err, access_token){
      if(err){
        console.info(args.merchantname.value);
        response.respond(err, res);
      } else {

        //TODO:create the initial currencies
        var series = {};
        series.currencyPost = function(callback){
          console.info('in currencyPost');
          var currenciesApi = new openmoneyApi.CurrenciesApi();
          var authorization = 'Bearer ' + access_token;
          var opts = {};
          opts.authorization = authorization;
          opts.currency = currency;

          currenciesApi.currenciesPost(args.merchantname.value, opts, function(err, data, ok){
            console.info('currencies post result', err, data, ok);
            if(typeof ok != 'undefined'){
              callback(err, ok.body);
            } else {
              callback(err, ok);
            }
          });
        };//giftPost

        //TODO:create the initial system accounts where all the giftcards and points get posted to
        series.accountCreate = function(callback){
          console.log('in accountCreate')
          var accountsApi = new openmoneyApi.AccountsApi();
          var authorization = 'Bearer ' + access_token;

          console.info(account);
          var opts = {};
          opts.account = account;
          opts.authorization = authorization;

          accountsApi.accountsPost(args.merchantname.value, account.account_namespace, opts, function(err, data, response){
            callback(err, data);
          });//accountsPost
        };//giftcardCreate

        //TODO:if posted in parallel this does not work find out why and fix.
        async.series(series, function(err, results){
          if(err){
            console.error(err);
            var error = {};
            error.code = 'CURRENCY_CREATE_ERROR';
            error.message = 'Failed to create currency on openmoney network.';
            error.status = 500;
            response.respond(error, res);
          } else {
            console.info(results);
            var result = {};
            result._id = 'currencies~' + currency.currency + '.' + currency.currency_namespace;
            result.ok = true;
            response.respond(result, res);
          }//else err
        });//async parallel
      }//else err
    });//authenticate
  }//if merchant match
};//merchantsPost
