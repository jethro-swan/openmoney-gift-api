'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:9090'); // supertest init;
var expect = chai.expect;

require('dotenv').load();

var merchant = {};
merchant.merchantname = process.env.MERCHANTNAME + process.env.TIME;

var cardholder = {};
cardholder.firstname = process.env.CARDHOLDER_FIRSTNAME;
cardholder.lastname = process.env.CARDHOLDER_LASTNAME;
cardholder.address1 = process.env.CARDHOLDER_ADDRESS1;
cardholder.address2 = process.env.CARDHOLDER_ADDRESS2;
cardholder.phone = process.env.CARDHOLDER_PHONE;
cardholder.email = process.env.CARDHOLDER_EMAIL;


describe('/merchants/{merchantname}/cardholders/{cardholder_firstname}/{cardholder_lastname}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema =
          {
            "type": "object",
            "required": [
              "firstname",
              "lastname"
            ],
            "properties": {
              "firstname": {
                "type": "string",
                "maxLength": 255,
                "pattern": "^[A-Za-z0-9_.-]+$"
              },
              "lastname": {
                "type": "string",
                "maxLength": 255,
                "pattern": "^[A-Za-z0-9_.-]*$"
              },
              "address1": {
                "type": "string",
                "maxLength": 255,
                "pattern": "^[A-Za-z0-9_.-]*$"
              },
              "address2": {
                "type": "string",
                "maxLength": 255,
                "pattern": "^[A-Za-z0-9_.-]*$"
              },
              "phone": {
                "type": "string",
                "maxLength": 255,
                "pattern": "^[A-Za-z0-9_.-]*$"
              },
              "email": {
                "type": "string",
                "maxLength": 255,
                "pattern": "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$"
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
              },
              "cards": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "key": {
                      "type": "string",
                      "maxLength": 800,
                      "pattern": "^[A-Za-z0-9_-]+$"
                    },
                    "balance": {
                      "type": "number"
                    },
                    "points": {
                      "type": "number"
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
                    },
                    "merchantname": {
                      "type": "string",
                      "maxLength": 255,
                      "pattern": "^[A-Za-z0-9_-]+$"
                    }
                  }
                }
              }
            }

      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + merchant.merchantname + '/cardholders/' + cardholder.firstname + '/' + cardholder.lastname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(cardholder);
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
      api.get('/V1/merchants/' + merchant.merchantname + '/cardholders/' + cardholder.firstname + '/' + cardholder.lastname + '1')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(404)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(cardholder);
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
  });

  describe('put', function() {
    it('should respond with 200 OK', function(done) {
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

      cardholder.email = 'change@example.com';

      /*eslint-enable*/
      api.put('/V1/merchants/' + merchant.merchantname + '/cardholders/' + cardholder.firstname + '/' + cardholder.lastname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(cardholder)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(cardholder);
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

    it('firstname change should respond with 200 OK', function(done) {
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

      cardholder.firstname = 'customerChange';

      /*eslint-enable*/
      api.put('/V1/merchants/' + merchant.merchantname + '/cardholders/' + process.env.CARDHOLDER_FIRSTNAME + '/' + cardholder.lastname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(cardholder)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(cardholder);
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


    it('firstname change back should respond with 200 OK', function(done) {
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

      cardholder.firstname = process.env.CARDHOLDER_FIRSTNAME;

      /*eslint-enable*/
      api.put('/V1/merchants/' + merchant.merchantname + '/cardholders/customerChange/' + cardholder.lastname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(cardholder)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(cardholder);
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
      api.put('/V1/merchants/' + merchant.merchantname + '/cardholders/' + cardholder.firstname + '/' + cardholder.lastname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(cardholder)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(cardholder);
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

  });

  describe('delete', function() {
    it('should respond with 200 Delete success', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "id",
          "ok"
        ],
        "properties": {
          "id": {
            "type": "string"
          },
          "ok": {
            "type": "boolean"
          }
        }
      };

      /*eslint-enable*/
      api.del('/V1/merchants/' + merchant.merchantname + '/cardholders/' + cardholder.firstname + '/' + cardholder.lastname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(cardholder);
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
      api.del('/V1/merchants/' + merchant.merchantname + '/cardholders/' + cardholder.firstname + '/' + cardholder.lastname)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(404)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(cardholder);
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
  });
});
