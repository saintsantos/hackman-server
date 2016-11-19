//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

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
    console.log("received request");
    console.log(req.params)
    console.log(req.query)
    var teamName = req.params.name;
    users.findOne({'jwt': req.get('token')}, function(err, user) {
        if (err) return handleError(err);
        if (!user) {
            res.send("No user found");
        } else {
            console.log(req.params);
            var newTeam = new team({'teamname': teamName,
                                    'created_by': user._id,
                                    'proj_desc': req.query.proj_desc,
                                    'status': req.query.status,
                                    'location': req.query.location,
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
  var del_team = team.findOne({'_id': req.params.teamname}, function(err, rem_team) {
      if (err) return handleError(err);});
  del_team.remove().exec();
  res.send({
    status: 'Team Removed'
  });
}

function modifyTeamOld(req, res, next) {
  //ask ed how req works, see what we can pass into it
  //may be a good idea to switch to unique IDs as this will update all
  //collections matching the given criteria

  var new_name = req.query.teamname
  , new_desc = req.query.proj_desc
  , adding_member = req.query.add
  , del_member = req.query.del
  , o_name = {teamname: req.query.original_name};


  //flow: checks to see if we're adding or removing a member, sets up the appropriate
  // JSON object and hands it off to findOneAndUpdate

  if(adding_member){var member_to_tweak = {$addToSet: {teammates: req.query.member}};}
  if(del_member){var member_to_tweak = {$pull: {teammates: req.query.member}};}

  if(adding_member || del_member){team.findOneAndUpdate(o_name,member_to_tweak,function(err,upd){
    if(err) return handleError(err);
  });}

  //takes care of the not teammate based data
  //eventually, I'd like to learn how to edit document arrays in findOne so I can
  //further reduce database calls down to one

  team.findOne(o_name,function(err,doc){
    if(err) return handleError(err);

    //this will stop the function from trying to modify a null "doc"
    if(doc){
      if(new_name){doc.teamname = req.query.teamname}
      if(new_desc){doc.proj_desc = req.query.proj_desc}
      doc.save();
    }
  });

  /*if(new_desc){team.findOneAndUpdate(o_name,{proj_desc: req.query.proj_desc},function(err,upd){
    if(err) return handleError(err);
  });}
  if(new_name){team.findOneAndUpdate(o_name,{teamname: req.query.teamname},function(err,upd){
    if(err) return handleError(err);
  });}*/
  res.send({status: "updated!"});
}

function modifyTeam(req, res, next) {
    team.findByIdAndUpdate({_id: req.params.id}, { $set: {'teamname': req.query.teamname, 'proj_desc': req.query.proj_desc, 'status': req.query.status, 'location': req.query.location}}, function(err, team) {
        res.send("Updated!");
    });
}


function getAllTeams(req, res, next) {
    team.find(function(err, teams) {
        res.send(teams);
    });
}

function addTeammate(req, res, next) {
    team.findOne({'_id': req.params.id}, function(err, team) {
        if (err) return handleError(err);
        if (!team) {
            res.send("error. no team found");
        }
        res.send(team);
    })


    console.log(req.params.name);
}

function removeTeammate(req, res, next) {
    console.log(req.params.username);
}



router.get('/', getAllTeams);
router.get('/:id', getTeamName);
router.post('/:name', newTeam); //create a new team with this name
router.put('/:id/modify/', modifyTeam); //better handling for modifying teams
router.post('/:id/modify/:username', addTeammate); //handle adding teammates
router.delete('/:id/modify/:username', removeTeammate);
router.delete('/:id', deleteTeam);

module.exports = router;
