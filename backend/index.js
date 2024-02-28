const express = require("express");
const port = process.env.PORT || 8000;
const cors = require("cors");
const app = express();  
const db = require("./src/config/connection");
const path = require('path');
const knex = require('knex');

 

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set("view engine", 'ejs');
app.set("views" , path.join(__dirname,'views'));

 

app.listen(port, function(err){
  if(err){
    console.log('something went wrong!!!')    
    return;
  }
  else{
    console.log('server running on port: ' , port)
  } 
})
  

app.use(cors());
app.use("/user", require("./src/routes/userRoutes")); 
app.use("/student", require("./src/routes/studentRoutes")); 
app.use("/admin", require("./src/routes/adminRoutes")); 