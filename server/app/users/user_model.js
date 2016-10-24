var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    jwt: String,
    first_name: String,
    last_name: String,
    role: String,
    skills: String
});
userSchema.set('toObject', {getters: true});
var userModel = mongoose.model('user', userSchema);
module.exports = userModel;
//var collection = db.get()

//var collection = db.get().collection('users');
