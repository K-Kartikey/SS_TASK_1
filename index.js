"use strict";
exports.__esModule = true;
var express = require("express");
// import express from 'express';
var mysql2 = require("mysql2");
var bodyparser = require("body-parser");
// import express, { NextFunction, Request, Response } from "express";
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
    res.json({
        Staus: "Connected to BOOKS API."
    });
});
app.get('/books', function (req, res) {
    mysqlconnection.query("SELECT * FROM BOOK", function (err, rows, fields) {
        if (!err) {
            res.json(rows);
        }
        else {
            res.send({
                Error: "Error in GET Request.",
                Message: "Check connections"
            });
            console.log(err, {
                Error: "Error in GET Request.",
                Message: "Check connections"
            });
            throw (err);
        }
    });
});
app.post('/bookcreate', function (req, res) {
    // console.log(req.body);
    var response = req.body;
    // console.log(response);
    if (JSON.stringify(response) === '{}') {
        res.send({
            Error: "Error in Post Request.",
            Message: "Please provide Book Details"
        });
        console.log({
            Error: "Error in Post Request.",
            Message: "Please provide Book Details"
        });
    }
    else {
        mysqlconnection.query("INSERT INTO book SET ?", response, function (err, row, fields) {
            if (!err) {
                console.log("Created Book");
                res.send("New Record Added");
            }
            else {
                console.log("Error in creating record");
                console.log(err);
                res.send(err);
            }
        });
        // console.log(BookName,Author,Genre,Ratings);
    }
});
app.put('/bookupdate', function (req, res) {
    // const {BookID, BookName, Author, Genre, Ratings} = req.body as {BookID: number; BookName: string, Author:string, Genre:string,Ratings:number};
    var response = req.body;
    var bookId = req.body.BookID;
    // console.log(response);
    // console.log(bid);
    if (!bookId || JSON.stringify(response) === '{}') {
        res.send({
            Error: "Error in Put Request.",
            Message: "Please provide Book ID and other details"
        });
        console.log({
            Error: "Error in Put Request.",
            Message: "Please provide Book ID and other details"
        });
    }
    else {
        mysqlconnection.query("UPDATE book SET ? WHERE BookId = ?", [response, bookId], function (err, row, fields) {
            if (!err) {
                console.log("Updated Book");
                res.send("Updated the Book record.");
            }
            else {
                console.log("Error in creating record");
                console.log(err);
                res.send(err);
            }
        });
    }
});
app.patch('/bookupdate', function (req, res) {
    // const {BookID, BookName, Author, Genre, Ratings} = req.body as {BookID: number; BookName: string, Author:string, Genre:string,Ratings:number};
    var response = req.body;
    var bookId = req.body.BookID;
    // console.log(response);
    // console.log(bid);
    if (!bookId || JSON.stringify(response) === '{}' || typeof (bookId) !== 'number') {
        res.send({
            Error: "Error in Patch Request.",
            Message: "Please provide Book ID and other details"
        });
        console.log({
            Error: "Error in Patch Request.",
            Message: "Please provide Book ID and other details"
        });
    }
    else {
        mysqlconnection.query("UPDATE book SET ? WHERE BookId = ?", [response, bookId], function (err, row, fields) {
            if (!err) {
                console.log("Updated Book");
                res.send("Updated the Book record.");
            }
            else {
                console.log("Error in creating record");
                console.log(err);
                res.send(err);
            }
        });
    }
});
app["delete"]('/deletebook', function (req, res) {
    var bookId = req.body.BookID;
    if (!bookId || typeof (bookId) !== 'number') {
        res.send({
            Error: "Error in DELETE Request.",
            Message: "Please provide Book ID"
        });
        console.log({
            Error: "Error in DELETE Request.",
            Message: "Please provide Book ID"
        });
    }
    else {
        mysqlconnection.query("DELETE from book WHERE BookId = ?", bookId, function (err, row, fields) {
            if (!err) {
                console.log("Deleted Book");
                res.send("Deleted the Book");
            }
            else {
                console.log("Error in creating record");
                console.log(err);
                res.send(err);
            }
        });
    }
});
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
