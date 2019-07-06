
var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
// const uuid = require('uuid');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user"
});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.post('/submit',function(req,res){
  var name=req.body.name;
  var type=req.body.type;
  var phoneno=req.body.phoneno;
  // res.write('You sent the name "' + req.body.name+'".\n');
  // res.write('You sent the user type "' + req.body.type+'".\n');
  // res.write('You sent the phone number"' + req.body.phoneno+'".\n');
  
  con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO `data`(name, type,phoneno) VALUES('"+name+"', '"+type+"','"+phoneno+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.end();
     
  });
  });
  res.redirect('/');
});

app.get('/getdata',function(req,res){
  console.log(req);
  con.query('select * from data',function(error,result){
    if(error) throw error;
    res.end(JSON.stringify(result));
  });
});


app.listen(5000);
console.log("Running at Port 5000");