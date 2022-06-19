"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.json({ Name: 'KK',
        Contact: 9711566660,
        Email_Id: 'kk@gmail.com'
    });
});
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
