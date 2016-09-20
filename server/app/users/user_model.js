var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    pasword: String,
    jwt: String
}, {collection: 'users'});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
//var collection = db.get()

//var collection = db.get().collection('users');
