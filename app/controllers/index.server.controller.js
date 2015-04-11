"use strict";

exports.render = index;

function index(req, res) {
    res.render("index", {
        title: "Unimog Cockpit"
    });
}
