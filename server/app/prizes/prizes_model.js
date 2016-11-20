var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prizeSchema = new Schema({
    prizeName: String,
    prize_desc: String,
    prize_rank: Integer,
    event: String
}, {collection: 'prizes'});

prizeSchema.set('toObject', { getters : true});
var prizeModel = mongoose.model('Prize', prizeSchema);
module.exports = prizeModel;
