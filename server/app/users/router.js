//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),

    Users = require('./user_model');


function getUser(req, res, next) {
    //console.log(req.query);
    //Don't have to handle an improper login for our application. Aith0 let's us do this properly
    jwt = req.get('token');
    email = req.query.email;
    username = req.query.username;
    console.log(req.query);
    Users.findOne({'username': req.query.username, 'email': req.query.email}, function(err, user) {
        if (err) return handleError(err);
        if (!user) {
            newUser(req.query.email, req.query.username, jwt, res);
        } else {
            id = user._id;
            console.log('id: ' + id);
            Users.findByIdAndUpdate({_id: id}, { $set: {'jwt': jwt}}, function(err, user) {
                //After we find our user, strip the jwt out of the response and send the profile up to the client
                res.json({
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': user.role,
                    'skills': user.skills
                })
            });
        }
    });
}

function newUser(email, username, jwt, res) {
    //req is where all of your params are.
    //Get the info you need by calling req.query.<what you're looking for>
    //ex: password - req.qeury.password
    //res.json('making a new user');
    //We're going to be setting the username as the nickname for auth0, and get the email and such from the profile
    //A user is given admin permissions by someone who is already an admin
    //The profile can be updated later.
    var newUser = new Users({'username': username, 'email': email,
                            'first_name': "", 'last_name': "",
                            'role': "user", 'skills': "",
                            'jwt': jwt});
    newUser.save(function(err) {
        if (err) return handleError(err);
        console.log("Saved user!");
    }).then(function() {
        res.json({
            'username': newUser.username,
            'email': newUser.email,
            'first_name': newUser.first_name,
            'last_name': newUser.last_name,
            'role': newUser.role,
            'skills': newUser.skills
        })
    })
}

function modifyUser(req, res, next) {
  //ask ed how req works, see what we can pass into it
  //may be a good idea to switch to unique IDs as this will update all
  //collections matching the given criteria

  Users.findOne({'jwt': req.get('token')}, function(err, user) {
      if (err) return handleError(err);
      if (!user) {
          res.send("user not found");
      } else {
          Users.findByIdAndUpdate({'_id': user._id}, {$set: {'username': req.query.username, 'email': req.query.email,
                                                            'first_name': req.query.first_name, 'last_name': req.query.last_name
                                                          }}, function(err, user) {
                                                                res.json({
                                                                    'username': user.username,
                                                                    'email': user.email,
                                                                    'first_name': user.first_name,
                                                                    'last_name': user.last_name,
                                                                    'skills': user.skills
                                                                });

        });
      }

  })

  /*var o_name ={username: req.query.orig_name},
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
  });*/
}

function setSkills(req, res, next) {

  Users.findOne({'jwt': req.get('token')}, function(err, user) {
      if (err) return handleError(err);
      if (!user) {
          res.send("user not found");
      } else {
          Users.findByIdAndUpdate({'_id': user._id}, {$set: {'skills': req.query.skills}}, function(err, user) {
                                                                res.json({
                                                                  'skills': user.skills
                                                                });

        });
      }

  })
}

function deleteUser(req, res, next) {
    Users.find({'jwt': req.get('token')}).remove().exec();
    res.send("deleted!");
}

function sayHi(req, res, next) {
    res.send({
        hi: 'hi!'
    });
}

//Just a test code for our endpoint
router.get('/login', getUser);

router.post('/', modifyUser);
//leave this fool in for now to test our api for stuff
router.get('/hi', sayHi);
router.delete('/', deleteUser);
//just checking login functionality, will be updated at a later point to enhance security.
router.post('/check', auth);

module.exports = router;
