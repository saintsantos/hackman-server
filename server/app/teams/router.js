//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    team = require('./team_model');

function getTeam(req, res, next) {
    team.findOne({'teamname': req.params.name}, function(err, team) {
        if (err) return handleError(err);
        res.json(team);
    });
}

function newTeam(req, res, next) {
    var newTeam = new team({'teamname': req.params.name,
                            'created_by': req.query.created_by,
                            'proj_desc': req.query.proj_desc });
    newTeam.save(function(err) {
        if (err) return handleError(err);
        console.log("Saved Team!");
    }).then(function() {
        res.send(newTeam);
    });

}

function deleteTeam(req, res, next) {

}

function modifyTeam(req, res, next) {

}


router.get('/:name', getTeam);
router.post('/:name', newTeam);
router.delete('/:name', deleteTeam);

module.exports = router;
