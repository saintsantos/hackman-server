//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    user = require('./user_model');



function getUser(req, res, next) {
    //console.log(req.query);
    user.findOne({'username': req.query.username}, function(err, user) {
        if (err) return handleError(err);
        res.json(user);
    })
}

function sayHi(req, res, next) {
    res.send({
        hi: 'hi!'
    });
}

//Just a test code for our endpoint
router.get('/hi', getUser);

module.exports = router;
