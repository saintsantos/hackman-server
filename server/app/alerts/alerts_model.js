var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alertSchema = new Schema({
    timestamp: String,
    text: String
}, {collection: 'alerts'});

alertSchema.set('toObject', { getters : true});
var alertModel = mongoose.model('Alert', alertSchema);
module.exports = alertModel;
