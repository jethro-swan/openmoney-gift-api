'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:9090'); // supertest init;
var expect = chai.expect;

require('dotenv').load();

var request = {};
request.merchantname = process.env.MERCHANTNAME + process.env.TIME;


describe('/merchants/{merchantname}', function() {
  describe('get', function() {
    it('should respond with 200 Merchant', function(done) {
      /*eslint-disable*/
      var schema = {
        "allOf": [
          {
            "type": "object",
            "required": [
              "_id"
            ],
            "properties": {
              "_id": {
                "type": "string",
                "pattern": "^[A-Za-z0-9_.~-]+$"
              }
            }
          },
          {
            "type": "object",
            "required": [
              "merchantname"
            ],
            "properties": {
              "merchantname": {
                "type": "string",
                "maxLength": 255,
                "pattern": "^[A-Za-z0-9_.-]+$"
              },
              "email": {
                "type": "string",
                "format": "email",
                "maxLength": 255,
                "pattern": "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$"
              },
              "email_notifications": {
                "type": "boolean"
              },
              "created": {
                "type": "integer",
                "description": "timestamp in milliseconds since epoch"
              },
              "created_by": {
                "type": "string",
                "description": "merchant of who created object"
              },
              "modifications": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "modified": {
                      "type": "integer",
                      "description": "timestamp in milliseconds since epoch"
                    },
                    "modified_by": {
                      "type": "string",
                      "description": "merchant who made modification"
                    },
                    "modification": {
                      "type": "string",
                      "description": "human readable description of modification"
                    }
                  }
                }
              }
            }
          }
        ]
      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + request.merchantname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .set(request)
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

    // it('should respond with 200 Merchant', function(done) {
    //   api.get('/V1/merchant/{merchantname PARAM GOES HERE}')
    //   .set('Authorization', 'Basic ' + process.env.PASSWORD)
    //   .set('Accept', 'application/json')
    //   .set({
    //     'Authorization': 'DATA GOES HERE'
    //   })
    //   .expect(200)
    //   .end(function(err, res) {
    //     if (err) return done(err);
    //
    //     expect(res.body).to.equal(null); // non-json response or no schema
    //     done();
    //   });
    // });
    //
    it('should respond with default error payload', function(done) {
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

      //request.merchantname = request.merchantname + 'modified'

      /*eslint-enable*/
      api.get('/V1/merchants/' + request.merchantname + 'modified')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .set(request)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });
    //
    // it('should respond with default error payload', function(done) {
    //   api.get('/V1/merchant/{merchantname PARAM GOES HERE}')
    //   .set('Authorization', 'Basic ' + process.env.PASSWORD)
    //   .set('Accept', 'application/json')
    //   .set({
    //     'Authorization': 'DATA GOES HERE'
    //   })
    //   .expect('DEFAULT RESPONSE CODE HERE')
    //   .end(function(err, res) {
    //     if (err) return done(err);
    //
    //     expect(res.body).to.equal(null); // non-json response or no schema
    //     done();
    //   });
    // });

  });

  describe('put', function() {
    it('should respond with 200 merchants', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "ok"
        ],
        "properties": {
          "ok": {
            "type": "boolean"
          }
        }
      };

      request.email = process.env.EMAIL;

      /*eslint-enable*/
      api.put('/V1/merchants/' + request.merchantname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
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

    it('password change should respond with 200 merchants', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "ok"
        ],
        "properties": {
          "ok": {
            "type": "boolean"
          }
        }
      };

      this.timeout(10000);
      request.password = process.env.PASSWORD + '1';

      /*eslint-enable*/
      api.put('/V1/merchants/' + request.merchantname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
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

        if(results) {
          process.env.BASIC = new Buffer(request.merchantname + ':' + request.password).toString('base64');
        }
        done();
      });
    });

    it('password change back should respond with 200 merchants', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "ok"
        ],
        "properties": {
          "ok": {
            "type": "boolean"
          }
        }
      };

      this.timeout(10000);
      request.password = process.env.PASSWORD;

      /*eslint-enable*/
      api.put('/V1/merchants/' + request.merchantname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
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

        if(results) {
          process.env.BASIC = new Buffer(request.merchantname + ':' + request.password).toString('base64');
        }
        done();
      });
    });

    // it('should respond with 200 merchants', function(done) {
    //   api.put('/V1/merchant/{merchantname PARAM GOES HERE}')
    //   .set('Authorization', 'Basic ' + process.env.PASSWORD)
    //   .set('Accept', 'application/json')
    //   .set({
    //     'Authorization': 'DATA GOES HERE'
    //   })
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

    it('should respond with default error payload', function(done) {
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


      var error_request = JSON.parse(JSON.stringify(request));
      error_request.merchantname = 'modified';
      delete error_request.email;

      /*eslint-enable*/
      api.put('/V1/merchants/' + request.merchantname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(error_request)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(error_request);
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
  //
  //   it('should respond with default error payload', function(done) {
  //     api.put('/V1/merchant/{merchantname PARAM GOES HERE}')
  //     .set('Authorization', 'Basic ' + process.env.PASSWORD)
  //     .set('Accept', 'application/json')
  //     .set({
  //       'Authorization': 'DATA GOES HERE'
  //     })
  //     .send({
  //       merchant_request: 'DATA GOES HERE'
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
  });
  //
  describe('delete', function() {
    it('should respond with 200 merchant', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "ok"
        ],
        "properties": {
          "ok": {
            "type": "boolean"
          }
        }
      };

      /*eslint-enable*/
      api.del('/V1/merchants/' + request.merchantname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {

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
  //
  //   it('should respond with 200 merchant', function(done) {
  //     api.del('/V1/merchant/{merchantname PARAM GOES HERE}')
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
    it('should respond with default error payload', function(done) {
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
      api.del('/V1/merchants/' + request.merchantname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(403)
      .end(function(err, res) {
        if (err) {
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
  //
  //   it('should respond with default error payload', function(done) {
  //     api.del('/V1/merchant/{merchantname PARAM GOES HERE}')
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
  });

});
