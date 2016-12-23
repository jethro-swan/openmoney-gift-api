'use strict';
var fs = require('fs');

require('dotenv').load();

function copyData(savPath) {
    fs.readFile(savPath, 'utf8', function (err, data) {
            if (err) throw err;
            var time = new Date().getTime()
            //var merchanname = data.match(/MERCHANTNAME=(.*)\n/)[1];
            var merchanname = process.env.MERCHANTNAME;
            //var password = data.match(/PASSWORD=(.*)\n/)[1];
            var password = process.env.PASSWORD;

            data = data.replace(/TIME=\d*/g, 'TIME=' + time);
            data = data.replace(/BASIC=.*/, 'BASIC=' + new Buffer(merchanname + time + ':' + password).toString("base64"));
            console.log(data);
            //Do your processing, MD5, send a satellite to the moon, etc.
            fs.writeFile (savPath, data, function(err) {
                if (err) throw err;

                fs.readFile(savPath, 'utf8', function (err, data) {
                  console.log(data);
                });
                //console.log('finished')
            });
        });
}

copyData('.env');
