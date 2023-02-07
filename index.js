// importing express package
const express = require("express");
const mongoose = require("mongoose");

// initializing express
const app = express();

// Setting Up connection to mongodb atlas server
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://sachinyadav1469:Sachin%40123@cluster0.my3twen.mongodb.net/pooling?retryWrites=true&w=majority')
        .then(result=>{
            app.listen(8000);
        })
        .catch(err=>{
            console.log("Unable to connect to db");
        })


const bodyParser = require("body-parser");


// Body Parser Initialization
app.use(bodyParser.urlencoded({extended: false,}));
// To parse the requests json data
app.use(bodyParser.json());

// Routes Middleware
app.use("/question",require("./routes/question-route"));
app.use("/options",require("./routes/options-route"));

app.use("/",(req,res,next)=>{
    res.status(400).json({
        "message":"Route Not Found"
    })
})

