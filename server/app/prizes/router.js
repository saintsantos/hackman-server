//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),
    prizes = require('./prizes_model');


function getPrizes(req, res, next) {
    prizes.find(function(err, teams) {
        res.send(teams);
    });
}

router.get('/', getPrizes);


module.exports = router;
