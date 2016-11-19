//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),
    prizes = require('./prizes_model');

//Need to add event info here to filter prizes

function getPrizes(req, res, next) {
    //Need to filter this for specific events
    prizes .find(function(err, teams) {
        res.send(teams);
    });
}


//Get all of the prizes for the event.
router.get('/prize/', getPrizes);
