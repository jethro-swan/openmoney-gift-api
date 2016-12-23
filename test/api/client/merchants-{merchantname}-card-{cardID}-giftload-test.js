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

var card = {};
card.key = process.env.CARDHOLDER_FIRSTNAME + process.env.TIME;
card.employeeID = 'employee Name';

var giftload = {};
giftload.amount = Math.floor(Math.random() * 999) + 1;

describe('/merchants/{merchantname}/cards/{cardID}/giftload', function() {
  describe('post', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
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
          }
        }
      };

      /*eslint-enable*/
      api.post('/V1/merchants/' + merchant.merchantname + '/cards/' + card.key + '/giftload')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(giftload)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(giftload);
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
      api.post('/V1/merchants/' + merchant.merchantname + '/cards/' + card.key + '/giftload')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send({ amount: 0 , employeeID: card.employeeID })
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(giftload);
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
