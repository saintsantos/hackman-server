//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    team = require('./team_model');

function getTeam(req, res, next) {
  team.findOne({'teamname': req.query.teamname, 'description': req.query.descipt, 'members': req.query.members}, function(err, team) {
      if (err) return handleError(err);
      res.json(team);
  })
}

function newTeam(req, res, next) {
  var nTeam = new team({'teamname': req.query.teamname, 'descript': req.query.descript,
                          'members': req.query.members});
  nTeam.save(function(err) {
      if (err) return handleError(err);
      console.log("Saved team");
  }).then(function() {
      res.send(nTeam);
  })
}

function deleteTeam(req, res, next) {
  team.remove({ teamname: req.query.teamname, description: req.query.descript,
               members: req.query.members }, function (err) {
  if (err) return handleError(err);
  else{console.log("Deleted team.");};
});

}

function modifyTeam(req, res, next) {
  //ask ed how req works, see what we can pass into it
  //may be a good idea to switch to unique IDs as this will update all
  //collections matching the given criteria

  var new_name = { teamname: req.query.new_teamname }
  , new_desc = { description: req.query.new_descript }
  , adding_member = req.query.add,
    del_member = req.query.del;
  //make calls to add/remove members here
  //look into ternary operators, they look cool

  res.update(new_name, new_desc, function (err, numUpdated){
    if (err) return handleError(err);
    else{console.log("Saved changes.");};
  });

  if (adding_member){
    addMember(req,res,next);
  }
  else if (del_member){
    deleteMember(req,res,next);
  }
}

function addMember(req, res, next) {
  //this stays empty until I figure a way to crossreference collections
}

function deleteMember(req, res, next) {
  //this stays empty until I figure a way to crossreference collections
}



router.get('/findTeam', getTeam);
router.post('/buildTeam', newTeam);
router.post('/updateTeam', newTeam);
router.delete('/removeTeam', deleteTeam);

module.exports = router;
