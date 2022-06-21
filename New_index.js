"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require("express");
var sequelize_1 = require("sequelize");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
var sequelize = new sequelize_1.Sequelize('SS_Books_New', 'root', 'kamalkamal2910', {
    dialect: 'mysql',
    host: 'localhost'
});
var Book = sequelize.define("book", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bookName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ratings: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
});
// console.log(Book);
// sequelize
//  .sync()
//  .then((result)=>{
//     console.log(result);
//  }).catch((err)=>{
//     console.log(err);
//  })
//  By default, Sequelize automatically adds the fields createdAt and updatedAt to every model, using the data type DataTypes.DATE. Those fields are automatically managed as well - whenever you use Sequelize to create or update something, those fields will be set correctly. The createdAt field will contain the timestamp representing the moment of creation, and the updatedAt will contain the timestamp of the latest update. ~ Sequelize documentation.
// Status Check using GET Req.
app.get('/status', function (req, res) {
    res.json({
        Status: "Connected to Books API."
    });
});
// All Books Details using GET Req.
app.get('/', function (req, res) {
    Book.findAll()
        .then(function (data) {
        res.send(data);
    })["catch"](function (err) {
        console.log(err);
        res.send(err);
    });
});
// Get Single Book Detail using GET Req.
app.get('/:id', function (req, res) {
    var id = req.params.id;
    Book.findByPk(id)
        .then(function (data) {
        res.send(data);
    })["catch"](function (err) {
        console.log(err);
        res.send(err);
    });
});
// creating a Book record using POST req.
app.post('/createbook', function (req, res) {
    if (!req.body.bookName) {
        res.send("Content cannot be empty.");
    }
    else {
        var response = req.body;
        Book.create(response)
            .then(function (data) {
            res.send(data);
        })["catch"](function (err) {
            res.send(err);
        });
    }
});
// Updating Record using Patch req.
app.patch('/update/:id', function (req, res) {
    if (!req.body) {
        res.send("Content cannot be empty.");
    }
    else {
        var id = req.params.id;
        var response = req.body;
        Book.update(response, {
            where: { id: id }
        })
            .then(function (num) {
            if (+num === 1) {
                res.send("Record updated Sucessfully.");
            }
            else {
                res.send("Already updated the record or no record found for that id.");
            }
        })["catch"](function (err) {
            res.send(err);
        });
    }
});
app["delete"]('/delete/:id', function (req, res) {
    var id = req.params.id;
    Book.destroy({
        where: { id: id }
    })
        .then(function (num) {
        if (+num === 1) {
            res.send("Record deleted Sucessfully.");
        }
        else {
            res.send("Already deleted the record or no record found for that id.");
        }
    })["catch"](function (err) {
        res.send(err);
    });
});
app.listen(2000, function () {
    console.log("The application is listening on port 2000!");
});
