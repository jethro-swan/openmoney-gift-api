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

var employee = {};
employee.name = process.env.EMPLOYEE_NAME;
employee.code = process.env.EMPLOYEE_CODE;

describe('/merchants/{merchantname}/employees', function() {

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



      /*eslint-enable*/
      api.post('/V1/merchants/' + merchant.merchantname + '/employees')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(employee)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(employee);
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
      });//end
    });//it should

    // it('should respond with 200 OK', function(done) {
    //   api.post('/V1/merchant/{merchantname PARAM GOES HERE}/employee')
    //   .set('Authorization', 'Basic ' + process.env.PASSWORD)
    //   .set('Accept', 'application/json')
    //   .set({
    //     'Authorization': 'DATA GOES HERE'
    //   })
    //   .send({
    //     employee_name: 'DATA GOES HERE'
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

      /*eslint-enable*/
      api.post('/V1/merchants/' +  merchant.merchantname + '/employees')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .send(employee)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(employee);
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

    // it('should respond with default error payload', function(done) {
    //   api.post('/V1/merchant/{merchantname PARAM GOES HERE}/employee')
    //   .set('Authorization', 'Basic ' + process.env.PASSWORD)
    //   .set('Accept', 'application/json')
    //   .set({
    //     'Authorization': 'DATA GOES HERE'
    //   })
    //   .send({
    //     employee_name: 'DATA GOES HERE'
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

  describe('get', function() {
    it('should respond with 200 List of employee', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items":
            {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "is_merchant_owner": {
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
      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + merchant.merchantname + '/employees')
      .query({
order_by: 'name',offset: 0,range: 25
      })
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(employee);
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

    it('should respond with 200 List of employee', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items":
            {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "is_merchant_owner": {
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
      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + merchant.merchantname + '/employees')
      .query({
order_by: 'code', offset: 0, range: 25
      })
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.info('request:')
          console.info(employee);
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
      });//api get
    });//it should

//     it('should respond with 200 List of employee', function(done) {
//       api.get('/V1/merchant/{merchantname PARAM GOES HERE}/employee')
//       .query({
// order_by: 'DATA GOES HERE',offset: 'DATA GOES HERE',range: 'DATA GOES HERE'
//       })
//       .set('Authorization', 'Basic ' + process.env.PASSWORD)
//       .set('Accept', 'application/json')
//       .set({
//         'Authorization': 'DATA GOES HERE'
//       })
//       .expect(200)
//       .end(function(err, res) {
//         if (err) return done(err);
//
//         expect(res.body).to.equal(null); // non-json response or no schema
//         done();
//       });
//     });

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
      api.get('/V1/merchants/' + merchant.merchantname + '1' + '/employees')
      .query({
order_by: 'name',offset: 0,range: 10
      })
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

//     it('should respond with default error payload', function(done) {
//       api.get('/V1/merchant/{merchantname PARAM GOES HERE}/employee')
//       .query({
// order_by: 'DATA GOES HERE',offset: 'DATA GOES HERE',range: 'DATA GOES HERE'
//       })
//       .set('Authorization', 'Basic ' + process.env.PASSWORD)
//       .set('Accept', 'application/json')
//       .set({
//         'Authorization': 'DATA GOES HERE'
//       })
//       .expect('DEFAULT RESPONSE CODE HERE')
//       .end(function(err, res) {
//         if (err) return done(err);
//
//         expect(res.body).to.equal(null); // non-json response or no schema
//         done();
//       });
//     });

  });


});
