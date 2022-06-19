// const express=require ("express");
// import express,{Express, Request,Response} from 'express';
// const bodyParser=require("body-parser");
// const app:Express=express();

// app.get('/',(req:Request,res:Response)=>{
//     res.send("hello");
// });


// app.listen(3000,()=>{
//     console.log("Server is running on local host");
// });

import express from 'express';
import {Request,Response} from 'express';
const app=express();

app.get('/', (req:Request, res:Response) => {
    res.json({
        Name : 'KK',
        Contact : 9711566560,
        Email_Id : 'kk@gmail.com'
    });
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})