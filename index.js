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
    // console.log(req.body);
    var response = req.body;
    console.log(response);
    //   const BookName:string=req.body.BookName;
    //   const Author:string=req.body.Author;
    //   const Genre:string=req.body.Genre;
    //   const Ratings:number=req.body.Ratings;
    mysqlconnection.query("INSERT INTO book SET ?", response, function (err, row, fields) {
        if (!err) {
            console.log("Created Book");
        }
        else {
            console.log("Error in creating record");
            console.log(err);
        }
    });
    // console.log(BookName,Author,Genre,Ratings);
    res.send("New Record Added");
});
app.put('/bookupdate', function (req, res) {
    // const {BookID, BookName, Author, Genre, Ratings} = req.body as {BookID: number; BookName: string, Author:string, Genre:string,Ratings:number};
    var response = req.body;
    var bid = req.body.BookID;
    // console.log(response);
    // console.log(bid);
    mysqlconnection.query("UPDATE book SET ? WHERE BookId = ?", [response, bid], function (err, row, fields) {
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
app.patch('/bookupdate', function (req, res) {
    // const {BookID, BookName, Author, Genre, Ratings} = req.body as {BookID: number; BookName: string, Author:string, Genre:string,Ratings:number};
    var response = req.body;
    var bid = req.body.BookID;
    console.log(response);
    // console.log(bid);
    mysqlconnection.query("UPDATE book SET ? WHERE BookId = ?", [response, bid], function (err, row, fields) {
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
    mysqlconnection.query("DELETE from book WHERE BookId = ?", BookID, function (err, row, fields) {
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
