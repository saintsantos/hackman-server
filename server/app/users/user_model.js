var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    jwt: String,
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;
//var collection = db.get()

//var collection = db.get().collection('users');
