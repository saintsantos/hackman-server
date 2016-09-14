//express stuff
var express = require('express'),
    router = express.Router(),
    app = express();



function sayHi(req, res, next) {
    res.send({
        hi: 'hi!'
    });
}

//Just a test code for our endpoint
router.post('/hi', sayHi);

module.exports = router;
