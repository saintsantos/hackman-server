//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    user = require('./user_model');


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
    var newUser = new user({'username': req.query.username, 'email': req.query.email,
                            'password': req.query.password, 'jwt': req.query.jwt});
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
router.get('/login', getUser);

router.post('/signup', newUser);

module.exports = router;
