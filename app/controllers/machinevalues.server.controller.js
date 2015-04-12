"use strict";

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

        var message = {};
        message.type = "machineValueUpdate";
        message.text = "New machine values";
        message.created = Date.now();
        message.machineValues = values;

        io.emit("valueUpdate", message);

        res.send();

        // Save value to sqlite (every 10 seconds?) -> cron job (node-cron)
    };
};

exports.initValueUpdateMessages = function (io, socket) {
    io.emit("valueUpdate", {
        type: "status",
        text: "connected",
        created: Date.now(),
        machineValues: values
    });

    console.log("Socket connected");

    socket.on("disconnect", function () {
        io.emit("valueUpdateMessage", {
            type: "status",
            text: "connected",
            created: Date.now(),
            machineValues: values
        });
    });
}