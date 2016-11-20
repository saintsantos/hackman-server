//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),
    prizes = require('app/prizes/prizes_model'),
    sponsors = require('app/sponsors/sponsor_model'),

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
    prizes.findByIdAndUpdate({_id: req.params.id}, { $set: {'prizeName': req.query.teamname, 'prize_desc': req.query.proj_desc, 'sponsor': req.query.status}}, function(err, team) {
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
                            'prize_desc': req.query.desc,
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
module.exports = router;
