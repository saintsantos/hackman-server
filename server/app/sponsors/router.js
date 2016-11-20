//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    jsonParser = require('app/util/body-parse').json,
    auth = require('app/util/auth'),
    sponsors = require('./sponsor_model');


function getSponsors(req, res, next) {
    //filter for specific events
    sponsors.find(function(err, teams) {
        res.send(teams);
    });

}

function newSponsor(req, res, next) {
    //only needs a project description to be sent via request for the teams to be formed.
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

function deleteSponsor(req, res, next) {
    sponsors.findByIdAndRemove({'sponsorName': req.params.sponsorName}, function(err, removedSponsor) {
        if (err) return handleError(err);
    });
}

function modifySponsor(req, res, next) {
    sponsors.findByIdAndUpdate({'sponsorName': req.params.sponsorName}, { $set: {'sponsorName': req.query.newname, 'sponsor_desc': req.query.sponsor_desc}}, function(err, team) {
        res.send(team);
    });
}


//Get all of the sponsors for an ebent
router.get('/sponsors/', getSponsors);
router.post('/:sponsorName', newSponsor);
router.post('/:sponsorName/modify', modifySponsor);
router.delete('/:sponsorName/modify', deleteSponsor);

module.exports = router;
