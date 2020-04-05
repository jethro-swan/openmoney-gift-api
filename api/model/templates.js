
//database testing
var DATABASE_TYPE = 'pouchdb';

if(DATABASE_TYPE == 'couchbase') {

} else if(DATABASE_TYPE == 'pouchdb'){
  var PouchDB = require('pouchdb');
      PouchDB.plugin(require('pouchdb-find'));
  var db = new PouchDB('./database');
  // PouchDB.debug.enable('pouchdb:find')

  exports.findByTemplateId = function(templateId, callback){
    db.get(templateId, {attachments: true}).then(function(card){
      callback(null, card);
    }).catch(function(err){
      callback(err, null);
    })
  };

  exports.listTemplatesById = function(merchantname, offset, range, callback){
    db.allDocs({
      include_docs: true,
      attachments: true,
      startkey: 'templates~' + merchantname + '~',
      endkey: 'templates~' + merchantname + '~' + '\uffff',
      skip: offset,
      limit: range
    }).then(function (result) {
      callback(null, result);
    }).catch(function (err) {
      callback(err);
    });
  };//listTemplates

  exports.insertTemplate = function(template, callback){
    db.put(template).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err, null);
    });
  };

  exports.updateTemplate = function(template, callback){
    db.put(template).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err);
    })
  };

  exports.deleteTemplate = function(template, callback){
    db.remove(template).then(function(response){
      callback(null, response);
    }).catch(function(err){
      callback(err);
    });
  };
}
