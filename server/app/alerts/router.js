//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),
    alerts = require('./alerts_model');


function getAlerts(req, res, next) {
    //Need to filter this for specific events
    alerts.find(function(err, teams) {
        res.send(alerts);
    });
}


//Get all of the prizes for the event.
router.get('/prize/', getAlerts);
module.exports = router;
