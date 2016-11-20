var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sponsorSchema = new Schema({
    sponsorName: String,
    sponsor_desc: String,
    event: String
}, {collection: 'sponsors'});

sponsorSchema.set('toObject', { getters : true});
var sponsorModel = mongoose.model('Sponsor', sponsorSchema);
module.exports = sponsorModel;
