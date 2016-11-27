//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),
    async = require('async'),

    team = require('./team_model'),
    users = require('app/users/user_model');

function getTeamName(req, res, next) {
    team.findOne({'teamname': req.params.name}, function(err, team) {
        if (err) return handleError(err);
        res.send(team);
    });
}

function newTeam(req, res, next) {
    //only needs a project description to be sent via request for the teams to be formed.
    //Choosing not to do this from the frontend, do it on the backend instead.
    console.log("received request");
    console.log(req.params)
    console.log(req.query)
    var teamName = req.params.name;
    users.findOne({'jwt': req.get('token')}, function(err, user) {
        if (err) return handleError(err);
        if (!user) {
            res.status(404).send("No user found");
        } else {
            console.log(req.params);
            var newTeam = new team({'teamname': teamName,
                                    'created_by': user._id,
                                    'proj_desc': "This is a Project",
                                    'status': "This is a status",
                                    'location': "At a location",
                                    'teammates': [user.username]} );
            newTeam.save( function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("Saved Team!");
            }).then(function() {
                res.send(newTeam);
            });
        }
    });

}

function deleteTeam(req, res, next) {
    team.findByIdAndRemove({_id: req.params.id}, function(err, removedTeam) {
        if (err) return handleError(err);
    });
}

function modifyTeam(req, res, next) {
    team.findByIdAndUpdate({_id: req.params.id}, { $set: {'teamname': req.query.teamname, 'proj_desc': req.query.proj_desc, 'status': req.query.status, 'location': req.query.location}}, function(err, team) {
        res.status(200).send("Updated!");
    });
}


function getAllTeams(req, res, next) {
    var result = [];
    team.find(function(err, teams) {
        teams.forEach(function(s) {
            var team = {};
            team.teamname = s;
            team.profiles = [];
            s.teammates.forEach(function(teammate) {
                var teammateProfile = {};
                user = users.findOne({'username': teammate}, function(err, user) {
                    if (err) return handleError(err);
                    if (!user) {
                        console.log("User not found");
                    } else {
                        //teammateProfile.username = teammate.username;
                        //teammateProfile.email = teammate.email;
                        //console.log(user.username);
                        //teammateProfile.username = user.username;
                        team.profiles.push(user);
                    }
                });
                //console.log(user);
                //team.profiles.push(teammateProfile);
            });
            //console.log(team);
            //console.log(team);
            result.push(team);
        });
        res.status(200).send(result);
    });
}

function getAllTeamsNew(req, res, next) {
    var result = [];
    team.find(function(err, teams) {
        var promises = teams.map(function(currTeam){
          return new Promise(function(resolve,reject){
            //currTeam contains the team object we are currently working on (duh)
            var teamInfo = {};
            teamInfo.teamname = currTeam.teamname;
            teamInfo.profiles = [];
            //we need a second promise set up here
            //also, we need to manually pull all the team info manually for the new json unless yu have a better method
            result.push(teamInfo);
          });
        });
        Promise.all(promises);
        res.status(200).send(result);
    });
}

function addTeammate(req, res, next) {
    console.log(req.params);
    team.findByIdAndUpdate({'_id': req.params.id}, {$addToSet: {'teammates': req.params.username}}, function(err, team) {
        res.send(team);
    });
}

function removeTeammate(req, res, next) {
    console.log(req.params);
    team.findByIdAndUpdate({'_id': req.params.id}, {$pull: {'teammates': req.params.username}}, function(err, team) {
        res.send(team);
    });
}



router.get('/', getAllTeamsNew);
router.get('/:id', getTeamName);
router.post('/:name', newTeam); //create a new team with this name
router.put('/:id/modify/', modifyTeam); //better handling for modifying teams
router.post('/:id/modify/:username', addTeammate); //handle adding teammates
router.delete('/:id/modify/:username', removeTeammate);
router.delete('/:id', deleteTeam);

module.exports = router;
