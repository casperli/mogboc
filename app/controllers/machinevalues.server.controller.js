"use strict";

var broadcaster = require("./machinevalues.server.socket");

var values = {
    "rpm": 0,
    "gear": 0,
    "speed": 0
};

var gearRpmSpeedMultiplicators = [];
gearRpmSpeedMultiplicators[0] = 0.005882353;
gearRpmSpeedMultiplicators[1] = 0.011764706;
gearRpmSpeedMultiplicators[2] = 0.021568627;
gearRpmSpeedMultiplicators[3] = 0.028627451;

exports.currentMachineValues = function (req, res, next) {
    res.send(values);
};

exports.setRpmAndGear = function (io) {
    return function (req, res, next) {
        values.rpm = req.body.rpm;
        values.gear = req.body.gear;
        values.speed = values.rpm * gearRpmSpeedMultiplicators[values.gear - 1];

        broadcaster.broadcastValueUpdate(io, values);

        res.send();

        // Save value to sqlite (every 10 seconds?) -> cron job (node-cron)
    };
};
