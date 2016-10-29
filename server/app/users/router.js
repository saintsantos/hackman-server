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
                            'password': req.query.password,
                            'jwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2hhY2ttYW4tcHJvdG8uY29tIiwic3ViIjoibWFpbHRvOnQuam9obnNvbkBzdXBlcmJhZGFzc2FuZGNvb2wuY29tIiwibmJmIjoxNDc1MjcwMzMzLCJleHAiOjE1MDY4MDYzMzMsImlhdCI6MTQ3NTI3MDMzMywianRpIjoiaWQ4Njc1MzA5IiwidHlwIjoiaHR0cHM6Ly9oYWNrbWFuLXByb3RvLmNvbS9wcm90byJ9.rRVkZW7k2Ph6i5NaM7PUyN2i0XtVOV-sYpcmwkfJ21E'});
    newUser.save(function(err) {
        if (err) return handleError(err);
        console.log("Saved user!");
    }).then(function() {
        res.send(newUser);
    })
}

function sayHi(req, res, next) {
    res.send({
        hi: 'hi!'
    });
}

//Just a test code for our endpoint
router.post('/login', jsonParser, getUser);

router.post('/signup', newUser);
router.get('/hi', sayHi);

module.exports = router;
