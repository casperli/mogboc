"use strict";

var config = require("./config"),
    http = require("http"),
    socketio = require("socket.io"),
    express = require("express"),
    morgan = require("morgan"),
    compress = require("compression"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    fs = require("fs"),
    path = require("path");

module.exports = function () {
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server);

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    } else if (process.env.NODE_ENV === "production") {
        var accessLogStream = fs.createWriteStream(path.join(__dirname, "/access.log"), {flags: "a"});
        app.use(morgan("combined", {stream: accessLogStream}));

        app.use(compress());
    }

    app.use(bodyParser.urlencoded(
        {
            extended: true
        }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    app.set("views", "./app/views");
    app.set("view engine", "ejs");

    require("../app/routes/index.server.routes.js")(app);
    require("../app/routes/machinevalues.server.routes.js")(app);

    app.use(express.static("./public"));

    require("./socketio")(server, io);
    return server;
}