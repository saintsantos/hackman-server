var db = require("app/util/db");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    eventName: String,
    event_desc: String,
    event_type: String
}, {collection: 'events'});

eventSchema.set('toObject', { getters : true});
var eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;
