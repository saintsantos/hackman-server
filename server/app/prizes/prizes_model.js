var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prizeSchema = new Schema({
    prizeName: String,
    prize_desc: String,
    sponsor: String
}, {collection: 'prizes'});

prizeSchema.set('toObject', { getters : true});
var prizeModel = mongoose.model('Prize', prizeSchema);
module.exports = prizeModel;
