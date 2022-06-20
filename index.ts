import * as express from 'express';
import * as mysql2 from 'mysql2';
import * as bodyparser from 'body-parser';

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
  res.json({ Staus : "Connected to BOOKS API."
});
});

app.get('/books',(req,res)=>{
  mysqlconnection.query("SELECT * FROM BOOK",(err,rows,fields)=>{
    if(!err)
    {
      res.json(rows);
    }
    else{
      console.log(err);
    }
  })
})


app.post('/bookcreate',(req,res)=>{
  const BookName:string=req.body.BookName;
  const Author:string=req.body.Author;
  const Genre:string=req.body.Genre;
  const Ratings:number=req.body.Ratings;
  mysqlconnection.query("INSERT INTO book SET ?",{BookName,Author,Genre,Ratings},(err,row,fields)=>{
    if(!err)
    {
      console.log("Created Book");

    }
    else
    {
      console.log("Error in creating record");
      console.log(err);
    }
  })
  console.log(BookName,Author,Genre,Ratings);
  res.send("New Record Added");
});

app.put('/bookupdate',(req,res)=>{
  const BookID:number=req.body.BookID;
  const BookName:string=req.body.BookName;
  const Author:string=req.body.Author;
  const Genre:string=req.body.Genre;
  const Ratings:number=req.body.Ratings;
  mysqlconnection.query("UPDATE book SET ? WHERE BookId = ?",[{BookName,Author,Genre,Ratings},BookID],(err,row,fields)=>{

    if(!err)
    {
      console.log("Updated Book");

    }
    else
    {
      console.log("Error in creating record");
      console.log(err);
    }
  })
  res.send("Updated the Book record.");
})

app.delete('/deletebook',(req,res)=>{
  const BookID:number=req.body.BookID;
  mysqlconnection.query("DELETE from book WHERE BookId = ?",[BookID],(err,row,fields)=>{

    if(!err)
    {
      console.log("Deleted Book");

    }
    else
    {
      console.log("Error in creating record");
      console.log(err);
    }
  })
  res.send("Deleted the Book");

})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})