exports.respond = function (result, res){
  console.info(result);
  if(typeof result.status != 'undefined'){
    res.statusCode = result.status;
  }
  var examples = {};
  examples['application/json'] = result;
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
};
