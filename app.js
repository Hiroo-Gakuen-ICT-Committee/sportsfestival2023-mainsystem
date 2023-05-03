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
    connection.query(
      "SELECT * FROM pointsmh1",
      (error,results) =>{
        connection.query(
          "SELECT * FROM pointsmh2",
          (error,results2) =>{
            connection.query(
              "SELECT * FROM pointsmh3",
              (error,results3) =>{
                connection.query(
                  "SELECT * FROM plus1",
                  (error,results4) =>{
                    connection.query(
                      "SELECT * FROM plus2",
                      (error,results5) =>{
                        connection.query(
                          "SELECT * FROM plus3",
                          (error,results6) =>{
                            res.render("index.ejs",{points1:results,points2:results2,points3:results3,plus1:results4,plus2:results5,plus3:results6});
                          }
                        )
                          }
                    )
                    }
                    ); 
              }
            );
          }
        );
      }
  );
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
  var arr =[
  {class:"first", time:req.body.time1,},
  {class:"second",time:req.body.time2,}, 
  {class:"third",time:req.body.time3,},
  {class:"fourth",time:req.body.time4,},
  {class:"fifth",time:req.body.time5,},
  {class:"sixth",time:req.body.time6,},
  {class:"seventh",time:req.body.time7,},
];
  var sorted = arr.slice().sort(function(a,b)
  {return b.time-a.time });
  
  var ranks = arr.slice().map(function(x){
    return sorted.indexOf(x) + 1
  });
  if (req.body.grade=="M1"){
    connection.query(
      "INSERT INTO results (compname,grade,time1,time2,time3,time4,time5,time6,time7,rank1,rank2,rank3,rank4,rank5,rank6,rank7) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.competition,
        req.body.grade,
        req.body.time1,
        req.body.time2,
        req.body.time3,
        req.body.time4,
        req.body.time5,
        req.body.time6,
        req.body.time7,
        sorted[0].class,
        sorted[1].class,
        sorted[2].class,
        sorted[3].class,
        sorted[4].class,
        sorted[5].class,
        sorted[6].class,
      ],
      (errow,results) =>{
        connection.query(
          "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
              [req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
                req.body.competition,
              ],
            (errow,results2) =>{
              connection.query(
              "INSERT INTO pointsmh1 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results  ORDER BY id DESC LIMIT 1   ",
              [
                sorted[0].class,
                sorted[1].class,
                sorted[2].class,
                sorted[3].class,
                sorted[4].class,
                sorted[5].class,
                sorted[6].class,
              ],
              (error,results4) =>{
                connection.query(
                  "UPDATE plus1 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                  (error,results5 )=> {
                    res.redirect("/manage");
                  } 
                    );
              }
                
                );});
          }); 
      } else if (req.body.grade =="M2") {
        connection.query(
          "INSERT INTO results (compname,grade,time1,time2,time3,time4,time5,time6,time7,rank1,rank2,rank3,rank4,rank5,rank6,rank7) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            req.body.competition,
            req.body.grade,
            req.body.time1,
            req.body.time2,
            req.body.time3,
            req.body.time4,
            req.body.time5,
            req.body.time6,
            req.body.time7,
            sorted[0].class,
            sorted[1].class,
            sorted[2].class,
            sorted[3].class,
            sorted[4].class,
            sorted[5].class,
            sorted[6].class,
          ],
          (errow,results) =>{
            connection.query(
              "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
                  [req.body.competition,
                    req.body.competition,
                    req.body.competition,
                    req.body.competition,
                    req.body.competition,
                    req.body.competition,
                    req.body.competition,
                  ],
                (errow,results2) =>{
                  connection.query(
                  "INSERT INTO pointsmh2 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results  ORDER BY id DESC LIMIT 1   ",
                  [
                    sorted[0].class,
                    sorted[1].class,
                    sorted[2].class,
                    sorted[3].class,
                    sorted[4].class,
                    sorted[5].class,
                    sorted[6].class,
                  ],
                  (error,results4) =>{
                    connection.query(
                      "UPDATE plus2 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                      (error,results5 )=> {
                        res.redirect("/manage");
                      } 
                        );
                  }
                    
                    );});
              }); 

      } else {
        connection.query(
          "INSERT INTO results (compname,grade,time1,time2,time3,time4,time5,time6,time7,rank1,rank2,rank3,rank4,rank5,rank6,rank7) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            req.body.competition,
            req.body.grade,
            req.body.time1,
            req.body.time2,
            req.body.time3,
            req.body.time4,
            req.body.time5,
            req.body.time6,
            req.body.time7,
            sorted[0].class,
            sorted[1].class,
            sorted[2].class,
            sorted[3].class,
            sorted[4].class,
            sorted[5].class,
            sorted[6].class,
          ],
          (errow,results) =>{
            connection.query(
              "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
                  [req.body.competition,
                    req.body.competition,
                    req.body.competition,
                    req.body.competition,
                    req.body.competition,
                    req.body.competition,
                    req.body.competition,
                  ],
                (errow,results2) =>{
                  connection.query(
                  "INSERT INTO pointsmh3 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results  ORDER BY id DESC LIMIT 1   ",
                  [
                    sorted[0].class,
                    sorted[1].class,
                    sorted[2].class,
                    sorted[3].class,
                    sorted[4].class,
                    sorted[5].class,
                    sorted[6].class,
                  ],
                  (error,results4) =>{
                    connection.query(
                      "UPDATE plus3 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                      (error,results5 )=> {
                        res.redirect("/manage");
                      } 
                        );
                  }
                    
                    );});
              }); 
      }
    });
    app.post("/classrenew",(req,res) =>{
      connection.query(
        
      )
    }

    );


app.listen(3000);