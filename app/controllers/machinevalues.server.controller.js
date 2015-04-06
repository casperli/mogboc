"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var rpm = getRandomInt(400, 2551);
var gear = getRandomInt(1, 5);

exports.currentMachineValues = function (req, res, next) {
    var values = {
        "rpm": rpm,
        "gear": gear,
        "speed": 40
    };

    res.send(values);
};

exports.setRpmAndGear = function (req, res, next) {
    rpm = req.body.rpm;
    gear= req.body.gear;

    res.send();
    //console.log("Setting machine values: " + JSON.stringify(req.body, null, 4));

    // Save value to sqlite (every 10 seconds?) -> cron job (node-cron)
};
