var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamname: String,
    description: String,
    members: String,     //this entry is temporary until we can pull info from the users collection
}, {collection: 'teams'});

var teamModel = mongoose.model('Team', teamSchema);

module.exports = teamModel;
module.exports = teamSchema;
//var collection = db.get()

//var collection = db.get().collection('users');
