'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:9090'); // supertest init;
var expect = chai.expect;

require('dotenv').config();

var request = {};
request.merchantname = process.env.MERCHANTNAME + process.env.TIME;
request.password = process.env.PASSWORD;
request.email = process.env.EMAIL;

describe('/merchants', function() {

  describe('post', function() {
    it('should respond with 200 Registration Success', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "merchantname",
          "email",
          "email_notifications"
        ],
        "properties": {
          "merchantname": {
            "type": "string",
            "description": "merchant username",
            "maxLength": 255,
            "pattern": "^[A-Za-z0-9_.-]+$"
          },
          "email": {
            "type": "string",
            "description": "merchant email address",
            "format": "email",
            "maxLength": 255,
          },
          "email_notifications": {
            "type": "boolean",
            "description": "Does merchant wish to receive email notifications"
          }
        }
      };

      this.timeout(20000);

      /*eslint-enable*/
      api.post('/V1/merchants')
          .set('Accept', 'application/json')
          .send(request)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              console.info('request:')
              console.info(request);
              console.error('error result:')
              console.error(err);
              return done(err)
            }
            var results = validator.validate(res.body, schema);
            if (!results) {
                console.info('response:')
                console.info(res.body);
                var errors = JSON.stringify(validator.getLastErrors());
                console.error('validation error:')
                console.error(errors);
            }
            expect(results).to.be.true;
            done();
          });
    });

    // it('should respond with 200 Registration Success', function(done) {
    //   api.post('/V1/merchants')
    //   .set('Accept', 'application/json')
    //   .send({
    //     merchant_request: 'DATA GOES HERE'
    //   })
    //   .expect(200)
    //   .end(function(err, res) {
    //     if (err) return done(err);
    //
    //     expect(res.body).to.equal(null); // non-json response or no schema
    //     done();
    //   });
    // });

    /*eslint-disable*/
    var schema = {
      "type": "object",
      "required": [
        "code",
        "message"
      ],
      "properties": {
        "code": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "failedValidation": {
          "type": "boolean"
        },
        "results": {
          "type": "object",
          "properties": {
            "errors": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "code": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  },
                  "path": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "desccription": {
                    "type": "string"
                  }
                }
              }
            },
            "warnings": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "code": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  },
                  "path": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "desccription": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "originalResponse": {
          "type": "string"
        }
      }
    };
    /*eslint-enable*/

    it('should respond with merchant exists', function(done) {

      this.timeout(10000);

      api.post('/V1/merchants')
      .set('Accept', 'application/json')
      .send(request)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(request);
          console.error('error result:')
          console.error(err);
          return done(err)
        }
        var results = validator.validate(res.body, schema);
        if (!results) {
            console.info('response:')
            console.info(res.body);
            var errors = JSON.stringify(validator.getLastErrors());
            console.error('validation error:')
            console.error(errors);
        }
        expect(results).to.be.true;
        done();
      });
    });

    // it('should respond with merchant exists', function(done) {
    //
    //   this.timeout(10000);
    //
    //   request.merchantname = 'cc.cc';
    //
    //   api.post('/V1/merchants')
    //   .set('Accept', 'application/json')
    //   .send(request)
    //   .expect(400)
    //   .end(function(err, res) {
    //     if (err) {
    //       console.info('request:')
    //       console.info(request);
    //       console.error('error result:')
    //       console.error(err);
    //       return done(err)
    //     }
    //     var results = validator.validate(res.body, schema);
    //     if (!results) {
    //         console.info('response:')
    //         console.info(res.body);
    //         var errors = JSON.stringify(validator.getLastErrors());
    //         console.error('validation error:')
    //         console.error(errors);
    //     }
    //     expect(results).to.be.true;
    //     done();
    //   });
    // });

  });
  // describe('List', function() {
  //   it('should respond with 200 List of merchants', function(done) {
  //     /*eslint-disable*/
  //     var schema = {
  //       "type": "array",
  //       "items": {
  //         "allOf": [
  //           {
  //             "type": "object",
  //             "required": [
  //               "_id"
  //             ],
  //             "properties": {
  //               "_id": {
  //                 "type": "string",
  //                 "pattern": "^[A-Za-z0-9_.~-]+$"
  //               }
  //             }
  //           },
  //           {
  //             "type": "object",
  //             "required": [
  //               "merchantname"
  //             ],
  //             "properties": {
  //               "merchantname": {
  //                 "type": "string",
  //                 "maxLength": 255,
  //                 "pattern": "^[A-Za-z0-9_.-]+$"
  //               },
  //               "email": {
  //                 "type": "string",
  //                 "format": "email",
  //                 "maxLength": 255,
  //                 "pattern": "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$"
  //               },
  //               "email_notifications": {
  //                 "type": "boolean"
  //               },
  //               "created": {
  //                 "type": "integer",
  //                 "description": "timestamp in milliseconds since epoch"
  //               },
  //               "created_by": {
  //                 "type": "string",
  //                 "description": "merchant of who created object"
  //               },
  //               "modifications": {
  //                 "type": "array",
  //                 "items": {
  //                   "type": "object",
  //                   "properties": {
  //                     "modified": {
  //                       "type": "integer",
  //                       "description": "timestamp in milliseconds since epoch"
  //                     },
  //                     "modified_by": {
  //                       "type": "string",
  //                       "description": "merchant who made modification"
  //                     },
  //                     "modification": {
  //                       "type": "string",
  //                       "description": "human readable description of modification"
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         ]
  //       }
  //     };
  //
  //     this.timeout(10000);
  //
  //     process.env.PASSWORD = new Buffer(request.merchantname + ":" + request.password).toString("base64");
  //
  //     /*eslint-enable*/
  //     api.get('/V1/merchants')
  //     .set('Authorization', 'Basic ' + process.env.PASSWORD)
  //     .set('Accept', 'application/json')
  //     .set(request)
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) {
  //         console.info('request:')
  //         console.info(request);
  //         console.error('error result:')
  //         console.error(err);
  //         return done(err)
  //       }
  //       var results = validator.validate(res.body, schema);
  //       if (!results) {
  //           console.info('response:')
  //           console.info(res.body);
  //           var errors = JSON.stringify(validator.getLastErrors());
  //           console.error('validation error:')
  //           console.error(errors);
  //       }
  //       expect(results).to.be.true;
  //       done();
  //     });
  //
  //   });
  //
  //   it('should respond with 200 List of merchants', function(done) {
  //     api.get('/V1/merchants')
  //     .set('Authorization', 'Basic ' + process.env.PASSWORD)
  //     .set('Accept', 'application/json')
  //     .set({
  //       'Authorization': 'DATA GOES HERE'
  //     })
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //
  //       expect(res.body).to.equal(null); // non-json response or no schema
  //       done();
  //     });
  //   });
  //
  //   it('should respond with default error payload', function(done) {
  //     /*eslint-disable*/
  //     var schema = {
  //       "type": "object",
  //       "required": [
  //         "code",
  //         "message"
  //       ],
  //       "properties": {
  //         "code": {
  //           "type": "string"
  //         },
  //         "message": {
  //           "type": "string"
  //         },
  //         "failedValidation": {
  //           "type": "boolean"
  //         },
  //         "results": {
  //           "type": "object",
  //           "properties": {
  //             "errors": {
  //               "type": "array",
  //               "items": {
  //                 "type": "object",
  //                 "properties": {
  //                   "code": {
  //                     "type": "string"
  //                   },
  //                   "message": {
  //                     "type": "string"
  //                   },
  //                   "path": {
  //                     "type": "array",
  //                     "items": {
  //                       "type": "string"
  //                     }
  //                   },
  //                   "desccription": {
  //                     "type": "string"
  //                   }
  //                 }
  //               }
  //             },
  //             "warnings": {
  //               "type": "array",
  //               "items": {
  //                 "type": "object",
  //                 "properties": {
  //                   "code": {
  //                     "type": "string"
  //                   },
  //                   "message": {
  //                     "type": "string"
  //                   },
  //                   "path": {
  //                     "type": "array",
  //                     "items": {
  //                       "type": "string"
  //                     }
  //                   },
  //                   "desccription": {
  //                     "type": "string"
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         },
  //         "originalResponse": {
  //           "type": "string"
  //         }
  //       }
  //     };
  //
  //     /*eslint-enable*/
  //     api.get('/V1/merchants')
  //     .set('Authorization', 'Basic ' + process.env.PASSWORD)
  //     .set('Accept', 'application/json')
  //     .set({
  //       'Authorization': 'DATA GOES HERE'
  //     })
  //     .expect('DEFAULT RESPONSE CODE HERE')
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //
  //       expect(validator.validate(res.body, schema)).to.be.true;
  //       done();
  //     });
  //   });
  //
  //   it('should respond with default error payload', function(done) {
  //     api.get('/V1/merchants')
  //     .set('Authorization', 'Basic ' + process.env.PASSWORD)
  //     .set('Accept', 'application/json')
  //     .set({
  //       'Authorization': 'DATA GOES HERE'
  //     })
  //     .expect('DEFAULT RESPONSE CODE HERE')
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //
  //       expect(res.body).to.equal(null); // non-json response or no schema
  //       done();
  //     });
  //   });
  //
  // });

});
