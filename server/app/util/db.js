//Initialize mongodb here

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hackman_proto');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

module.exports = db;





/*// Connection URL
var url = 'mongodb://localhost:27017/hackman_proto';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to dat mongo stuff");
  module.exports = db;

  db.close();
});*/
