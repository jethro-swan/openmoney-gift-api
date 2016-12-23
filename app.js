'use strict';

var app = require('express')();
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var scrypt = require('scrypt');
var model = require('./api/model/');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

module.exports = app; // for testing
passport.use(new BasicStrategy(
    function(username, password, done) {
      console.log("in BasicStrategy (username: " + username + ", password: " + password + ");");
      model.merchants.findByMerchantId('merchants~' + username.toLowerCase(), function(err, merchant) {
        if (err && err.status != 404) {
          console.error(err);
          return done(err); }
        if (!merchant) {
          console.error('Merchant not found!');
          return done(null, false); }
        var time = new Date().getTime(); //scrypt is a bottle neck for speed.
        //if (!scrypt.verifyKdfSync(new Buffer(merchant.password, 'base64'), password)) {
        if (merchant.password != password) {
          console.error('Password did not match!');
          return done(null, false);
        }
        console.info('time for scrypt to decrypt password: ' + (new Date().getTime() - time) + 'ms');
        if (merchant.deleted) {
          console.error('Merchant account has been deleted.');
          return done(null, false);
        }
        return done(null, merchant);
      });
    }
));

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    password: function(req, def, scopes, callback){
      console.info('in basicAuthenticationSecurity (req: ' + JSON.stringify(req.headers) + ', def: ' + JSON.stringify(def) + ', scopes: ' + scopes + ')');
      passport.authenticate('basic', function (err, user, info) {
        console.info('in passport authenticate' + JSON.stringify([err, user, info]));
        if (err) {
          callback(new Error('Error in passport authenticate'));
        } else if (!user) {
          callback(new Error('Failed to authenticate oAuth token'));
        } else {
          req.swagger.params.user = user;
          callback();
        }
      })(req, null, callback);
    }
  }
};

//var SwaggerApi = require('sway');
//
//SwaggerApi.create({definition: './api/swagger/swagger.yaml'})
//    .then(function (api) {
//      var results = api.validate();
//      console.log(results);
//      console.log('Documentation URL: ', api.documentationUrl);
//      console.log(api.references);
//    }, function (err) {
//      console.error(err.stack);
//    });

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var swagger = require('swagger-tools');
var swaggerObject = require('./api/swagger/swagger.json'); // This assumes you're in the root of the swagger-tools

// Initialize the Swagger Middleware
swagger.initializeMiddleware(swaggerObject, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Provide the security handlers
  app.use(middleware.swaggerSecurity(config.swaggerSecurityHandlers));

  app.use(function(err, req, res, next) {
    console.error("Security Error Middleware: " + JSON.stringify(err));
    if(err.statusCode == 403){
      var error = {};
      error.code = 'AUTHORIZATION_ERROR';
      error.status = 403;
      error.message = 'Authorization Failed.';
      res.statusCode = error.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(error));
    }
  });

  // Validate Swagger requests
  app.use(middleware.swaggerValidator({
    validateResponse: true
  }));

  app.use(function(err, req, res, next) {
    console.error("Validation Error Middleware: " + JSON.stringify(err));
    if(err.code == 'SCHEMA_VALIDATION_FAILED'){
      var error = {};
      error.code = 'SCHEMA_VALIDATION_FAILED';
      error.status = 403;
      error.message = err.results.errors[0].message;
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(error));
    }
  });


  // // Bug preventing response validation from JSON.parse output.
  // app.post('/V2/stewards/:stewardname/oauth/token', oauth2.token);
  //
  // //use the security and request/response validation before processing the oauth end points.
  // app.get('/V2/stewards/:stewardname/login', site.loginForm);
  // app.post('/V2/stewards/:stewardname/login', site.login);
  // app.get('/V2/stewards/:stewardname/logut', site.logout);
  // app.get('/V2/stewards/:stewardname/account', site.account);
  // app.get('/V2/stewards/:stewardname/dialog/authorize', oauth2.authorization);
  // app.post('/V2/stewards/:stewardname/dialog/authorize/decision', oauth2.decision);

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter({useStubs: true, controllers: './api/controllers'}));


  // Serve the Swagger documents and Swagger UI
  //   http://localhost:3000/docs => Swagger UI
  //   http://localhost:3000/api-docs => Swagger document
  app.use(middleware.swaggerUi({
    apiDocs: '/api-docs',
    swaggerUi: '/docs'
  }));

  var port = process.env.PORT || 9090;
  app.listen(port, function() {
    console.log('The server is running on port:' + port);
  });
});
// var SwaggerExpress = require('swagger-express-mw');
// SwaggerExpress.create(config, function(err, swaggerExpress) {
//   if (err) { throw err; }
//
//   // install middleware
//   swaggerExpress.register(app);
//
//   var port = process.env.PORT || 9090;
//   app.listen(port);
//
//   if (swaggerExpress.runner.swagger.paths['/hello']) {
//     console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
//   }
// });
