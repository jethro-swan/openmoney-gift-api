'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:9090'); // supertest init;
var expect = chai.expect;

require('dotenv').config();

var merchant = {};
merchant.merchantname = process.env.MERCHANTNAME + process.env.TIME;

var card = {};
card.key = process.env.CARDHOLDER_FIRSTNAME + process.env.TIME;
card.balance = 100.00;
card.points = 1000.00;
card.employeeID = 'employee Name';

describe('/merchants/{merchantname}/cards', function() {

  describe('post', function() {
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

      this.timeout(20000);

      /*eslint-enable*/
      api.post('/V1/merchants/' + merchant.merchantname + '/cards')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(card)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(card);
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

      this.timeout(20000);

      /*eslint-enable*/
      api.post('/V1/merchants/' + merchant.merchantname + '/cards')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(card)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(card);
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
  });//cards post

  describe('get', function() {
    it('order by key should respond with 200 List of cards', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items":
            {
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

      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + merchant.merchantname + '/cards')
      .query({
        order_by: 'key', offset: 0, range: 25
      })
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(card);
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

    it('order by balance should respond with 200 List of cards', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items":
            {
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

      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + merchant.merchantname + '/cards')
      .query({
        order_by: 'balance', offset: 0, range: 25
      })
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(card);
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

    it('order by points should respond with 200 List of cards', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items":
            {
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

      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + merchant.merchantname + '/cards')
      .query({
        order_by: 'points', offset: 0, range: 25
      })
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(card);
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
      api.get('/V1/merchants/' + merchant.merchantname + '1/cards')
      .query({
        order_by: 'bad_request', offset: 0, range: 25
      })
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(card);
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
