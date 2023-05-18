const express = require("express");
const app = express();
var http = require('http');
var fs   = require('fs');
var bodyParser = require("body-parser");
var path = require('path');
const session = require('express-session');
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
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
   express.urlencoded({
     extended: false,
   })
 );
app.get("/login",(req,res) =>{
  let sessionid = req.session.ID
    res.render("login.ejs");
});

app.post("/login",(req,res) =>{
    const username=req.body.username;
    const password=req.body.password;
    if (username==="hirogaku2023" && password==="20spofess23") {
      req.session.regenerate((err) => {
        req.session.username = 'hirogaku2023';
        req.session.password='20spofess23';
        res.redirect('/');
      });
    } else if (username==="liborpe2023" && password==="05manage25") {
      req.session.username ='liborpe2023';
      req.session.password ='05manage25';
      res.redirect("/manage");
    } else if (username==="mastersback2023" && password==="21brainsosmall37") {
      req.session.username='mastersback2023';
      req.session.password='21brainsosmall37';
      res.redirect("/setting");
    } else{
      res.redirect("login");
    }
});
app.get("/",(req,res) => {
    if (req.session.username=="hirogaku2023" && req.session.password=="20spofess23") {
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
                              connection.query(
                                "SELECT * FROM pointscolor ORDER BY competition LIKE 'M%'",
                                (error,results7) =>{
                                  connection.query(
                                    "SELECT * FROM pluscolor",
                                    (error,results8) =>{
                                      res.render("index.ejs",{points1:results,points2:results2,points3:results3,plus1:results4,plus2:results5,plus3:results6,colors:results7,pluscolor:results8});
                                    }
                                  );
                                }
                              );
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
    } else {
      res.redirect("/login");
    }
}
);
app.get("/manage",(req,res) =>{
  if (req.session.username=="liborpe2023" && req.session.password=="05manage25") {
    connection.query(
      "SELECT * FROM setting",
      (error,results9) =>{
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
                                connection.query(
                                  "SELECT * FROM pointscolor ORDER BY competition LIKE 'M%'",
                                  (error,results7) =>{
                                    connection.query(
                                      "SELECT * FROM pluscolor",
                                      (error,results8) =>{
                                        connection.query(
                                            "SELECT * FROM results",
                                            (error,results9) =>{
                                              res.render("manage.ejs",{settings:results9,points1:results,points2:results2,points3:results3,plus1:results4,plus2:results5,plus3:results6,colors:results7,pluscolor:results8,compresults:results9});
                                            }
                                        );
                                        }
                                    );
                                  }
                                );
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
  } else {
    res.redirect("/login");
  }
  
}
);
app.get("/setting",(req,res) =>{
  if (req.session.username=="mastersback2023" && req.session.password=="21brainsosmall37") {
    connection.query(
      "SELECT * FROM setting",
      (error,results) =>{
        res.render("setting.ejs",{settings: results});
      }
    );
  } else {
    res.redirect("/login");
  }
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
app.post("/colorsetting",(req,res) =>{
    connection.query(
      "INSERT INTO colorsetting (colorm11,colorm12,colorm13,colorm14,colorm15,colorm16,colorm17,colorm21,colorm22,colorm23,colorm24,colorm25,colorm26,colorm27,colorm31,colorm32,colorm33,colorm34,colorm35,colorm36,colorm37) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.color11,
        req.body.color12,
        req.body.color13,
        req.body.color14,
        req.body.color15,
        req.body.color16,
        req.body.color17,
        req.body.color21,
        req.body.color22,
        req.body.color23,
        req.body.color24,
        req.body.color25,
        req.body.color26,
        req.body.color27,
        req.body.color31,
        req.body.color32,
        req.body.color33,
        req.body.color34,
        req.body.color35,
        req.body.color36,
        req.body.color37,
      ],
      (error,results) =>{
        connection.query(
          "UPDATE colorsetting SET plusm11=(SELECT first FROM plus1),plusm12=(SELECT second FROM plus1),plusm13=(SELECT third FROM plus3),plusm14=(SELECT fourth FROM plus1),plusm15=(SELECT fifth FROM plus1),plusm16=(SELECT sixth FROM plus1),plusm17=(SELECT seventh FROM plus1),plusm21=(SELECT first FROM plus2),plusm22=(SELECT second FROM plus2),plusm23=(SELECT third FROM plus2),plusm24=(SELECT fourth FROM plus2),plusm25=(SELECT fifth FROM plus2),plusm26=(SELECT sixth FROM plus2),plusm27=(SELECT seventh FROM plus2),plusm31=(SELECT first FROM plus3),plusm32=(SELECT second FROM plus3),plusm33=(SELECT third FROM plus3),plusm34=(SELECT fourth FROM plus3),plusm35=(SELECT fifth FROM plus3),plusm36=(SELECT sixth FROM plus3),plusm37=(SELECT seventh FROM plus3)",
          (error,results2) =>{
            connection.query(
              "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M1',plusm11,plusm12,plusm13,plusm14,plusm15,plusm16,plusm17 FROM colorsetting",
              [
                req.body.color11,
                req.body.color12,
                req.body.color13,
                req.body.color14,
                req.body.color15,
                req.body.color16,
                req.body.color17,
              ],
              (error,results3) =>{
                connection.query(
                  "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M2',plusm21,plusm22,plusm23,plusm24,plusm25,plusm26,plusm27 FROM colorsetting",
                  [
                    req.body.color21,
                    req.body.color22,
                    req.body.color23,
                    req.body.color24,
                    req.body.color25,
                    req.body.color26,
                    req.body.color27,
                  ],
                  (error,results4) =>{
                    connection.query(
                      "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M3',plusm31,plusm32,plusm33,plusm34,plusm35,plusm36,plusm37 FROM colorsetting",
                      [
                        req.body.color31,
                        req.body.color32,
                        req.body.color33,
                        req.body.color34,
                        req.body.color35,
                        req.body.color36,
                        req.body.color37,
                      ],
                      (error,results5) =>{
                        connection.query(
                          "INSERT INTO pluscolor (red,orange,yellow,green,blue,purple,black) SELECT SUM(red),SUM(orange),SUM(yellow),SUM(green),SUM(blue),SUM(purple),SUM(black) FROM pointscolor",
                          (error,results6) =>{
                          res.redirect("/setting");
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
    )
}

);
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
  {return a.time-b.time });
  
  var ranks = arr.slice().map(function(x){
    return sorted.indexOf(x) + 1
  });
  var sorted2 = arr.slice().sort(function(a,b)
      {return b.time-a.time});
  if (req.body.competition=="大縄跳び") {
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
          sorted2[0].class,
          sorted2[1].class,
          sorted2[2].class,
          sorted2[3].class,
          sorted2[4].class,
          sorted2[5].class,
          sorted2[6].class,
        ],
        (errow,results) =>{
          connection.query(
            "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?),subject=(SELECT subject FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
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
                "INSERT INTO pointsmh1 (competition,??,??,??,??,??,??,??,subject) SELECT compname,point1,point2,point3,point4,point5,point6,point7,subject FROM results  ORDER BY id DESC LIMIT 1   ",
                [
                  sorted2[0].class,
                  sorted2[1].class,
                  sorted2[2].class,
                  sorted2[3].class,
                  sorted2[4].class,
                  sorted2[5].class,
                  sorted2[6].class,
                ],
                (error,results4) =>{
                  connection.query(
                    "UPDATE plus1 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                    (error,results5 )=> {
                        connection.query(
                          "SELECT subject FROM pointsmh1 ORDER BY id DESC LIMIT 1",
                          (error,results6) =>{
                            if (results6[0].subject=="double"){
                              connection.query(
                                "SELECT colorm11,colorm12,colorm13,colorm14,colorm15,colorm16,colorm17 FROM colorsetting",
                                (error,results7) =>{
                                  connection.query(
                                    "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT competition,first,second,third,fourth,fifth,sixth,seventh FROM pointsmh3 WHERE competition=?",
                                    [
                                      results7[0].colorm11,
                                      results7[0].colorm12,
                                      results7[0].colorm13,
                                      results7[0].colorm14,
                                      results7[0].colorm15,
                                      results7[0].colorm16,
                                      results7[0].colorm17,
                                      req.body.competition,
                                    ],
                                    (error,results8) =>{
                                      connection.query(
                                        "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                        (error,results10) =>{
                                          res.redirect("/manage");
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            } else {
                              res.redirect("/manage");
                            }
                          }
                        )
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
              sorted2[0].class,
              sorted2[1].class,
              sorted2[2].class,
              sorted2[3].class,
              sorted2[4].class,
              sorted2[5].class,
              sorted2[6].class,
            ],
            (errow,results) =>{
              connection.query(
                "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?),subject=(SELECT subject FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
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
                    "INSERT INTO pointsmh2 (competition,??,??,??,??,??,??,??,subject) SELECT compname,point1,point2,point3,point4,point5,point6,point7,subject FROM results  ORDER BY id DESC LIMIT 1   ",
                    [
                      sorted2[0].class,
                      sorted2[1].class,
                      sorted2[2].class,
                      sorted2[3].class,
                      sorted2[4].class,
                      sorted2[5].class,
                      sorted2[6].class,
                    ],
                    (error,results4) =>{
                      connection.query(
                        "UPDATE plus2 SET first=(SELECT SUM(first) FROM pointsmh2),second=(SELECT SUM(second) FROM pointsmh2),third=(SELECT SUM(third) FROM pointsmh2),fourth=(SELECT SUM(fourth) FROM pointsmh2),fifth=(SELECT SUM(fifth) FROM pointsmh2),sixth=(SELECT SUM(sixth) FROM pointsmh2),seventh=(SELECT SUM(seventh) FROM pointsmh2)",
                        (error,results5 )=> {
                          connection.query(
                            "SELECT subject FROM pointsmh2 ORDER BY id DESC LIMIT 1",
                                (error,results6) =>{
                              if (results6[0].subject=="double"){
                                connection.query(
                                  "SELECT colorm21,colorm22,colorm23,colorm24,colorm25,colorm26,colorm27 FROM colorsetting",
                                  (error,results7) =>{
                                    connection.query(
                                      "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT competition,first,second,third,fourth,fifth,sixth,seventh FROM pointsmh3 WHERE competition=?",
                                      [
                                        results7[0].colorm21,
                                        results7[0].colorm22,
                                        results7[0].colorm23,
                                        results7[0].colorm24,
                                        results7[0].colorm25,
                                        results7[0].colorm26,
                                        results7[0].colorm27,
                                        req.body.competition,
                                      ],
                                      (error,results8) =>{
                                        connection.query(
                                          "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                          (error,results10) =>{
                                            res.redirect("/manage");
                                            console.log(results6[0].subject);
                                            console.log(results7[0].colorm21);
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              } else {
                                res.redirect("/manage");
                              }
                            }
                          )
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
              sorted2[0].class,
              sorted2[1].class,
              sorted2[2].class,
              sorted2[3].class,
              sorted2[4].class,
              sorted2[5].class,
              sorted2[6].class,
            ],
            (errow,results) =>{
              connection.query(
                "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?),subject=(SELECT subject FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
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
                    "INSERT INTO pointsmh3 (competition,??,??,??,??,??,??,??,subject) SELECT compname,point1,point2,point3,point4,point5,point6,point7,subject FROM results  ORDER BY id DESC LIMIT 1   ",
                    [
                      sorted2[0].class,
                      sorted2[1].class,
                      sorted2[2].class,
                      sorted2[3].class,
                      sorted2[4].class,
                      sorted2[5].class,
                      sorted2[6].class,
                    ],
                    (error,results4) =>{
                      connection.query(
                        "UPDATE plus3 SET first=(SELECT SUM(first) FROM pointsmh3),second=(SELECT SUM(second) FROM pointsmh3),third=(SELECT SUM(third) FROM pointsmh3),fourth=(SELECT SUM(fourth) FROM pointsmh3),fifth=(SELECT SUM(fifth) FROM pointsmh3),sixth=(SELECT SUM(sixth) FROM pointsmh3),seventh=(SELECT SUM(seventh) FROM pointsmh3)",
                        (error,results5 )=> {
                          connection.query(
                            "SELECT * FROM pointsmh3 ORDER BY id DESC LIMIT 1",
                            (error,results6) =>{
                              if (results6[0].subject=="double"){
                                connection.query(
                                  "SELECT colorm31,colorm32,colorm33,colorm34,colorm35,colorm36,colorm37 FROM colorsetting",
                                  (error,results7) =>{
                                    connection.query(
                                      "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT competition,first,second,third,fourth,fifth,sixth,seventh FROM pointsmh3 WHERE competition=?",
                                      [
                                        results7[0].colorm31,
                                        results7[0].colorm32,
                                        results7[0].colorm33,
                                        results7[0].colorm34,
                                        results7[0].colorm35,
                                        results7[0].colorm36,
                                        results7[0].colorm37,
                                        req.body.competition,
                                      ],
                                      (error,results8) =>{
                                        connection.query(
                                          "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                          (error,results10) =>{
                                            res.redirect("/manage");
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              } else {
                                res.redirect("/manage");
                              }
                            }
                          )
                    }
                      
                      );});
                }); 
        }
          );
  } } else {
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
            "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?),subject=(SELECT subject FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
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
                "INSERT INTO pointsmh1 (competition,??,??,??,??,??,??,??,subject) SELECT compname,point1,point2,point3,point4,point5,point6,point7,subject FROM results  ORDER BY id DESC LIMIT 1   ",
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
                      connection.query(
                        "SELECT * FROM pointsmh1 ORDER BY id DESC LIMIT 1",
                        (error,results6) =>{
                          if (results6[0].subject=="double"){
                            connection.query(
                              "SELECT colorm11,colorm12,colorm13,colorm14,colorm15,colorm16,colorm17 FROM colorsetting",
                              (error,results7) =>{
                                connection.query(
                                  "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT competition,first,second,third,fourth,fifth,sixth,seventh FROM pointsmh3 WHERE competition=?",
                                  [
                                    results7[0].colorm11,
                                    results7[0].colorm12,
                                    results7[0].colorm13,
                                    results7[0].colorm14,
                                    results7[0].colorm15,
                                    results7[0].colorm16,
                                    results7[0].colorm17,
                                    req.body.competition,
                                  ],
                                  (error,results8) =>{
                                    connection.query(
                                      "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                      (error,results10) =>{
                                        res.redirect("/manage");
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          } else {
                            res.redirect("/manage");
                          }
                        }
                      )
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
                "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?),subject=(SELECT subject FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
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
                    "INSERT INTO pointsmh2 (competition,??,??,??,??,??,??,??,subject) SELECT compname,point1,point2,point3,point4,point5,point6,point7,subject FROM results  ORDER BY id DESC LIMIT 1   ",
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
                        "UPDATE plus2 SET first=(SELECT SUM(first) FROM pointsmh2),second=(SELECT SUM(second) FROM pointsmh2),third=(SELECT SUM(third) FROM pointsmh2),fourth=(SELECT SUM(fourth) FROM pointsmh2),fifth=(SELECT SUM(fifth) FROM pointsmh2),sixth=(SELECT SUM(sixth) FROM pointsmh2),seventh=(SELECT SUM(seventh) FROM pointsmh2)",
                        (error,results5 )=> {
                          connection.query(
                            "SELECT * FROM pointsmh2 ORDER BY id DESC LIMIT 1",
                            (error,results6) =>{
                              if (results6[0].subject=="double"){
                                connection.query(
                                  "SELECT colorm21,colorm22,colorm23,colorm24,colorm25,colorm26,colorm27 FROM colorsetting",
                                  (error,results7) =>{
                                    connection.query(
                                      "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT competition,first,second,third,fourth,fifth,sixth,seventh FROM pointsmh3 WHERE competition=?",
                                      [
                                        results7[0].colorm21,
                                        results7[0].colorm22,
                                        results7[0].colorm23,
                                        results7[0].colorm24,
                                        results7[0].colorm25,
                                        results7[0].colorm26,
                                        results7[0].colorm27,
                                        req.body.competition,
                                      ],
                                      (error,results8) =>{
                                        connection.query(
                                          "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                          (error,results10) =>{
                                            res.redirect("/manage");
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              } else {
                                res.redirect("/manage");
                              }
                            }
                          )
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
                "UPDATE results SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?),subject=(SELECT subject FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
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
                    "INSERT INTO pointsmh3 (competition,??,??,??,??,??,??,??,subject) SELECT compname,point1,point2,point3,point4,point5,point6,point7,subject FROM results  ORDER BY id DESC LIMIT 1   ",
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
                        "UPDATE plus3 SET first=(SELECT SUM(first) FROM pointsmh3),second=(SELECT SUM(second) FROM pointsmh3),third=(SELECT SUM(third) FROM pointsmh3),fourth=(SELECT SUM(fourth) FROM pointsmh3),fifth=(SELECT SUM(fifth) FROM pointsmh3),sixth=(SELECT SUM(sixth) FROM pointsmh3),seventh=(SELECT SUM(seventh) FROM pointsmh3)",
                        (error,results5 )=> {
                          connection.query(
                            "SELECT * FROM pointsmh3 ORDER BY id DESC LIMIT 1",
                            (error,results6) =>{
                              if (results6[0].subject=="double"){
                                  connection.query(
                                  "SELECT colorm31,colorm32,colorm33,colorm34,colorm35,colorm36,colorm37 FROM colorsetting",
                                  (error,results7) =>{
                                    connection.query(
                                      "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT competition,first,second,third,fourth,fifth,sixth,seventh FROM pointsmh3 WHERE competition=?",
                                      [
                                        results7[0].colorm31,
                                        results7[0].colorm32,
                                        results7[0].colorm33,
                                        results7[0].colorm34,
                                        results7[0].colorm35,
                                        results7[0].colorm36,
                                        results7[0].colorm37,
                                        req.body.competition,
                                      ],
                                      (error,results8) =>{
                                        connection.query(
                                          "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                          (error,results10) =>{
                                            console.log(error);
                                            console.log(results7[0].colorm31);
                                            res.redirect("/manage");
                                        
                                          }
                                        );
                                    }
                                    );
                                  }
                                );
                              } else {
                                res.redirect("/manage");
                              }
                            }
                          )
                        } 
                          );
                    }
                      
                      );});
                }); 
        }
  }
    
}); 
            
app.post("/colorscore",(req,res) =>{
  var arr =[
    {class:"red", time:req.body.time1,},
    {class:"orange",time:req.body.time2,}, 
    {class:"yellow",time:req.body.time3,},
    {class:"green",time:req.body.time4,},
    {class:"blue",time:req.body.time5,},
    {class:"purple",time:req.body.time6,},
    {class:"black",time:req.body.time7,},
  ];
    var sorted = arr.slice().sort(function(a,b)
    {return a.time-b.time });
    
    var ranks = arr.slice().map(function(x){
      return sorted.indexOf(x) + 1
    });
    connection.query(
        "INSERT INTO colorresults (compname,time1,time2,time3,time4,time5,time6,time7,rank1,rank2,rank3,rank4,rank5,rank6,rank7) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.competition,
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
            "UPDATE colorresults SET point1=(SELECT point1 FROM setting WHERE competitiontitle=?),point2=(SELECT point2 FROM setting WHERE competitiontitle=?),point3=(SELECT point3 FROM setting WHERE competitiontitle=?),point4=(SELECT point4 FROM setting WHERE competitiontitle=?),point5=(SELECT point5 FROM setting WHERE competitiontitle=?),point6=(SELECT point6 FROM setting WHERE competitiontitle=?),point7=(SELECT point7 FROM setting WHERE competitiontitle=?) ORDER BY id DESC LIMIT 1 ",
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
                "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM colorresults  ORDER BY id DESC LIMIT 1   ",
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
                    "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                    (error,results10) =>{
                      res.redirect("/manage");
                    }
                  );
                }
                  
                  );});
            }); 

});
  

app.post("/classrenew",(req,res) =>{
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
    {return a.time-b.time });
    
    var ranks = arr.slice().map(function(x){
      return sorted.indexOf(x) + 1
    });
    var sorted2 = arr.slice().sort(function(a,b)
      {return b.time-a.time});
  if (req.body.competition=="大縄跳び"){
    if (req.body.grade =="M1"){
      connection.query(
        "UPDATE results SET time1=?,time2=?,time3=?,time4=?,time5=?,time6=?,time7=?,rank1=?,rank2=?,rank3=?,rank4=?,rank5=?,rank6=?,rank7=? WHERE compname=?,grade=?",
        [
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
        req.body.competition,
        req.body.grade,
        ],
        (error,results) => {
          connection.query(
            "DELETE FROM pointsmh1 WHERE competition=?",
            [req.body.competition],
            (error,results2) =>{
              connection.query(
                "INSERT INTO pointsmh1 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results WHERE compname=?   ",
                [
                  sorted[0].class,
                  sorted[1].class,
                  sorted[2].class,
                  sorted[3].class,
                  sorted[4].class,
                  sorted[5].class,
                  sorted[6].class,
                  req.body.competition,
                ],
                (error,results3) =>{
                  connection.query(
                    "UPDATE plus1 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                    (error,results5)=> {
                      connection.query(
                        "UPDATE colorsetting SET plusm11=(SELECT first FROM plus1),plusm12=(SELECT second FROM plus1),plusm13=(SELECT third FROM plus3),plusm14=(SELECT fourth FROM plus1),plusm15=(SELECT fifth FROM plus1),plusm16=(SELECT sixth FROM plus1),plusm17=(SELECT seventh FROM plus1),plusm21=(SELECT first FROM plus2),plusm22=(SELECT second FROM plus2),plusm23=(SELECT third FROM plus2),plusm24=(SELECT fourth FROM plus2),plusm25=(SELECT fifth FROM plus2),plusm26=(SELECT sixth FROM plus2),plusm27=(SELECT seventh FROM plus2),plusm31=(SELECT first FROM plus3),plusm32=(SELECT second FROM plus3),plusm33=(SELECT third FROM plus3),plusm34=(SELECT fourth FROM plus3),plusm35=(SELECT fifth FROM plus3),plusm36=(SELECT sixth FROM plus3),plusm37=(SELECT seventh FROM plus3)",
                        (error,results6) =>{
                          connection.query(
                            "DELETE FROM pointscolor WHERE competition='M1'",
                            (error,results7)=>{
                              connection.query(
                                "SELECT colorm11,colorm12,colorm13,colorm14,colorm15,colorm16,colorm17 FROM colorsetting",
                                (error,results8) =>{
                                  connection.query(
                                    "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M1',plusm11,plusm12,plusm13,plusm14,plusm15,plusm16,plusm17 FROM colorsetting",
                                    [
                                      results8[0].colorm11,
                                      results8[0].colorm12,
                                      results8[0].colorm13,
                                      results8[0].colorm14,
                                      results8[0].colorm15,
                                      results8[0].colorm16,
                                      results8[0].colorm17,
                                    ],
                                    (error,results9)  =>{
                                      connection.query(
                                        "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                        (error,results10) =>{
                                          res.redirect("/manage");
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          )
                          }
                          );
                    } 
                      );
                }
              );
            }
          )
        }
      );
    } else if (req.body.grade =="M2"){
      connection.query(
        "UPDATE results SET time1=?,time2=?,time3=?,time4=?,time5=?,time6=?,time7=?,rank1=?,rank2=?,rank3=?,rank4=?,rank5=?,rank6=?,rank7=? WHERE compname=?,grade=?",
        [
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
        req.body.competition,
        req.body.grade,
        ],
        (error,results) => {
          connection.query(
            "DELETE FROM pointsmh2 WHERE competition=?",
            [req.body.competition],
            (error,results2) =>{
              connection.query(
                "INSERT INTO pointsmh2 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results WHERE compname=?   ",
                [
                  sorted[0].class,
                  sorted[1].class,
                  sorted[2].class,
                  sorted[3].class,
                  sorted[4].class,
                  sorted[5].class,
                  sorted[6].class,
                  req.body.competition,
                ],
                (error,results3) =>{
                  connection.query(
                    "UPDATE plus2 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                    (error,results5 )=> {
                      connection.query(
                        "UPDATE colorsetting SET plusm11=(SELECT first FROM plus1),plusm12=(SELECT second FROM plus1),plusm13=(SELECT third FROM plus3),plusm14=(SELECT fourth FROM plus1),plusm15=(SELECT fifth FROM plus1),plusm16=(SELECT sixth FROM plus1),plusm17=(SELECT seventh FROM plus1),plusm21=(SELECT first FROM plus2),plusm22=(SELECT second FROM plus2),plusm23=(SELECT third FROM plus2),plusm24=(SELECT fourth FROM plus2),plusm25=(SELECT fifth FROM plus2),plusm26=(SELECT sixth FROM plus2),plusm27=(SELECT seventh FROM plus2),plusm31=(SELECT first FROM plus3),plusm32=(SELECT second FROM plus3),plusm33=(SELECT third FROM plus3),plusm34=(SELECT fourth FROM plus3),plusm35=(SELECT fifth FROM plus3),plusm36=(SELECT sixth FROM plus3),plusm37=(SELECT seventh FROM plus3)",
                        (error,results6) =>{
                          connection.query(
                            "DELETE FROM pointscolor WHERE competition='M2'",
                            (error,results7)=>{
                              connection.query(
                                "SELECT colorm21,colorm22,colorm23,colorm24,colorm25,colorm26,colorm27 FROM colorsetting",
                                (error,results8) =>{
                                  connection.query(
                                    "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M2',plusm21,plusm22,plusm23,plusm24,plusm25,plusm26,plusm27 FROM colorsetting",
                                    [
                                      results8[0].colorm21,
                                      results8[0].colorm22,
                                      results8[0].colorm23,
                                      results8[0].colorm24,
                                      results8[0].colorm25,
                                      results8[0].colorm26,
                                      results8[0].colorm27,
                                    ],
                                    (error,results9)  =>{
                                      connection.query(
                                        "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                        (error,results10) =>{
                                          res.redirect("/manage");
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          )
                          }
                          );
                    } 
                      );
                }
              );
            }
          )
        }
      );
    } else {
      connection.query(
        "UPDATE results SET time1=?,time2=?,time3=?,time4=?,time5=?,time6=?,time7=?,rank1=?,rank2=?,rank3=?,rank4=?,rank5=?,rank6=?,rank7=? WHERE compname=?,grade=?",
        [
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
        req.body.competition,
        req.body.grade,
        ],
        (error,results) => {
          connection.query(
            "DELETE FROM pointsmh3 WHERE competition=?",
            [req.body.competition],
            (error,results2) =>{
              connection.query(
                "INSERT INTO pointsmh3 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results WHERE compname=?   ",
                [
                  sorted[0].class,
                  sorted[1].class,
                  sorted[2].class,
                  sorted[3].class,
                  sorted[4].class,
                  sorted[5].class,
                  sorted[6].class,
                  req.body.competition,
                ],
                (error,results3) =>{
                  connection.query(
                    "UPDATE plus3 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                    (error,results5 )=> {
                      connection.query(
                        "UPDATE colorsetting SET plusm11=(SELECT first FROM plus1),plusm12=(SELECT second FROM plus1),plusm13=(SELECT third FROM plus3),plusm14=(SELECT fourth FROM plus1),plusm15=(SELECT fifth FROM plus1),plusm16=(SELECT sixth FROM plus1),plusm17=(SELECT seventh FROM plus1),plusm21=(SELECT first FROM plus2),plusm22=(SELECT second FROM plus2),plusm23=(SELECT third FROM plus2),plusm24=(SELECT fourth FROM plus2),plusm25=(SELECT fifth FROM plus2),plusm26=(SELECT sixth FROM plus2),plusm27=(SELECT seventh FROM plus2),plusm31=(SELECT first FROM plus3),plusm32=(SELECT second FROM plus3),plusm33=(SELECT third FROM plus3),plusm34=(SELECT fourth FROM plus3),plusm35=(SELECT fifth FROM plus3),plusm36=(SELECT sixth FROM plus3),plusm37=(SELECT seventh FROM plus3)",
                        (error,results6) =>{
                          connection.query(
                            "DELETE FROM pointscolor WHERE competition='M3'",
                            (error,results7)=>{
                              connection.query(
                                "SELECT colorm31,colorm32,colorm33,colorm34,colorm35,colorm36,colorm37 FROM colorsetting",
                                (error,results8) =>{
                                  connection.query(
                                    "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M3',plusm31,plusm32,plusm33,plusm34,plusm35,plusm36,plusm37 FROM colorsetting",
                                    [
                                      results8[0].colorm31,
                                      results8[0].colorm32,
                                      results8[0].colorm33,
                                      results8[0].colorm34,
                                      results8[0].colorm35,
                                      results8[0].colorm36,
                                      results8[0].colorm37,
                                    ],
                                    (error,results9)  =>{
                                      connection.query(
                                        "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                        (error,results10) =>{
                                          res.redirect("/manage");
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          )
                          }
                          );
                    } 
                      );
                }
              );
            }
          )
        }
      );
    }
  } else {
    if (req.body.grade =="M1"){
      connection.query(
        "UPDATE results SET time1=?,time2=?,time3=?,time4=?,time5=?,time6=?,time7=?,rank1=?,rank2=?,rank3=?,rank4=?,rank5=?,rank6=?,rank7=? WHERE compname=?,grade=?",
        [
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
        req.body.competition,
        req.body.grade,
        ],
        (error,results) => {
          connection.query(
            "DELETE FROM pointsmh1 WHERE competition=?",
            [req.body.competition],
            (error,results2) =>{
              connection.query(
                "INSERT INTO pointsmh1 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results WHERE compname=?   ",
                [
                  sorted[0].class,
                  sorted[1].class,
                  sorted[2].class,
                  sorted[3].class,
                  sorted[4].class,
                  sorted[5].class,
                  sorted[6].class,
                  req.body.competition,
                ],
                (error,results3) =>{
                  connection.query(
                    "UPDATE plus1 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                    (error,results5 )=> {
                      connection.query(
                        "UPDATE colorsetting SET plusm11=(SELECT first FROM plus1),plusm12=(SELECT second FROM plus1),plusm13=(SELECT third FROM plus3),plusm14=(SELECT fourth FROM plus1),plusm15=(SELECT fifth FROM plus1),plusm16=(SELECT sixth FROM plus1),plusm17=(SELECT seventh FROM plus1),plusm21=(SELECT first FROM plus2),plusm22=(SELECT second FROM plus2),plusm23=(SELECT third FROM plus2),plusm24=(SELECT fourth FROM plus2),plusm25=(SELECT fifth FROM plus2),plusm26=(SELECT sixth FROM plus2),plusm27=(SELECT seventh FROM plus2),plusm31=(SELECT first FROM plus3),plusm32=(SELECT second FROM plus3),plusm33=(SELECT third FROM plus3),plusm34=(SELECT fourth FROM plus3),plusm35=(SELECT fifth FROM plus3),plusm36=(SELECT sixth FROM plus3),plusm37=(SELECT seventh FROM plus3)",
                        (error,results6) =>{
                          connection.query(
                            "DELETE FROM pointscolor WHERE competition='M1'",
                            (error,results7)=>{
                              connection.query(
                                "SELECT colorm11,colorm12,colorm13,colorm14,colorm15,colorm16,colorm17 FROM colorsetting",
                                (error,results8) =>{
                                  connection.query(
                                    "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M1',plusm11,plusm12,plusm13,plusm14,plusm15,plusm16,plusm17 FROM colorsetting",
                                    [
                                      results8[0].colorm11,
                                      results8[0].colorm12,
                                      results8[0].colorm13,
                                      results8[0].colorm14,
                                      results8[0].colorm15,
                                      results8[0].colorm16,
                                      results8[0].colorm17,
                                    ],
                                    (error,results9)  =>{
                                      connection.query(
                                        "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                        (error,results10) =>{
                                          res.redirect("/manage");
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          )
                          }
                          );
                      } 
                      );
                }
              );
            }
          )
        }
      );
    } else if (req.body.grade =="M2"){
      connection.query(
        "UPDATE results SET time1=?,time2=?,time3=?,time4=?,time5=?,time6=?,time7=?,rank1=?,rank2=?,rank3=?,rank4=?,rank5=?,rank6=?,rank7=? WHERE compname=?,grade=?",
        [
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
        req.body.competition,
        req.body.grade,
        ],
        (error,results) => {
          connection.query(
            "DELETE FROM pointsmh2 WHERE competition=?",
            [req.body.competition],
            (error,results2) =>{
              connection.query(
                "INSERT INTO pointsmh2 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results WHERE compname=?   ",
                [
                  sorted[0].class,
                  sorted[1].class,
                  sorted[2].class,
                  sorted[3].class,
                  sorted[4].class,
                  sorted[5].class,
                  sorted[6].class,
                  req.body.competition,
                ],
                (error,results3) =>{
                  connection.query(
                    "UPDATE plus2 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                    (error,results5 )=> {
                      connection.query(
                        "UPDATE colorsetting SET plusm11=(SELECT first FROM plus1),plusm12=(SELECT second FROM plus1),plusm13=(SELECT third FROM plus3),plusm14=(SELECT fourth FROM plus1),plusm15=(SELECT fifth FROM plus1),plusm16=(SELECT sixth FROM plus1),plusm17=(SELECT seventh FROM plus1),plusm21=(SELECT first FROM plus2),plusm22=(SELECT second FROM plus2),plusm23=(SELECT third FROM plus2),plusm24=(SELECT fourth FROM plus2),plusm25=(SELECT fifth FROM plus2),plusm26=(SELECT sixth FROM plus2),plusm27=(SELECT seventh FROM plus2),plusm31=(SELECT first FROM plus3),plusm32=(SELECT second FROM plus3),plusm33=(SELECT third FROM plus3),plusm34=(SELECT fourth FROM plus3),plusm35=(SELECT fifth FROM plus3),plusm36=(SELECT sixth FROM plus3),plusm37=(SELECT seventh FROM plus3)",
                        (error,results6) =>{
                          connection.query(
                            "DELETE FROM pointscolor WHERE competition='M2'",
                            (error,results7)=>{
                              connection.query(
                                "SELECT colorm21,colorm22,colorm23,colorm24,colorm25,colorm26,colorm27 FROM colorsetting",
                                (error,results8) =>{
                                  connection.query(
                                    "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M2',plusm21,plusm22,plusm23,plusm24,plusm25,plusm26,plusm27 FROM colorsetting",
                                    [
                                      results8[0].colorm21,
                                      results8[0].colorm22,
                                      results8[0].colorm23,
                                      results8[0].colorm24,
                                      results8[0].colorm25,
                                      results8[0].colorm26,
                                      results8[0].colorm27,
                                    ],
                                    (error,results9)  =>{
                                      connection.query(
                                        "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                        (error,results10) =>{
                                          res.redirect("/manage");
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          )
                          }
                          );
                    } 
                      );
                }
              );
            }
          )
        }
      );
    } else {
      connection.query(
        "UPDATE results SET time1=?,time2=?,time3=?,time4=?,time5=?,time6=?,time7=?,rank1=?,rank2=?,rank3=?,rank4=?,rank5=?,rank6=?,rank7=? WHERE compname=?,grade=?",
        [
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
        req.body.competition,
        req.body.grade,
        ],
        (error,results) => {
          connection.query(
            "DELETE FROM pointsmh3 WHERE competition=?",
            [req.body.competition],
            (error,results2) =>{
              connection.query(
                "INSERT INTO pointsmh3 (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results WHERE compname=?   ",
                [
                  sorted[0].class,
                  sorted[1].class,
                  sorted[2].class,
                  sorted[3].class,
                  sorted[4].class,
                  sorted[5].class,
                  sorted[6].class,
                  req.body.competition,
                ],
                (error,results3) =>{
                  connection.query(
                    "UPDATE plus3 SET first=(SELECT SUM(first) FROM pointsmh1),second=(SELECT SUM(second) FROM pointsmh1),third=(SELECT SUM(third) FROM pointsmh1),fourth=(SELECT SUM(fourth) FROM pointsmh1),fifth=(SELECT SUM(fifth) FROM pointsmh1),sixth=(SELECT SUM(sixth) FROM pointsmh1),seventh=(SELECT SUM(seventh) FROM pointsmh1)",
                    (error,results5 )=> {
                      connection.query(
                        "UPDATE colorsetting SET plusm11=(SELECT first FROM plus1),plusm12=(SELECT second FROM plus1),plusm13=(SELECT third FROM plus3),plusm14=(SELECT fourth FROM plus1),plusm15=(SELECT fifth FROM plus1),plusm16=(SELECT sixth FROM plus1),plusm17=(SELECT seventh FROM plus1),plusm21=(SELECT first FROM plus2),plusm22=(SELECT second FROM plus2),plusm23=(SELECT third FROM plus2),plusm24=(SELECT fourth FROM plus2),plusm25=(SELECT fifth FROM plus2),plusm26=(SELECT sixth FROM plus2),plusm27=(SELECT seventh FROM plus2),plusm31=(SELECT first FROM plus3),plusm32=(SELECT second FROM plus3),plusm33=(SELECT third FROM plus3),plusm34=(SELECT fourth FROM plus3),plusm35=(SELECT fifth FROM plus3),plusm36=(SELECT sixth FROM plus3),plusm37=(SELECT seventh FROM plus3)",
                        (error,results6) =>{
                          connection.query(
                            "DELETE FROM pointscolor WHERE competition='M3'",
                            (error,results7)=>{
                              connection.query(
                                "SELECT colorm31,colorm32,colorm33,colorm34,colorm35,colorm36,colorm37 FROM colorsetting",
                                (error,results8) =>{
                                  connection.query(
                                    "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT 'M3',plusm31,plusm32,plusm33,plusm34,plusm35,plusm36,plusm37 FROM colorsetting",
                                    [
                                      results8[0].colorm31,
                                      results8[0].colorm32,
                                      results8[0].colorm33,
                                      results8[0].colorm34,
                                      results8[0].colorm35,
                                      results8[0].colorm36,
                                      results8[0].colorm37,
                                    ],
                                    (error,results9)  =>{
                                      connection.query(
                                        "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                                        (error,results10) =>{
                                          res.redirect("/manage");
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          )
                          }
                          );
                    } 
                      );
                }
              );
            }
          )
        }
      );
    }
  }
  
    }
    );
    app.post("/classreduce",(req,res) =>{
    if (req.body.grade=="M1"){
      connection.query(
        "UPDATE pointsmh1 SET ??=TRUNCATE(??/2,0) WHERE competition=?",
        [
          req.body.classes,
          req.body.classes,
          req.body.competition,
        ],
        (error,results)=>{
          res.redirect("/manage")
          console.log(error);
        }
      );
    } else if (req.body.grade=="M2") {
      connection.query(
        "UPDATE pointsmh2 SET ??=TRUNCATE(??/2) WHERE competition=?",
        [
          req.body.classes,
          req.body.classes,
          req.body.competition,
        ],
        (error,results2)=>{
          res.redirect("/manage")
        }
      );
    } else{
      connection.query(
        "UPDATE pointsmh3 SET ??=TRUNCATE(??/2) WHERE competition=?",
        [
          req.body.classes,
          req.body.classes,
          req.body.competition,
        ],
        (error,results)=>{
          res.redirect("/manage")
        }
      );
    }
}
);
app.post("/colorrenew",(req,res) =>{
  var arr =[
    {class:"red", time:req.body.time1,},
    {class:"orange",time:req.body.time2,}, 
    {class:"yellow",time:req.body.time3,},
    {class:"green",time:req.body.time4,},
    {class:"blue",time:req.body.time5,},
    {class:"purple",time:req.body.time6,},
    {class:"black",time:req.body.time7,},
  ];
    var sorted = arr.slice().sort(function(a,b)
    {return a.time-b.time });
    
    var ranks = arr.slice().map(function(x){
      return sorted.indexOf(x) + 1
    });
    var sorted2 = arr.slice().sort(function(a,b)
      {return b.time-a.time});
  connection.query(
    "UPDATE colorresults SET time1=?,time2=?,time3=?,time4=?,time5=?,time6=?,time7=?,rank1=?,rank2=?,rank3=?,rank4=?,rank5=?,rank6=?,rank7=? WHERE compname=?",
    [
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
    req.body.competition,
    ],
    (error,results) => {
      connection.query(
        "DELETE FROM pointscolor WHERE competition=?",
        [req.body.competition],
        (error,results2) =>{
          connection.query(
            "INSERT INTO pointscolor (competition,??,??,??,??,??,??,??) SELECT compname,point1,point2,point3,point4,point5,point6,point7 FROM results WHERE compname=?",
            [
              sorted[0].class,
              sorted[1].class,
              sorted[2].class,
              sorted[3].class,
              sorted[4].class,
              sorted[5].class,
              sorted[6].class,
              req.body.competition,
            ],
            (error,results3) =>{
              connection.query(
                "UPDATE pluscolor SET red=(SELECT SUM(red) FROM pointscolor),orange=(SELECT SUM(orange) FROM pointscolor),yellow=(SELECT SUM(yellow) FROM pointscolor),green=(SELECT SUM(green) FROM pointscolor),blue=(SELECT SUM(blue) FROM pointscolor),purple=(SELECT SUM(purple) FROM pointscolor),black=(SELECT SUM(black) FROM pointscolor)",
                (error,results10) =>{
                  res.redirect("/manage");
                }
              );
            }
          );
        }
      )
    }
  );
});
app.post("colorreduce",(req,res) =>{
  connection.query(
    "UPDATE pointscolor SET ??=TRUNCATE(??/2) WHERE competition=?",
    [
      req.body.classes,
      req.body.classes,
      req.body.competition,
    ],
    (error,results)=>{
      res.redirect("/manage")
      console.log(error);
    }
  );
});
app.listen(3000);