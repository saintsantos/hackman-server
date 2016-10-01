var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamname: String,
    descript: String,
    members: String,     //this entry is temporary until we can pull info from the users collection
});

var teamModel = mongoose.model('team', teamSchema);

module.exports = teamModel;
//var collection = db.get()

//var collection = db.get().collection('users');
