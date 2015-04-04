process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var app = express();

app.listen(3000);

module.exports = app;

console.log("MogBoC server is running at http://localhost:3000");

//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
//db.serialize(function(){
//    db.run("CREATE TABLE lorem (info TEXT)");
//
//    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//    for(var i = 0; i <10; i++)
//    {
//        stmt.run("Ipsum" + i);
//    }
//
//    stmt.finalize();
//
//    db.each("SELECT rowid as id, info FROM lorem", function (err,row){
//        console.log(row.id + ": " + row.info);
//    });
//});
//
//db.close();

process.on('SIGINT', function () {
    console.log('Exiting MogBoC server');
    process.exit();
});
