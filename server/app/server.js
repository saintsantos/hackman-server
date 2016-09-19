#!/usr/bin/env node


//initiate express, routes
var app = require('app/index');
//The config file
var config = require('app/util/config');

var db = require('app/util/db')

app.listen(config.express.port, function(error) {
    if (error) {
        console.error('Unable to listen for connections', error);
        process.exit(10)
    }
    console.info('express is listening on http://' +
     config.express.ip + ':' + config.express.port);
});
