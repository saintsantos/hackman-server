//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),

    profile = require('./profile_model');


function getProfile(req, res, next) {
  profile.findOne({'username': req.query.username}, function(err, user) {
      if (err) return handleError(err);
      res.json(user);
  })
}

function newProfile(req, res, next) {
  var newProfile = new profile({'f_name': req.query.f_name, 'l_name': req.query.l_name, 'username': req.query.usename,
                          'email': req.query.email, 'facebook': req.query.facebook, 'linkedin': req.query.linkedin});
  newProfile.save(function(err) {
      if (err) return handleError(err);
      console.log("Saved user profile!");
  }).then(function() {
      res.send(newProfile);
  })
}

//Just a test code for our endpoint
router.get('/getProfile', getProfile);

router.post('/newProfile', newProfile);

module.exports = router;
