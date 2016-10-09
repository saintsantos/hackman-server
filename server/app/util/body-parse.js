var bodyParser = require('body-parser');

//create application/json parser
var jsonParser = bodyParser.json(),
    //create URL parser
    urlParser = bodyParser.urlencoded({ extended: false });

module.exports = {
    url: urlParser,
    json: jsonParser
};
