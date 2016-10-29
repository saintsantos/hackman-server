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
  //how this mess works: when doing an if statement involving items in req.querys
  //they will take the if path only if they contain something, regardless of value
  //which is wonderful and terrible at the same time as that means unless otherwise
  //noted, these messy if statements will do

  if(new_name){user.findOneAndUpdate(o_name,{username: req.query.username},function(err,upd){
    if(err) return handleError(err);
  });}
  if(new_pass){user.findOneAndUpdate(o_name,{password: req.query.password},function(err,upd){
    if(err) return handleError(err);
  });}
  if(new_jwt){user.findOneAndUpdate(o_name,{jwt: req.query.jwt},function(err,upd){
    if(err) return handleError(err);
  });}
  if(new_email){user.findOneAndUpdate(o_name,{email: req.query.email},function(err,upd){
    if(err) return handleError(err);
  });}
  if(new_first){user.findOneAndUpdate(o_name,{first_name: req.query.first_name},function(err,upd){
    if(err) return handleError(err);
  });}
  if(new_last){user.findOneAndUpdate(o_name,{last_name: req.query.last_name},function(err,upd){
    if(err) return handleError(err);
  });}
  if(add_role){user.findOneAndUpdate(o_name,{$addToSet: {role: req.query.role}},function(err,upd){
    if(err) return handleError(err);
  });}
  if(del_role){user.findOneAndUpdate(o_name,{$pull: {role: req.query.role}},function(err,upd){
    if(err) return handleError(err);
  });}
  if(add_skill){user.findOneAndUpdate(o_name,{$addToSet: {skills: req.query.skills}},function(err,upd){
    if(err) return handleError(err);
  });}
  if(del_skill){user.findOneAndUpdate(o_name,{$pull: {skills: req.query.skills}},function(err,upd){
    if(err) return handleError(err);
  });}
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
