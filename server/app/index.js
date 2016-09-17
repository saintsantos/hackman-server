//This will hold express and route initialization
var express = require('express'),

    //create "app"
    app = express();

//logger
var morgan = require('morgan');
app.use(morgan('combined'))

//Initialize mongodb here
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/hackman_proto';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to dat mongo stuff");

  db.close();
});

//API endpoints
app.use('/api/user', require('app/users/router'));


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
