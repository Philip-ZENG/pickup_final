const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const morgan = require("morgan");
const { func } = require("joi");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

// Connecting to the local mySQL server
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qweasdzxc",
  database: "pickup",
});

// Connecting to the AWS RDS mySQL server
// var connection = mysql.createConnection({
//   host: "database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "qweasdzxc",
//   database: "pickup",
// });

// Connet to mysql
connection.connect(function (err) {
  if (err) throw err;
  console.log('mySQL server connection succeed.')
});

function getUserInfo(user_id, callback) {
    connection.query({
        sql: 'SELECT * FROM `user_info` WHERE `user_id` = ?',
        value: [user_id]
    }, function(err, results) {
        console.log(results[0]);
        return callback(results[0]);
    })
}

// get the information of a specific user with the provided user_id
app.get('/personalInfo', function(req,res){
  getUserInfo(req.body.user_id, function(response) {
      res.json(response);
  })
});

app.post('/setting', function(req,res){
    var password = req.body.password;
    var userName = req.body.userName;
    var contact = req.body.contact;
    var bio = req.body.Bio;

    if (password !== null) {

    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});