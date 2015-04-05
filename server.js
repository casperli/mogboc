"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

var express = require("./config/express");
var app = express();

app.listen(3000);

module.exports = app;

console.log("MogBoC server is running at http://localhost:3000");

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("mogboc.db");
db.serialize(function () {
    db.run("DROP TABLE IF EXISTS EngineRpm");
    db.run("CREATE TABLE IF NOT EXISTS EngineRpm (id INTEGER PRIMARY KEY, time INTEGER, rpm INTEGER)");

    db.run("BEGIN TRANSACTION");
    var stmt = db.prepare("INSERT INTO EngineRpm (time, rpm) VALUES (datetime(), ?)");
    for (var i = 0; i < 10; i++) {
        stmt.run(500 + i);
    }

    stmt.finalize();

    db.run("COMMIT TRANSACTION");

    db.each("SELECT time, avg(rpm) as rpm FROM EngineRpm GROUP BY time", function (err, row) {
        if (err) {
            console.log("Error: " + err);
        }
        console.log("Time: " + row.time + " Rpm: " + row.rpm);
    });
});

db.close();

process.on("SIGINT", function () {
    console.log("Exiting MogBoC server");
    //noinspection Eslint
    process.exit();
});
