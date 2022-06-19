import * as express from 'express';
import * as mysql2 from 'mysql2';
import * as bodyparser from 'body-parser';

const app = express();
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

// app.post('/create',(req,res)=>{
//   req.body()
// });



app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})