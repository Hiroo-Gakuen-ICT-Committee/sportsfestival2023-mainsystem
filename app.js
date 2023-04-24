const express = require("express");
const app = express();
var http = require('http');
var fs   = require('fs');
var bodyParser = require("body-parser");
var path = require('path');
app.use(bodyParser.json());
app.use(express.static("public"));
const mysql = require('mysql');
const { error } = require("console");
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Daybreak2359',
  database: 'sportsfestival'
});

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
app.get("/setting",(req,res) =>{
  res.render("setting.ejs");
}
)
app.post("/setting",(req,res) =>{
  connection.query(
    "INSERT INTO setting (competitiontitle,midhigh,subject,point1,point2,point3,point4,point5,point6,point7,point8) VALUES (?,?,?,?,?,?,?,?,?,?,?);",
    [
      req.body.competition1,
      req.body.grade,
      req.body.kinds,
      req.body.point1,
      req.body.point2,
      req.body.point3,
      req.body.point4,
      req.body.point5,
      req.body.point6,
      req.body.point7,
      req.body.point8,
    ],
    (errow,results) =>{
      console.log("neet");      
      res.render("setting.ejs");
    }
  );
});


app.listen(3000);