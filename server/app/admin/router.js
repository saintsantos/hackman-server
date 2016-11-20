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
    prizes.findByIdAndUpdate({_id: req.params.id}, { $set: {'prizeName': req.query.teamname, 'prize': req.query.proj_desc, 'status': req.query.status, 'location': req.query.location}}, function(err, team) {
        res.send("Updated!");
    });

}

function editSponsor(req, res, next) {
    sponsors.findByIdAndUpdate({'sponsorName': req.params.sponsorName}, { $set: {'sponsorName': req.query.newname, 'sponsor_desc': req.query.sponsor_desc}}, function(err, team) {
        res.send(team);
    });
}

function addSponsor(req, res, next) {
    console.log("received request");
    console.log(req.params)
    console.log(req.query)
    sponsors.findOne({'sponsorName': req.params.sponsorName}, function(err, sponsor) {
        if (err) return handleError(err);
        if (!sponsor) {
            //add sponsor
            var newSponsor = new sponsors({'sponsorName':  req.params.sponsorName,
                                            'sponsor_desc': req.query.sponsor_desc});
            newSponsor.save( function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("Saved Sponsor!");
            }).then(function() {
                res.send(newSponsor);
            });
        } else {
            res.send("Sponsor Already Exists");
        }
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
    sponsors.findByIdAndRemove({'sponsorName': req.params.sponsorName}, function(err, removedSponsor) {
        if (err) return handleError(err);
    });

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
