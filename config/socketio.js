"use strict";

var config = require("./config");

module.exports = function (server, io) {
    io.on("connection", function (socket) {
        require("../app/controllers/machinevalues.server.controller").initValueUpdateMessages(io, socket);
    });
}

