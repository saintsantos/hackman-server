var user = require('app/users/user_model');
function auth(req, res, next) {
    console.log('token: ' + req.get('token'));
    if(req.get('token') === undefined) {
        res.status(401).send("unauthorized");
    } else {
        user.findOne({'jwt': req.get('token')}, function(err, user) {
            if (err) return handleError(err);
            if (!user) {
                res.status(401).send("Unauthorized");
            } else {
                return next();
            }
        });
    }
};

module.exports = auth;
