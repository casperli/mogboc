"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var values = {
    "rpm": getRandomInt(400, 2551),
    "gear": getRandomInt(1, 5),
    "speed": 40
};

exports.currentMachineValues = function (req, res, next) {
    res.send(values);
};

exports.setRpmAndGear = function (req, res, next) {
    values.rpm = req.body.rpm;
    values.gear = req.body.gear;

    res.send();
    //console.log("Setting machine values: " + JSON.stringify(req.body, null, 4));

    // Save value to sqlite (every 10 seconds?) -> cron job (node-cron)
};

exports.initValueUpdateMessages = function (io, socket) {
    io.emit("valueUpdate", {
        type: "status",
        text: "connected",
        created: Date.now(),
        machineValues: values
    });

    socket.on("valueUpdate", function (message) {
        message.type = "machineValueUpdate";
        message.text = "New machine values";
        message.created = Date.now();

        io.emit("valueUpdate", message);
    });

    socket.on("disconnect", function () {
        io.emit("valueUpdateMessage", {
            type: "status",
            text: "connected",
            created: Date.now(),
            machineValues: values
        });
    });
}