//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),
    prizes = require('app/prizes/prizes_model'),
    sponsors = require('app/sponsors/sponsor_model'),
    alerts = require('app/alerts/alerts_model'),

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
    prizes.findByIdAndUpdate({_id: req.params.id}, { $set: {'prizeName': req.query.prizeName, 'prize_desc': req.query.prize_desc, 'sponsor': req.query.sponsor}}, function(err, team) {
        res.send("Updated!");
    });

}

function editSponsor(req, res, next) {

}

function addSponsor(req, res, next) {
    var newSponsor = new sponsors({'sponsorName': req.params.name,
                            'sponsor_desc': req.query.desc});
    newSponsor.save( function(err) {
        if (err) {
            console.log(err);
        }

    }).then(function() {
        console.log("Saved Sponsor!");
        res.send(newSponsor);
    });

}

function addPrize(req, res, next) {
    var newPrize = new prizes({'prizeName': req.params.name,
                            'prize_desc': req.query.prize_desc,
                            'sponsor': req.query.sponsor});
    newPrize.save( function(err) {
        if (err) {
            console.log(err);
        }

    }).then(function() {
        console.log("Saved Prize!");
        res.send(newPrize);
    });

}

function removeSponsor(req, res, next) {

}

function removePrize(req, res, next) {
    //Passing in the id of the prize we want to remove
    prizes.findByIdAndRemove({_id: req.params.id}, function(err, removedPrize) {
        if (err) return handleError(err);
    });

}

function addAlert(req, res, next) {
    var newAlert = new alerts({'timeStamp': new Date(),
                            'text': req.query.text});
    newAlert.save( function(err) {
        if (err) {
            console.log(err);
        }

    }).then(function() {
        console.log("Saved Alert!");
        res.send(newAlert);
    });
}

function deleteAlert(req, res, next) {

}

function editAlert(req, res, next) {

}

//Admin add endpoint
router.post('/add', makeAdmin);
//Sponsor endpoints
router.post('/sponsor/:name', addSponsor);
router.delete('/sponsor/:id', removeSponsor);
router.put('/sponsor/:id', editSponsor);
//Prizes endpoints
router.post('/prize/:name', addPrize);
router.delete('/prize/:id', removePrize);
router.put('/prize/:id', editPrize);
//Alerts endpoints
router.post('/alert/add', addAlert);
router.put('/alert/:id', editAlert);
router.delete('/alert/:id', deleteAlert);
module.exports = router;
