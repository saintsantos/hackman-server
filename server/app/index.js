//This will hold express and route initialization
var express = require('express'),

    //create "app"
    app = express();

//logger
var morgan = require('morgan');
app.use(morgan('combined'))

//db initialization
var db = require('app/util/db');

//cors
app.use(require('app/util/cors'));


//API endpoints
app.use('/api/user', require('app/users/router'));
app.use('/api/teams', require('app/teams/router'));
app.use('/api/admin', require('app/admin/router'));


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

module.exports = app;
