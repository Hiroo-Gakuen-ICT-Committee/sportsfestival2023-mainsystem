const express = require("express");
const app = express();
var http = require('http');
var fs   = require('fs');
var bodyParser = require("body-parser");
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
const mysql = require('mysql2');
const { error } = require("console");
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Daybreak2359',
  database: 'sportsfestival',
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
  connection.query(
      "SELECT * FROM setting",
      (error,results) =>{
        res.render("manage.ejs",{settings:results});
      }
  );
}
);
app.get("/setting",(req,res) =>{
  connection.query(
    "SELECT * FROM setting",
    (error,results) =>{
      res.render("setting.ejs",{settings: results});
    }
  )
  
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
      res.redirect("/setting");
    }
  );
});
app.post("/classscore",(req,res) =>{
    connection.query(
      "INSERT INTO results (compname,grade,time1,rank1,time2,rank2,time3,rank3,time4,rank4,time5,rank5,time6,rank6,time7,rank7,time8,rank8) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.competition,
        req.body.grade,
        req.body.time1,
        req.body.ranking1,
        req.body.time2,
        req.body.ranking2,
        req.body.time3,
        req.body.ranking3,
        req.body.time4,
        req.body.ranking4,
        req.body.time5,
        req.body.ranking5,
        req.body.time6,
        req.body.ranking6,
        req.body.time7,
        req.body.ranking7,
        req.body.time8,
        req.body.ranking8,
      ],
      (errow,results) =>{
        connection.query(
          "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?),point8=(SELECT point8 FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
              [req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
              ],
            (errow,results2) =>{
              connection.query(
              "INSERT INTO pointsmh1 (competition,??,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7,point8 FROM results  ORDER BY id DESC LIMIT 1   ",
              [
                req.body.ranking1,
                req.body.ranking2,
                req.body.ranking3,
                req.body.ranking4,
                req.body.ranking5,
                req.body.ranking6,
                req.body.ranking7,
                req.body.ranking8,
              ],
              (error,results4) =>{
                console.log(error);
                res.redirect("/manage");
              }
                
                );
            }
        );
          }   
          ); 
      }
    );


app.listen(3000);