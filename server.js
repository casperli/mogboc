var express = require('./config/express');
var app = express();
var morgan = require('morgan');
var fs = require('fs');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.listen(3000);

module.exports = app;

console.log("Node is running at http://localhost:3000");

process.on('SIGINT', function () {
    console.log('Exiting MogBoC server');
    process.exit();
});
