
//Importing required Files
require("dotenv").config();
const express = require("express");
const dbCon = require("./app/config/dbConnection");
const path = require("path");
const cookieParser = require("cookie-parser");


//Executing required functions
const app = express();
dbCon();


//Parse Form & JSON data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());


//Serve Static Files
app.use(express.static(path.join(__dirname,"uploads")));
app.use(express.static(path.join(__dirname,"public")));

// Router Files
const userRouter = require("./app/router/userRouter");
app.use(userRouter);


//Creating Server
const port = 8080 || process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server started at ${port}`);
});