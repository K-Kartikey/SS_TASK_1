import bodyParser = require('body-parser');
import * as express from 'express';
import {DataTypes, Sequelize} from 'sequelize';

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());


const sequelize= new Sequelize('SS_Books_New','root','kamalkamal2910',{
    dialect:'mysql',
    host:'localhost'
});

const Book = sequelize.define("book",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true,
    },
    bookName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ratings: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    
});


// Creating the table using sequelize
sequelize
 .sync()
 .then((result)=>{
    console.log(result);
 }).catch((err)=>{
    console.log(err);
 })

//  By default, Sequelize automatically adds the fields createdAt and updatedAt to every model, using the data type DataTypes.DATE. Those fields are automatically managed as well - whenever you use Sequelize to create or update something, those fields will be set correctly. The createdAt field will contain the timestamp representing the moment of creation, and the updatedAt will contain the timestamp of the latest update. ~ Sequelize documentation.

// Status Check using GET Req.
app.get('/status',(req,res)=>{
    res.json({
        Status: "Connected to Books API."
    });
});

// All Books Details using GET Req.
app.get('/',(req,res)=>{
    Book.findAll()
     .then((data)=>{
        res.send(data);
     })
     .catch((err)=>{
        console.log(err);
        res.send(err);
     })
});

// Get Single Book Detail using GET Req.
app.get('/:id',(req,res)=>{
    const id=req.params.id;
    Book.findByPk(id)
     .then((data)=>{
        res.send(data);
     })
     .catch((err)=>{
        console.log(err);
        res.send(err);
     })
});

// creating a Book record using POST req.
app.post('/createbook',(req,res)=>{
    if(!req.body.bookName){
        res.send("Content cannot be empty.");
    }
    else{
        const response=req.body;
        Book.create(response)
         .then((data)=>{
            res.send(data);
         })
         .catch((err)=>{
            res.send(err);
         });
    }
});

// Updating Record using Patch req.
app.patch('/update/:id',(req,res)=>{
    if(!req.body){
        res.send("Content cannot be empty.");
    }
    else{
        const id=req.params.id;
        const response=req.body;
        Book.update(response,{
            where: {id:id}
        })
         .then((num)=>{
            if(+num===1){
                res.send("Record updated Sucessfully.")
            }
            else{
                res.send("Already updated the record or no record found for that id.")
            }
         })
         .catch((err)=>{
            res.send(err);
         });
    }
})

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    Book.destroy({
        where: {id:id}
    })
     .then((num)=>{
        if(+num===1){
            res.send("Record deleted Sucessfully.")
        }
        else{
            res.send("Already deleted the record or no record found for that id.")
        }
     })
     .catch((err)=>{
        res.send(err);
     });
})

app.listen(2000,()=>{
    console.log("The application is listening on port 2000!");
})
