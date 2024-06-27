const express = require("express");
const app=express();
const connectToDatabase=require("./db");
require("dotenv").config()


const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.send("Welcome to my hotel  how i can help you")
})


//importing the routs file
const personRoutes = require("./Routs/PersonRouts")
const menuRouts = require("./Routs/menuRouts")

//Use routs
app.use('/person',personRoutes)
app.use('/menu',menuRouts)


app.listen(process.env.PORT,async()=>{
    
    await connectToDatabase()
    console.log("Server Started on PORT NO:",process.env.PORT)
})