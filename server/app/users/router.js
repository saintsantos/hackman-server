//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    user = require('./user_model');
    team = require('../teams/team_model');


function getUser(req, res, next) {
    //console.log(req.query);
    user.findOne({'username': req.query.username, 'password': req.query.password}, function(err, user) {
        if (err) return handleError(err);
        res.json(user);
    })
}

function newUser(req, res, next) {
    //req is where all of your params are.
    //Get the info you need by calling req.query.<what you're looking for>
    //ex: password - req.qeury.password
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/hackman_proto');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      var additionalUser = new userModel({
          username: req.query.username,
          email: req.query.email,
          password: req.query.password,
          jwt: req.query.jwt
      });
    });
}

function newTeam(req, res, next) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/hackman_proto');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      var additionalTeam = new teamModel({
          //req calls will go here once I look into
          //crossreferencing info from one collection
          //to another
      });
    });
}

//Just a test code for our endpoint
router.get('/login', getUser);

router.post('/signup', newUser)

module.exports = router;
