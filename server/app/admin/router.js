//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),

    Users = require('app/users/user_model');



function makeAdmin(req, res, next) {
    Users.findOne({'username': req.query.username}, function(err, user) {
        if (err) return handleError(err);
        if (!user) {
            res.send("User not found");
        } else {
            id = user._id;
            console.log('id: ' + id);
            Users.findByIdAndUpdate({_id: id}, { $set: {'role': 'admin'}});
        }
    });
}

function editPrize(req, res, next) {

}

function editSponsor(req, res, next) {

}

function addSponsor(req, res, next) {

}

function addPrize(req, res, next) {

}

function removeSponsor(req, res, next) {

}

function removePrize(req, res, next) {

}

//Admin add endpoint
router.post('/add', makeAdmin);
//Sponsor endpoints
router.post('/sponsor/:name', addSponsor);
router.delete('/sponsor/:name', removeSponsor);
router.put('/sponsor/:name', editSponsor);
//Prizes endpoints
router.post('/prize/:name', addPrize);
router.delete('/prize/:name', removePrize);
router.put('/prize/:name', editPrize);
module.exports = router;
