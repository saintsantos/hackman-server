var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamname: String,
    created_by: String,
    proj_desc: String,
    status: String,
    location: String,
    teammates: []
}, {collection: 'teams'});

teamSchema.set('toObject', { getters : true});
var teamModel = mongoose.model('Team', teamSchema);
module.exports = teamModel;
