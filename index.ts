import * as express from 'express';
// import express from 'express';
import * as mysql2 from 'mysql2';
import * as bodyparser from 'body-parser';
// import express, { NextFunction, Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser.json());

const mysqlconnection =mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "kamalkamal2910",
  database: "SS_Books"
})

mysqlconnection.connect((err)=>{
  if(!err)
  {
    console.log("Connected Sucessfully");
  }
  else
  {
    console.log("Connection Failed");
  }
})

app.get('/', (req, res) => {
  res.json({ 
    Staus : "Connected to BOOKS API."
});
});

app.get('/books',(req,res)=>{
  mysqlconnection.query("SELECT * FROM BOOK",(err,rows,fields)=>{
    if(!err)
    {
      res.json(rows);
    }
    else{
      res.send(
        {
          Error: "Error in GET Request.",
          Message: "Check connections"
        }
      )
      console.log(err,{
        Error: "Error in GET Request.",
        Message: "Check connections"
      });
      throw(err);
    }
  })
})


app.post('/bookcreate',(req,res)=>{
  // console.log(req.body);
  const response:object=req.body;
  // console.log(response);
  if(JSON.stringify(response) === '{}')
  {
    res.send({
      Error: "Error in Post Request.",
      Message: "Please provide Book Details"
    });
    console.log({
      Error: "Error in Post Request.",
      Message: "Please provide Book Details"
    })
  }
  else{
      mysqlconnection.query("INSERT INTO book SET ?",response,(err,row,fields)=>{
        if(!err)
        {
          console.log("Created Book");
          res.send("New Record Added");
        }
        else
        {
          console.log("Error in creating record");
          console.log(err);
          res.send(err);
        }
      })
      // console.log(BookName,Author,Genre,Ratings);
      
  }
});

app.put('/bookupdate',(req,res)=>{
  
  // const {BookID, BookName, Author, Genre, Ratings} = req.body as {BookID: number; BookName: string, Author:string, Genre:string,Ratings:number};
  const response:object=req.body;
  const bookId:number=req.body.BookID;
  // console.log(response);
  // console.log(bid);
  if (!bookId || JSON.stringify(response)==='{}')
  {
    res.send({
      Error: "Error in Put Request.",
      Message: "Please provide Book ID and other details"
    });
    console.log({
      Error: "Error in Put Request.",
      Message: "Please provide Book ID and other details"
    })
  }
  else{
    mysqlconnection.query("UPDATE book SET ? WHERE BookId = ?",[response,bookId],(err,row,fields)=>{

      if(!err)
      {
        console.log("Updated Book");
        res.send("Updated the Book record.");
      }
      else
      {
        console.log("Error in creating record");
        console.log(err);
        res.send(err);
      }
    })
    
  }
})


app.patch('/bookupdate',(req,res)=>{
  
  // const {BookID, BookName, Author, Genre, Ratings} = req.body as {BookID: number; BookName: string, Author:string, Genre:string,Ratings:number};
  const response:object=req.body;
  const bookId:number=req.body.BookID;
  // console.log(response);
  // console.log(bid);

  if (!bookId || JSON.stringify(response)==='{}')
  {
    res.send({
      Error: "Error in Patch Request.",
      Message: "Please provide Book ID and other details"
    });
    console.log({
      Error: "Error in Patch Request.",
      Message: "Please provide Book ID and other details"
    })
  }
  else {
    mysqlconnection.query("UPDATE book SET ? WHERE BookId = ?",[response,bookId],(err,row,fields)=>{

      if(!err)
      {
        console.log("Updated Book");
        res.send("Updated the Book record.");
      }
      else
      {
        console.log("Error in creating record");
        console.log(err);
        res.send(err);
      }
    })
    
  }
})





app.delete('/deletebook',(req,res)=>{
  const bookId:number=req.body.BookID;
  if(!bookId)
  {
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

    mysqlconnection.query("DELETE from book WHERE BookId = ?",bookId,(err,row,fields)=>{

      if(!err)
      {
        console.log("Deleted Book");
        res.send("Deleted the Book");
      }
      else
      {
        console.log("Error in creating record");
        console.log(err);
        res.send(err);
      }
    })
    
  }
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})