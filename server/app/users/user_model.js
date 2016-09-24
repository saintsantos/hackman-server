var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    jwt: String
    grad_year: Number,
    contact: [{
      FB: String,
      LI: String,
      email: String
    }]
}, {collection: 'users'});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
module.exports = userSchema;
//var collection = db.get()

//var collection = db.get().collection('users');
