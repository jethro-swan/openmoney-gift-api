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

var employee = {};
employee.name = process.env.EMPLOYEE_NAME;
employee.code = process.env.EMPLOYEE_CODE;

describe('/merchants/{merchantname}/employees/{employeeID}', function() {
  describe('get', function() {
    it('should respond with 200 OK', function(done) {
      /*eslint-disable*/
      var schema =
          {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "code": {
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

      };

      /*eslint-enable*/
      api.get('/V1/merchants/' + merchant.merchantname + '/employees/' + employee.name)
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

    // it('should respond with 200 OK', function(done) {
    //   api.get('/V1/merchant/{merchantname PARAM GOES HERE}/employees/{employeeID PARAM GOES HERE}')
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
      api.get('/V1/merchants/' + merchant.merchantname + '/employees/' + 'not_found')
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

    // it('should respond with default error payload', function(done) {
    //   api.get('/V1/merchant/{merchantname PARAM GOES HERE}/employees/{employeeID PARAM GOES HERE}')
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
    it('should respond with 200 OK', function(done) {
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

      employee.name = 'namechange';
      employee.code = '4321';

      /*eslint-enable*/
      api.put('/V1/merchants/' + merchant.merchantname + '/employees/' + process.env.EMPLOYEE_NAME)
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
      });
    });

    it('should change back respond with 200 OK', function(done) {
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

      employee.name = process.env.EMPLOYEE_NAME;
      employee.code = process.env.EMPLOYEE_CODE;

      /*eslint-enable*/
      api.put('/V1/merchants/' + merchant.merchantname + '/employees/' + 'namechange')
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
      });
    });

    // it('should respond with 200 OK', function(done) {
    //   api.put('/V1/merchant/{merchantname PARAM GOES HERE}/employees/{employeeID PARAM GOES HERE}')
    //   .set('Authorization', 'Basic ' + process.env.PASSWORD)
    //   .set('Accept', 'application/json')
    //   .set({
    //     'Authorization': 'DATA GOES HERE'
    //   })
    //   .send({
    //     employee: 'DATA GOES HERE'
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
      api.put('/V1/merchants/' + merchant.merchantname + '/employees/' + employee.name)
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
    //   api.put('/V1/merchant/{merchantname PARAM GOES HERE}/employees/{employeeID PARAM GOES HERE}')
    //   .set('Authorization', 'Basic ' + process.env.PASSWORD)
    //   .set('Accept', 'application/json')
    //   .set({
    //     'Authorization': 'DATA GOES HERE'
    //   })
    //   .send({
    //     employee: 'DATA GOES HERE'
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
      api.del('/V1/merchants/' + merchant.merchantname + '/employees/' + employee.name)
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

    // it('should respond with 200 Delete success', function(done) {
    //   api.del('/V1/merchant/{merchantname PARAM GOES HERE}/employees/{employeeID PARAM GOES HERE}')
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
      api.del('/V1/merchants/' + merchant.merchantname + '/employees/' + employee.name)
      .set('Authorization', 'Basic ' + process.env.BASIC)
      .set('Accept', 'application/json')
      .expect(404)
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
    //   api.del('/V1/merchant/{merchantname PARAM GOES HERE}/employees/{employeeID PARAM GOES HERE}')
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

});
