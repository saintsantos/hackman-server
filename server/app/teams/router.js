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

  var new_name = { teamname: req.query.teamname}
  , new_desc = {proj_desc: req.query.proj_desc}
  , adding_member = req.query.add,
    del_member = req.query.del,
    o_name = {teamname: req.query.original_name};
  //how this mess works: when doing an if statement involving items in req.querys
  //they will take the if path only if they contain something, regardless of value
  //which is wonderful and terrible at the same time as that means unless otherwise
  //noted, these messy if statements will do

  //BUG: if findOne doesn't find a document, it'll still try to set these things
  //replace this one findOne with 4 findOneAndUpdates to fix
  team.findOne(o_name,function(err,doc){
    if (err) return handleError(err);
      //time to set up the fountain of if's
    if(new_name){doc.teamname = req.query.teamname;}
    if(new_desc){doc.proj_desc = req.query.proj_desc;}
    //yes, I know we don't nest a findOne inside a findeOne, but this needs to go out now. will fix later
    if(adding_member){team.findOneAndUpdate(o_name, {$addToSet: {teammates: req.query.member}}, function (err, tank) {
      if (err) return handleError(err);
      });}
    if(del_member){team.findOneAndUpdate(o_name, {$pull: {teammates: req.query.member}}, function (err, tank) {
      if (err) return handleError(err);
      });}
    doc.save();
    res.send(doc);
  });

}



router.get('/', getTeam);
router.post('/', newTeam);
router.post('/modify/', modifyTeam) //better handling for modifying themes
router.delete('/', deleteTeam);

module.exports = router;
