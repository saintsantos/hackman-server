
//going to be accessing the config from different directories
var config = module.exports

config.express = {
    port: 3000,
    ip: '127.0.0.1'
}

config.database = {
    url: 'mongodb://localhost:27017/hackman_proto'
}

config.secret = {
    secret: 'hackman'
}
