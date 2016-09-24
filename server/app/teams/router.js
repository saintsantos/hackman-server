//express stuff
var express = require('express'),
    router = espress.Router(),
    app = express(),

    team = require('./team_model');

function getTeam(req, res, next) {

}

function newTeam(req, res, next) {

}

function deleteTeam(req, res, next) {

}

function modifyTeam(req, res, next) {

}


router.get('/', getTeam);
router.post('/:name', newTeam);
router.delete('/:name', deleteTeam);

module.exports = router;
