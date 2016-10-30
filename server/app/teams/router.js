//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    team = require('./team_model');

function getTeam(req, res, next) {
    team.findOne({'teamname': req.query.teamname}, function(err, team) {
        if (err) return handleError(err);
        res.json(team);
    });
}

function newTeam(req, res, next) {
    var newTeam = new team({'teamname': req.query.teamname,
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
  var del_team = team.findOne({'teamname': req.params.teamname}, function(err, rem_team) {
      if (err) return handleError(err);});
  del_team.remove().exec();
  res.send({
    status: 'Team Removed'
  });
}

function modifyTeam(req, res, next) {
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



router.get('/', getTeam);
router.post('/', newTeam);
router.post('/modify/', modifyTeam) //better handling for modifying themes
router.delete('/', deleteTeam);

module.exports = router;
