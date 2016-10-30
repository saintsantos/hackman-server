//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,

    user = require('./user_model');


function getUser(req, res, next) {
    //console.log(req.query);
    user.findOne({'username': req.query.username, 'password': req.query.password}, function(err, user) {
        if (err) return handleError(err);
        res.json(user);
    });
}

function newUser(req, res, next) {
    //req is where all of your params are.
    //Get the info you need by calling req.query.<what you're looking for>
    //ex: password - req.query.password
    var newUser = new user({'username': req.query.username, 'email': req.query.email,
                            'password': req.query.password, 'first_name': req.query.first_name,
                            'last_name': req.query.last_name,
                            'jwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2hhY2ttYW4tcHJvdG8uY29tIiwic3ViIjoibWFpbHRvOnQuam9obnNvbkBzdXBlcmJhZGFzc2FuZGNvb2wuY29tIiwibmJmIjoxNDc1MjcwMzMzLCJleHAiOjE1MDY4MDYzMzMsImlhdCI6MTQ3NTI3MDMzMywianRpIjoiaWQ4Njc1MzA5IiwidHlwIjoiaHR0cHM6Ly9oYWNrbWFuLXByb3RvLmNvbS9wcm90byJ9.rRVkZW7k2Ph6i5NaM7PUyN2i0XtVOV-sYpcmwkfJ21E'});
    newUser.save(function(err) {
        if (err) return handleError(err);
        console.log("Saved user!");
    }).then(function() {
        res.send(newUser);
    })
}

function modifyUser(req, res, next) {
  //ask ed how req works, see what we can pass into it
  //may be a good idea to switch to unique IDs as this will update all
  //collections matching the given criteria

  var o_name ={username: req.query.orig_name},
  new_name = req.query.username,
  new_pass = req.query.password,
  new_jwt = req.query.jwt,
  new_email = req.query.email,
  new_first = req.query.first_name,
  new_last = req.query.last_name,
  add_role = req.query.add_r,
  del_role = req.query.del_r,
  new_role = req.query.role,
  add_skill = req.query.add_s,
  del_skill = req.query.del_s,
  new_skills = req.query.skills;

  //flow: add/remove roles and skills, then fall into third findOne and fix the rest

  if(add_role){var role_to_modify = {$addToSet: {role: req.query.role}};}
  if(del_role){var role_to_modify = {$pull: {role: req.query.role}};}
  if(add_skill){var skill_to_modify = {$addToSet: {skills: req.query.skills}};}
  if(del_skill){var skill_to_modify = {$pull: {skills: req.query.skills}};}

  if(add_role || del_role){user.findOneAndUpdate(o_name,role_to_modify,function(err,upd){
    if(err) return handleError(err);
  });}
  if(add_skill || del_skill){user.findOneAndUpdate(o_name,skill_to_modify,function(err,upd){
    if(err) return handleError(err);
  });}

  user.findOne(o_name,function(err,doc){
    if(err) return handleError(err);

    //this will stop the function from trying to modify a null "doc"
    if(doc){
      if(new_name){doc.username = req.query.username}
      if(new_pass){doc.password = req.query.password}
      if(new_jwt){doc.jwt = req.query.jwt}
      if(new_email){doc.email = req.query.email}
      if(new_first){doc.first_name = req.query.first_last}
      if(new_last){doc.last_name = req.query.last_name}
      doc.save();
    }
  });
  res.send({status: "updated!"});
}

function sayHi(req, res, next) {
    res.send({
        hi: 'hi!'
    });
}

//Just a test code for our endpoint
router.post('/login', jsonParser, getUser);
router.post('/modify', jsonParser, modifyUser);
router.post('/signup', newUser);
router.get('/hi', sayHi);

module.exports = router;
