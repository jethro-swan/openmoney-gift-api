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

describe('/merchants/{merchantname}/cards/{cardID}', function() {

  describe('delete', function() {
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
      api.del('/V1/merchants/' + merchant.merchantname + '/cards/' + card.key)
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

    it('should delete respond with 200 OK', function(done) {
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

      api.get('/V1/merchants/' + merchant.merchantname + '/cards/' + card.key + '/balance')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if(err){
          console.error('error result:')
          console.error(err);
          return done(err);
        }

        var giftredeem = {};
        giftredeem.amount = res.body.balance;
        giftredeem.points = res.body.points;
        giftredeem.employeeID = 'employee Name';
        api.post('/V1/merchants/' + merchant.merchantname + '/cards/' + card.key + '/giftredeem')
        .set('Authorization', 'Basic ' + process.env.BASIC)
        .set('Accept', 'application/json')
        .send(giftredeem)
        .expect(200)
        .end(function(err, res) {
          if(err){
            console.error('error result:')
            console.error(err);
            return done(err);
          }
          api.del('/V1/merchants/' + merchant.merchantname + '/cards/' + card.key)
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
          });//del api
        });//redeem api
      });//balance api
    });//it should delete
  });

});
