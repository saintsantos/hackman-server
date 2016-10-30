var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    jwt: String,
    email: String,
    first_name: String,
    last_name: String,
    role: String,
    skills: String
});
userSchema.set('toObject', {getters: true});
var userModel = mongoose.model('user', userSchema);
module.exports = userModel;
//For the time being these will be strings. Will fix very soon.
