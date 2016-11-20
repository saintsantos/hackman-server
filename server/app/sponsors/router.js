/express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),
    sponsors = require('./sponsor_model');


function getSponsors(req, res, next) {
    //filter for specific events
    sponsors.find(function(err, teams) {
        res.send(teams);
    });

}

//Get all of the sponsors for an ebent
router.get('/sponsors/', getSponsors);

module.exports = router;
