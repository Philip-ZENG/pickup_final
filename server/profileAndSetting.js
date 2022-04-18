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
  database: "project",
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
      values: [user_id]
    }, function (err, results) {
      console.log(results);
      return callback(results[0]);
    });
  }

app.post('/getUserInfo', function(req,res) {
    getUserInfo(req.body.user_id, function(response) {
        res.json(response);
    })
});

app.post('/setting/password', function(req, res) {
    var password = req.body.password;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `password` = ? WHERE `user_id` = ?',
        values: [password, user_id]
        }, function(err, results){
        console.log('Password Update { user_id: ' + user_id + ', new_password: ' + password + '}');
        return callback({succeed: true});
    });
})

app.post('/setting/name', function(req, res) {
    var userName = req.body.userName;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `user_name` = ? WHERE `user_id` = ?',
        values: [userName, user_id]
        }, function(err, results){
        console.log('Password Update { user_id: ' + user_id + ', new_user_name: ' + userName + '}');
        return callback({succeed: true});
    });
})

app.post('/setting/contact', function(req, res) {
    var contact = req.body.contact;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `contact_info` = ? WHERE `user_id` = ?',
        values: [contact, user_id]
        }, function(err, results){
        console.log('Password Update { user_id: ' + user_id + ', new_contact: ' + contact + '}');
        return callback({succeed: true});
    });
})

app.post('/setting/bio', function(req, res) {
    var Bio = req.body.Bio;
    var user_id = req.body.user_id;

    connection.query({
        sql: 'UPDATE `user_info` SET `personal_intro` = ? WHERE `user_id` = ?',
        values: [Bio, user_id]
        }, function(err, results){
        console.log('Password Update { user_id: ' + user_id + ', new_Bio: ' + Bio + '}');
        return callback({succeed: true});
    });
})

const port = process.env.PORT || 4004;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});