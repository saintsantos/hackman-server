//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    prizes = require('app/prizes/prizes_model'),
    sponsors = require('app/sponsors/sponsor_model'),
    alerts = require('app/alerts/alerts_model'),
    admin_auth = require('app/util/admin_auth'),

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



function addSponsor(req, res, next) {
    var newSponsor = new sponsors({'sponsorName':  "New Sponsor",
                                    'sponsor_desc': "Sponsor Description"});
    newSponsor.save( function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Saved Sponsor!");
    }).then(function() {
        res.send(newSponsor);
    });

}

function editSponsor(req, res, next) {
    sponsors.findByIdAndUpdate({'_id': req.params.id}, { $set: {'sponsorName': req.query.sponsorName, 'sponsor_desc': req.query.sponsor_desc}}, function(err, sponsor) {
        res.send(sponsor);
    });
}

function removeSponsor(req, res, next) {
    sponsors.findByIdAndRemove({'_id': req.params.id}, function(err, removedSponsor) {
        if (err) return handleError(err);
    });

}

function addPrize(req, res, next) {
    var newPrize = new prizes({'prizeName': "New Prize",
                            'prize_desc': "Prize description",
                            'sponsor': "Sponsor name"});
    newPrize.save( function(err) {
        if (err) {
            console.log(err);
        }

    }).then(function() {
        console.log("Saved Prize!");
        res.send(newPrize);
    });

}

function editPrize(req, res, next) {
    prizes.findByIdAndUpdate({_id: req.params.id}, { $set: {'prizeName': req.query.prizeName, 'prize_desc': req.query.prize_desc, 'sponsor': req.query.sponsor}}, function(err, team) {
        res.send("Updated!");
    });

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
    //Not sure about implementing this yet.

}

function editAlert(req, res, next) {
    //Not sure about implementing this yet

}

//Admin add endpoint
router.post('/add', admin_auth, makeAdmin);
//Sponsor endpoints
router.post('/sponsor/', admin_auth, addSponsor);
router.delete('/sponsor/:id', admin_auth, removeSponsor);
router.put('/sponsor/:id', admin_auth, editSponsor);
//Prizes endpoints
router.post('/prize/', admin_auth, addPrize);
router.delete('/prize/:id', admin_auth, removePrize);
router.put('/prize/:id', admin_auth, editPrize);
//Alerts endpoints
router.post('/alert/add', admin_auth, addAlert);
router.put('/alert/:id', admin_auth, editAlert);
router.delete('/alert/:id', admin_auth, deleteAlert);
module.exports = router;
