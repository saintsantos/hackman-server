var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    f_name: String,
    l_name: String,
    username: String,
    email: String,
    facebook: String,
    linkedin: String
});

var profileModel = mongoose.model('profile', profileSchema);

module.exports = profileModel;
//var collection = db.get()

//var collection = db.get().collection('users');
