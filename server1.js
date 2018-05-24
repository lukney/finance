var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
//var session = require('express-session');
//var flash = require('express-flash-notification');
//const MSG91 = require("./MSG91");
var connection = mysql.createConnection({
	//connectionLimit : 25,
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'client',
	port :'3306',
	 debug: false,
        multipleStatements: true
});
connection.connect(function(err) {
	  if (err) throw err;

  console.log('You are now connected with mysql database...')
})
var engines = require('consolidate');

//app.set('web1', __dirname + '/web1');

app.set('view engine', 'html');
//app.use(express.static('web1'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

app.get('/', function (req, res) {
	res.sendFile( __dirname + "/" + "notify.html",{ user: req.user } );
	
});
app.post('/api/register', function (req, res) {
    var comment_subject = req.body.subject;
    var comment_text = req.body.comment;
 
	console.log(comment_subject);
    var data = {
        "error": 1,
        "comments": ""
    };
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!comment_subject && !!comment_text ) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO comments SET comments = ?, comment_text = ?",[comment_subject, comment_text], function (err, rows, fields) {
				if (!!err) {
					data["comments"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["comments"] = "new user Added Successfully";
					console.log("Added: " + [comment_subject, comment_text]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
				  // message = "Succesfully! Your account has been created.";
       
			});
      
    } else {
        data["comments"] = "Please provide all required data (i.e : comment_subject, comment_text, email, phone, mobile, pan, date)";
        res.json(data);
       }
});
app.get('/notification', function (req, res) {
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('UPDATE comments SET comment_status = 1 WHERE comment_status=0;SELECT * FROM comments ORDER BY comment_id DESC LIMIT 5;SELECT * FROM comments WHERE comment_status=0;',function (err, rows, fields) {
			//connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["report"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["report"] = 'No products Found..';
				res.json(data);
			} else {
				data["report"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("dummy app listening at: " + host + ":" + port);

});