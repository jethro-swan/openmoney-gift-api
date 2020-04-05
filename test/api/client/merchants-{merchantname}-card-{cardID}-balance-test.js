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

describe('/merchants/{merchantname}/card/{cardID}/balance', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "required": [
          "balance"
        ],
        "properties": {
          "balance": {
            "type": "number",
            "minimum": 0
          }
        }
      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + merchant.merchantname + '/cards/' + card.key + '/balance')
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
      api.get('/V1/merchants/' + merchant.merchantname + '/cards/' + card.key + '1/balance')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(404)
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
