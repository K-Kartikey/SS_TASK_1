"use strict";
exports.__esModule = true;
var express = require("express");
var mysql2 = require("mysql2");
var bodyparser = require("body-parser");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.post('/bookcreate', function (req, res) {
    var BookName = req.body.BookName;
    var Author = req.body.Author;
    var Genre = req.body.Genre;
    var Ratings = req.body.Ratings;
    mysqlconnection.query("INSERT INTO book SET ?", { BookName: BookName, Author: Author, Genre: Genre, Ratings: Ratings }, function (err, row, fields) {
        if (!err) {
            console.log("Created Book");
        }
        else {
            console.log("Error in creating record");
            console.log(err);
        }
    });
    console.log(BookName, Author, Genre, Ratings);
    res.send("New Record Added");
});
app.put('/bookupdate', function (req, res) {
    var BookID = req.body.BookID;
    var BookName = req.body.BookName;
    var Author = req.body.Author;
    var Genre = req.body.Genre;
    var Ratings = req.body.Ratings;
    mysqlconnection.query("UPDATE book SET ? WHERE BookId = ?", [{ BookName: BookName, Author: Author, Genre: Genre, Ratings: Ratings }, BookID], function (err, row, fields) {
        if (!err) {
            console.log("Updated Book");
        }
        else {
            console.log("Error in creating record");
            console.log(err);
        }
    });
    res.send("Updated the Book record.");
});
app["delete"]('/deletebook', function (req, res) {
    var BookID = req.body.BookID;
    mysqlconnection.query("DELETE from book WHERE BookId = ?", [BookID], function (err, row, fields) {
        if (!err) {
            console.log("Deleted Book");
        }
        else {
            console.log("Error in creating record");
            console.log(err);
        }
    });
    res.send("Deleted the Book");
});
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
