"use strict";
// const express=require ("express");
// import express,{Express, Request,Response} from 'express';
// const bodyParser=require("body-parser");
// const app:Express=express();
exports.__esModule = true;
// app.get('/',(req:Request,res:Response)=>{
//     res.send("hello");
// });
// app.listen(3000,()=>{
//     console.log("Server is running on local host");
// });
var express_1 = require("express");
var app = (0, express_1["default"])();
app.get('/', function (req, res) {
    res.send('Well done!');
});
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
