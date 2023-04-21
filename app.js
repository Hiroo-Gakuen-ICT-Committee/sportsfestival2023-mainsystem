const express = require("express");
const app = express();
var http = require('http');
var fs   = require('fs');
var path = require('path');
app.use(express.static("public"));
app.use(
   express.urlencoded({
     extended: false,
   })
 );
app.get("/",(req,res) => {
   res.render("index.ejs");
}
);
app.get("/manage",(req,res) =>{
  res.render("manage.ejs");
}
);
app.listen(3000);