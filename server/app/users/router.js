//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),
    admin_auth = require('app/util/admin_auth'),

    Users = require('./user_model');


function loginUser(req, res, next) {
    //console.log(req.query);
    //Don't have to handle an improper login for our application. Aith0 let's us do this properly
    jwt = req.get('token');
    email = req.query.email;
    username = req.query.username;
    console.log(jwt);
    if (email === undefined || username === undefined) {
        res.status(404).send(("Username or email undefined"));
    } else {
        Users.findOne({'username': req.query.username, 'email': req.query.email}, function(err, user) {
            if (err) return handleError(err);
            if (!user) {
                newUser(req.query.email, req.query.username, jwt, res);
            } else {
                id = user._id;
                console.log('id: ' + id);
                console.log('jwt: ' + jwt);
                Users.findByIdAndUpdate({_id: id}, { $set: {'jwt': jwt}}, function(err, user) {
                    res.send("logged in!");
                });
            }
        });
    }
}

function updateJwt(req, req, next) {
    console.log("updating jwt");
    Users.findOne({'username': req.query.username, 'email': req.query.email}, function(err, user) {
        if (err) return handleError(err);
        if (!user) {
            newUser(req.query.email, req.query.username, jwt, res);
        } else {
            id = user._id;
            console.log('id: ' + id);
            Users.findByIdAndUpdate({_id: id}, { $set: {'jwt': jwt}}, function(err, user) {
                res.send("Updated token");
            });
        }
    });
}

function newUser(email, username, jwt, res) {
    console.log("email: ", email);
    console.log("username", username);
    if(email === undefined || username === undefined) {
        res.send("Error, undefined variable");
    } else {
        var newUser = new Users({'username': username, 'email': email,
                                'first_name': "", 'last_name': "",
                                'role': "user", 'github': "", 'linkedIn': "",
                                'resume': "", 'jwt': jwt});
        newUser.save(function(err) {
            if (err) return handleError(err);
            console.log("Saved user!");
        });
    }
}

function modifyUser(req, res, next) {
  //ask ed how req works, see what we can pass into it
  //may be a good idea to switch to unique IDs as this will update all
  //collections matching the given criteria
  //This will accept the post from the profile page. It will send the entire user object,
  //regardless of what updates. It's easier to update the entire user object than to hunt,
  //for each element that changes.

  Users.findOne({'jwt': req.get('token')}, function(err, user) {
      if (err) return handleError(err);
      if (!user) {
          res.status(404).send("user not found in check one");
      } else {
          Users.findByIdAndUpdate({'_id': user._id}, {$set: {'first_name': req.query.first_name, 'last_name': req.query.last_name, 'github': req.query.github, 'linkedIn': req.query.linkedin, 'resume': req.query.resume
                                                          }}, function(err, user) {
                                                                res.status(200).send(user);
        });
      }

  });
}

function setSkills(req, res, next) {
  Users.findOne({'jwt': req.get('token')}, function(err, user) {
      if (err) return handleError(err);
      if (!user) {
          res.status(404).send("user not found in check 2");
      } else {
          Users.findByIdAndUpdate({'_id': user._id}, {$set: {'skills': req.query.skills}}, function(err, user) {
                                                                res.json({
                                                                  'skills': user.skills
                                                                });

        });
      }

  })
}

function getUser(req, res, next) {
    Users.findOne({'username': req.params.username}, function(err, user) {
        if (err) return handleError(err);
        if (!user) {
            res.send("user not found in check 3");
        } else {
            res.json({
                '_id': user._id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role,
                'github': user.github,
                'linkedIn': user.linkedin,
                'resume': user.resume
            })
          }
      });
}

function getMultiUser(req, res, next) {
    Users.find({'username': {$in: req.query.username}},function(err,user){
      res.status(200).send(user);
    });
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
router.get('/login', loginUser);
router.get('/multi', getMultiUser);
router.get('/update', updateJwt);

router.get('/:username', getUser);

router.put('/:id', modifyUser);
//leave this fool in for now to test our api for stuff
router.get('/test/hi', sayHi);
//Should only be visible to admins and users who choose to remove their account. Dunno what to do yet.
router.delete('/:id', deleteUser);
//just checking login functionality, will be updated at a later point to enhance security.
router.post('/check', auth);

module.exports = router;
