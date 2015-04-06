"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

exports.currentMachineValues = function (req, res, next) {
    var values = {
        "rpm": getRandomInt(400, 2551),
        "gear": getRandomInt(1, 5),
        "speed": 40
    };

    res.send(values);
};

exports.setRpmAndGear = function (req, res, next) {
    console.log("Setting machine values: " + JSON.stringify(req.body, null, 4));
};
