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
            //user.update({'jwt': req.query.jwt});
            Users.findByIdAndUpdate({_id: id}, { $set: {'jwt': jwt}}, function(err, user) {
                res.send(user);
                /*res.json({
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': user.role,
                    'skills': user.skills
                })*/
            });
        }
    });
}

function newUser(email, username, jwt, res) {
    //req is where all of your params are.
    //Get the info you need by calling req.query.<what you're looking for>
    //ex: password - req.qeury.password
    console.log(jwt);
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
//Just a test code for our endpoint
router.post('/login', getUser);
//just checking login functionality
router.post('/check', auth);

module.exports = router;
