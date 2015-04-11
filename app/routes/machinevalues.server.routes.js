"use strict";

var machineValues = require("../../app/controllers/machinevalues.server.controller");

module.exports = function (app, io) {
    app.route("/api/currentmachinevalues").get(machineValues.currentMachineValues);
    app.route("/api/currentmachinevalues").put(machineValues.setRpmAndGear(io));
};
