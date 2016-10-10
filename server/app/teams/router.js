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
  team.remove({ teamname: req.params.name, description: req.query.descript,
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



router.get('/:name', getTeam);
router.post('/:name', newTeam);
router.post('/modify/:name', modifyTeam) //better handling for modifying themes
router.delete('/:name', deleteTeam);

module.exports = router;
