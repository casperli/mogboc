"use strict";

exports.broadcastValueUpdate = broadcast;
exports.initValueUpdateMessages = init;

function broadcast(io, values) {
    var message = {};
    message.type = "machineValueUpdate";
    message.text = "New machine values";
    message.created = Date.now();
    message.machineValues = values;

    io.emit("valueUpdate", message);
}

function init (io, socket) {
    io.emit("valueUpdate", {
        type: "status",
        text: "connected",
        created: Date.now(),
        machineValues: {}
    });

    console.log("Socket connected");

    socket.on("disconnect", function () {
        io.emit("valueUpdateMessage", {
            type: "status",
            text: "connected",
            created: Date.now(),
            machineValues: {}
        });
    });
}
