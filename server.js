process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var app = express();

app.listen(3000);

module.exports = app;

console.log("MogBoC server is running at http://localhost:3000");

process.on('SIGINT', function () {
    console.log('Exiting MogBoC server');
    process.exit();
});
