var user = require('app/users/user_model');
function auth(req, res, next) {
    console.log('token: ' + req.get('token'));
    user.findOne({'jwt': req.get('token')}, function(err, user) {
        if (err) {
            console.log("user not found");
            res.send("Unauthorized");
        } else {
            console.log(user);
            res.send(user);
        }
    })
};

module.exports = auth;
