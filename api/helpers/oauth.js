var openmoneyApi = require('../../third_party/openmoney-api-client/javascript-client3/src/');
var cache = [];
var merchants = require('../model/merchants');
var scrypt = require('scrypt');
var authorization = 'Basic ' + new Buffer("openmoney-api:q0LfZKmhvd0H9jXZK56TVJvZM+9tm5zBG0/P60ZPXz/MVh0+/vryhZ5z/X23tME3d0HuzhlB/lRouNauFroLrGmweoXCIHDPqZ19p2EHSCT3JVXQgsQHiyNPDEZiS8b1fl++o5qwFoVx62hx0eO2djFUfTkk9kR+paiyIZLs7jrjwxUVl1J+qmQF0ZPSYdyZSc8KhD7cYITFFp2N2Y9r+A==").toString('base64');

exports.authenticate = function (merchantname, callback){
  //check cache
  if(merchantname in cache){
    //check expiry of token
    if(new Date(cache[merchantname].expires).getTime() > new Date().getTime()){
      // not expired
      callback(null, cache[merchantname].access_token);
    } else {
      //expired refresh token
      RefreshToken(merchantname, cache[merchantname].refresh_token, function(err, results){
        if(err){
          callback(err);
        } else {
          //put token to cache and merchant and return token
          merchants.findByMerchantId('merchants~' + merchantname, function(err, merchant){
            if(err){
              callback(err);
            } else {
              merchant.access_token = results.access_token;
              merchant.expires = results.expires;
              merchant.refresh_token = results.refresh_token;
              merchants.updateMerchant(merchant, function(err, ok){
                //doesn't matter if err or ok
              });
            }//else err
          });//findByMerchantID

          cache[merchantname] = {};
          cache[merchantname].expires = results.expires;
          cache[merchantname].access_token = results.access_token;
          cache[merchantname].refresh_token = results.refresh_token;


          callback(null, results.access_token);
        }//else err
      });//RefreshToken
    }//else expired

  } else {
    //check db
    merchants.findByMerchantId('merchants~' + merchantname, function(err, merchant){
      if(err){
        callback(err);
      } else {
        //if token doesn't exist authenticate and get one
        if(typeof merchant.access_token != undefined) {
          var request = {};
          request.grant_type = 'password';
          request.username = merchantname;
          request.password = merchant.password;

          var oauthAPI = new openmoneyApi.AuthApi();
          var opts = {};
          opts.authorization = authorization;
          oauthAPI.oauthAccessTokenPost(merchantname, request, opts, function(err, data, response){
            if(err){
              console.error(err);
              var error = {};
              error.code = 'OPENMONEY_SERVICE_ERROR';
              error.message = 'Openmoney Service Error.';
              error.status = 500;
              callback(error);
            } else {
              console.log(response.body);
              //put token to cache and merchant and return token
              merchant.access_token = response.body.access_token;
              merchant.expires = response.body.expires;
              merchant.refresh_token = response.body.refresh_token;
              merchants.updateMerchant(merchant, function(err, ok){
                //doesn't matter if err or ok
              });

              cache[merchantname] = {};
              cache[merchantname].expires = response.body.expires;
              cache[merchantname].access_token = response.body.access_token;
              cache[merchantname].refresh_token = response.body.refresh_token;

              callback(null, response.body.access_token);
            }//else err
          });//oauthAccessTokenPost
        } else {
          //check expiry of token
          if(typeof merchant.expires != undefined && new Date(merchant.expires).getTime() > new Date().getTime()){
            //use token
            callback(null, merchant.access_token);
          } else {
            //refresh token
            RefreshToken(merchant.merchantname, merchant.refresh_token, function(err, results){
              if(err){
                callback(err);
              } else {
                //put token to cache and merchant and return token
                merchant.access_token = results.access_token;
                merchant.expires = results.expires;
                merchant.refresh_token = results.refresh_token;
                merchants.updateMerchant(merchant, function(err, ok){
                  //doesn't matter if err or ok
                });

                cache[merchantname] = {};
                cache[merchantname].expires = results.expires;
                cache[merchantname].access_token = results.access_token;
                cache[merchantname].refresh_token = results.refresh_token;

                callback(null, results.access_token);
              }//else err
            });//RefreshToken
          }//else expired
        }//else token
      }//else err
    });//findByMerchantId
  }//else in cache
}//Authenticate


function RefreshToken(merchantname, refresh_token, callback){
  var request = {};
  request.grant_type = 'refresh_token';
  request.username = merchantname;
  request.refresh_token = refresh_token;

  var oauthAPI = new openmoneyApi.AuthApi();
  var opts = {};
  opts.authorization = authorization;
  oauthAPI.oauthAccessTokenPost(merchantname, request, opts, function(err, data, response){
    callback(err, response.body);
  });
}//RefreshToken

exports.invalidateCache = function (merchantname, callback){
  if(typeof cache[merchantname] != undefined){
    delete(cache[merchantname].access_token);
    delete(cache[merchantname].refresh_token);
    delete(cache[merchantname].expires);
    delete(cache[merchantname]);
  }

  merchants.findByMerchantId('merchants~' + merchantname, function(err, merchant){
    if(err){
      callback(err);
    } else {
      console.log(merchant)
      delete(merchant.access_token);
      delete(merchant.refresh_token);
      delete(merchant.expires);
      console.log(merchant)
      merchants.updateMerchant(merchant, function(err, ok){
        console.log([err,ok]);
        callback(err, ok);
      });
    }//else err
  });//findByMerchantId
}//invalidateCache
