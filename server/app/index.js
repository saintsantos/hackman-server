//This will hold express and route initialization
var express = require('express'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),

    //create "app"
    app = express();

//logger
var morgan = require('morgan');
app.use(morgan('combined'))

//db initialization
var db = require('app/util/db');

//cors
app.use(require('app/util/cors'));

//config
var config = require('app/util/config');

var options = {
    key: 'add key here',
    cert: 'add key here'
};


//API endpoints
app.use('/api/user', require('app/users/router'));
app.use('/api/teams', require('app/teams/router'));
app.use('/api/admin', require('app/admin/router'));
app.use('/api/alerts', require('app/alerts/router'));
app.use('/api/sponsors', require('app/sponsors/router'));
app.use('/api/prizes', require('app/prizes/router'));


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errorState: 'error',
        message: err.message,
        error: err
    });
});

//https.createServer(options, app).listen(3000);
http.createServer(app).listen(3000);
//module.exports = app;
