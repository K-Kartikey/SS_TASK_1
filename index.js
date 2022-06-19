"use strict";
exports.__esModule = true;
var express = require("express");
var mysql2 = require("mysql2");
var bodyparser = require("body-parser");
var app = express();
app.use(bodyparser.json());
var mysqlconnection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "kamalkamal2910",
    database: "SS_Books"
});
mysqlconnection.connect(function (err) {
    if (!err) {
        console.log("Connected Sucessfully");
    }
    else {
        console.log("Connection Failed");
    }
});
app.get('/', function (req, res) {
    res.json({ Staus: "Connected to BOOKS API."
    });
});
app.get('/books', function (req, res) {
    mysqlconnection.query("SELECT * FROM BOOK", function (err, rows, fields) {
        if (!err) {
            res.json(rows);
        }
        else {
            console.log(err);
        }
    });
});
// app.post('/create',(req,res)=>{
//   req.body()
// });
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
