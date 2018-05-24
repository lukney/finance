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

app.set('web1', __dirname + '/web1');

app.set('view engine', 'html');
app.use(express.static('web1'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

app.get('/', function (req, res) {
	res.sendFile( __dirname + "/" + "web1/index.html",{ user: req.user } );
	
});
/*app.get('/dash1', function (req, res) {
	// "render" for ejs file:  html for send file ---res.render( __dirname + "/" + "relax/index1",{ user: req.user } );
	res.sendFile( __dirname + "/" + "relax/dash1.html",{ user: req.user } );
	
});*/
app.get('/service1', function (req, res) {
	
	res.sendFile( __dirname + "/" + "web1/input.html",{ user: req.user } );
});

app.get('/main', function (req, res) {
	
	res.sendFile( __dirname + "/" + "web1/input.html",{ user: req.user } );
});
app.get('/loan', function (req, res) {
	
	res.sendFile( __dirname + "/" + "web1/input1.html",{ user: req.user } );
});
app.get('/reg', function (req, res) {
	
	res.sendFile( __dirname + "/" + "web1/try1.html",{ user: req.user } );
});
app.get('/service', function (req, res) {
		//res.sendFile( __dirname + "/" + "web1/fresh.html",{ user: req.user } );
//res.sendFile( __dirname + "/" + "web1/test.html",{ user: req.user } );
//res.sendFile( __dirname + "/" + "web1/button.html",{ user: req.user } );
res.sendFile( __dirname + "/" + "web1/main-page1.html",{ user: req.user } );

	//res.sendFile( __dirname + "/" + "web1/newchart.html",{ user: req.user } );
	//res.sendFile( __dirname + "/" + "web1/trail.html",{ user: req.user } );
});
app.get('/service2', function (req, res) {
	
	res.sendFile( __dirname + "/" + "web1/tamount.html",{ user: req.user } );
});
app.get('/mydate', function (req, res) {
	
	res.sendFile( __dirname + "/" + "web1/mydate.html",{ user: req.user } );
});
app.get('/profile1', function (req, res) {
	
	res.sendFile( __dirname + "/" + "web1/profile1.html",{ user: req.user } );
});
app.get('/tracking', function (req, res) {
	
	res.render( __dirname + "/" + "relax/tracking_results",{ user: req.user } );
});
app.get('/tracking1', function (req, res) {
	
	res.render( __dirname + "/" + "relax/track",{ user: req.user } );
});
app.get('/tracking2', function (req, res) {
	
	res.render( __dirname + "/" + "relax/track1",{ user: req.user } );
});
//send otp
app.post('/api/mobile',function(req,res){
var request = require('request');
var authkey='186818AGk7XkJqX85a2b83f8';
var mobile = req.body.mobile;
request({
    url: 'https://control.msg91.com/api/sendotp.php?authkey='+authkey+'&mobile='+mobile+'',
    method: 'post',
	
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});
//otp verification
app.post('/api/otp',function(req,res){
var request = require('request');
var authkey='186818AGk7XkJqX85a2b83f8';
var mobile = req.body.mobile;
var otp = req.body.otp;
request({
    url: 'https://control.msg91.com/api/verifyRequestOTP.php?authkey='+authkey+'&mobile='+mobile+'&otp='+otp+'',
    method: 'post',
	
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});
});
/*app.get('/api/list', function (req, res) {
/*app.get('/api/list', function (req, res) {
	console.log("GET Request :: /list");
	var data = {
        "error": 1,
        "goa12": ""
    };
		connection.query('SELECT * from goa12', function (err, rows, fields) {
			//connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["goa12"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["goa12"] = 'No products Found..';
				res.json(data);
			} else {
				data["go12"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
	
	//});
});*/

 /*var data = {
        "error": 1,
        "mbdata": ""
    };
	console.log('POST Request :: /insert:  '+mobile);
	 console.log(data);
   connection.query("INSERT INTO mbdata SET mobile = ?",[mobile], function (err, rows, fields) {

          if (!!err) {
					data["mbdata"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["mbdata"] = "Product Added Successfully";
					console.log("Added: " + [mobile]);
					//log.info("Added: " + [name, dest, price]);
				}
				res.json(data);
			});*/

});
/*app.post('/api/mobile',function(request,res){
	var mobile = req.body.mobile;
	console.log(mobile);
request({
    url: 'https://control.msg91.com/api/sendotp.php?authkey='+authkey+'&mobile='+mobile+'',
    method: 'post',
	
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});
});*/
//create otp:
app.get('/search',function(req,response){
connection.query('SELECT pincode,location,state,area from goa12 where pincode like "%'+req.query.key+'%"', function(err, rows, fields) {
	  if (err) throw err;
	  
    var data=[];
	
    for(i=0;i<rows.length;i++)
      {
        data.push(rows[i].pincode+','+rows[i].location+','+rows[i].state+','+rows[i].area);
      }
      response.send(JSON.stringify(data));
	  //console.log(JSON.stringify(data));
	  //console.log(JSON.stringify(data));
	 //console.log(req.query.key);
	 //console.log(JSON.stringify(data));
	});
});
/*app.post('/api/dest', function (req, res) {
	//get data
  
       var org = req.body.org;
       var  dest = req.body.dest;
       
        
    var data = {
        "error": 1,
        "dest": ""
    };
	console.log('POST Request :: /insert:  '+org);
	 console.log(data);
   connection.query("INSERT INTO dest SET org = ?, dest = ?",[org, dest], function (err, rows, fields) {

          if (!!err) {
					data["dest"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["dest"] = "Product Added Successfully";
					console.log("Added: " + [dest,org]);
					//log.info("Added: " + [name, dest, price]);
				}
				res.json(data);
			});
});*/
/*var distance = require('google-distance-matrix');

app.post('/api/dest', function (req, res){
	var Length = req.body.Length;
	var Breadth = req.body.Breadth;
	var Height = req.body.Height;
 var user_gms1=(Length * Breadth * Height)/4750;
   console.log(user_gms1);
	var org=[req.body.org]; 
	var dest=[req.body.dest];
   var dist;
distance.key('AIzaSyAykFlST8qAZY7EzGLEN4lTTNpPirenuVE');
distance.units('metric');

distance.matrix(org, dest, function (err, distances) {
if (distances.status == 'OK') {
        for (var i=0; i < org.length; i++) {
            for (var j = 0; j < dest.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                     dist = distances.rows[i].elements[j].distance.text;
					console.log(dist);
                    console.log('Distance from ' + org + ' to ' + dest + ' is ' + dist);
						 var orginal_amount=500;
						   var total_amount;
						 var weightGroup;
                         var your_column_name;
						 if((user_gms1>1 && user_gms1<=50)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>1 && user_gms1<=50)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>1 && user_gms1<=50)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>1 && user_gms1<=50)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>1 && user_gms1<=50)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>500) && (dist>='1 km' && dist<='100 km')){
						    your_column_name='kms1_100';
						   weightGroup='add 500 gms';
					   }else if((user_gms1>500) && (dist>='100 km' && dist<='200 km')){
						    your_column_name='kms100_200';
						   weightGroup='add 500 gms';
					   }else if((user_gms1>500) && (dist>='201 km' && dist <='999 km')){
						    your_column_name='kms200_1000';
						   weightGroup='add 500 gms';
					   }else if((user_gms1>500) && (dist>='1000 km' && dist<='2000 km')){
						    your_column_name='kms1001_2000';
						   weightGroup='add 500 gms';
					   }else if((user_gms1>500) && (dist>='2000 km')){
						    your_column_name='above2000kms';
						   weightGroup='add 500 gms';
					   }

					  connection.query("select ?? from rates where weight = ?" , [your_column_name,weightGroup], function(error, data ){
	   //select  [col]  from rates where weight = ? ",[weightGroup],
	  res.send('./Homepage', {data: JSON.stringify(data)});
	
 // res.end("<p>Hello World. Request kms: " + data + ".</p>");
 
if((user_gms1>500) && (dist>='1 km' && dist<='100 km')){	   
	   var str = JSON.stringify(data);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount= 30 + Number(str2);
	 console.log(total_amount);
}else if((user_gms1>500) && (dist>='100 km' && dist<='200 km')){		   
	   var str = JSON.stringify(data);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
      total_amount= 50 + Number(str2);
      console.log(total_amount);
}else  if((user_gms1>500) && (dist>='201 km' && dist <='999 km')){			   
	   var str = JSON.stringify(data);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
       total_amount= 60 + Number(str2);
      console.log(total_amount);
}else if((user_gms1>500) && (dist>='1000 km' && dist<='2000 km')){
      var str = JSON.stringify(data);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	   total_amount= 80 + Number(str2);
	  console.log(total_amount);
}else if((user_gms1>500) && (dist>='2000 km')){		   
	   var str = JSON.stringify(data);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	   total_amount= 90 + Number(str2);
	  console.log(total_amount);
	  
  res.send('./Homepage', {data: JSON.stringify(data)});
	
  
} 
	   });

						
				}
					
                 else {
                    console.log(dest + ' is not reachable by land from ' + org);
					 
  res.end("<p>Hello World. Request kms: " + dest + ".</p>");
                }
            }
        }
    }
});
});*/
/*app.post('/api/mobile', function (req, response) {
	//get data
   //var OTP = generateOtp();
     var mobile = req.body.mobile;    
    
	 //console.log(data);
   connection.query("select * from mobile where mobile = ? ",[mobile], function(err, result){

          console.log(result.mobile);
			
				if(result != null ){
					if(result.mobile == "" || result.mobile == null){
						response.process = false;
						response.message = "Invalid Number";
					}
                   else {
						MSG91.sendSms(OTP,result.mobile,function(err,result){
							console.log(err);
							if(err){
								response.process = false;
								response.otpCreated = "Something went Wrong Please try after sometime.";
							}else{
								response.process = true;
								response.message = "Your OTP is Created.";
								response.otp = OTP;
							}
							console.log(response);
							
						});						
				   }
				
				}else{
					response.process = false;
					response.message = "Invalid Number";
					
				}	



        });
});*/
var distance = require('google-distance-matrix');

app.post('/check', function (req, res){
		var data1,data2,data3,data4,data5,data6;
		var data = {
        "error": 1,
        "rates": "",
		"metro": "",
		"deliverytime": "",
		"ServiceType": "",
		"store1": ""
    };
	
    var date = req.body.date;
	
	//console.log("package");
	 var parcel = req.body.parcel;
    var weight = req.body.weight;
    var package = req.body.package;
	 var length = req.body.length;
    var width = req.body.width;
    var height = req.body.height;
	//console.log(date);
 var user_gms1=(length * width* height)/4750;
   //console.log(user_gms1);

	var org =[req.body.demo];
//console.log(org);
//console.log("log1");	
	var dest=[req.body.dest];
   var dist;
   //console.log(dest);
   //console.log("log2");
distance.key('AIzaSyAykFlST8qAZY7EzGLEN4lTTNpPirenuVE');
distance.units('metric');

distance.matrix(org, dest, function (err, distances) {
if (distances.status == 'OK') {
        for (var i=0; i < org.length; i++) {
            for (var j = 0; j < dest.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                     dist = distances.rows[i].elements[j].distance.text;
					console.log(dist);
                    console.log('Distance from ' + org + ' to ' + dest + ' is ' + dist);
						   var orginal_amount=500;
						   var total_amount,total_amount1;
						 var weightGroup;
                         var your_column_name;
						 if((user_gms1>0 && user_gms1<=50)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>0 && user_gms1<=50)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>0 && user_gms1<=50)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>0 && user_gms1<=50)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>0 && user_gms1<=50)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=51 && user_gms1<=200)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>=201 && user_gms1<=500)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((user_gms1>500) && (dist>='1 km' && dist<='100 km')){
						    your_column_name='kms1_100';
						   weightGroup='add 500 gms';
						   console.log("success");
					   }else if((user_gms1>500) && (dist>='100 km' && dist<='200 km')){
						    your_column_name='kms100_200';
						   weightGroup='add 500 gms';
						   console.log("success");
					   }else if((user_gms1>500) && (dist>='201 km' && dist <='999 km')){
						    your_column_name='kms200_1000';
						   weightGroup='add 500 gms';
						   console.log("success");
					   }else if((user_gms1>500) && (dist>='1000 km' && dist<='2000 km')){
						    your_column_name='kms1001_2000';
						   weightGroup='add 500 gms';
						   
					   }else if((user_gms1>500) && (dist>='2000 km')){
						    your_column_name='above2000kms';
						   weightGroup='add 500 gms';
					   }else if((weight>0 && weight<=50)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((weight>0 && weight<=50)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((weight>0 && weight<=50)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((weight>0 && weight<=50)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((weight>0 && weight<=50)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '1 - 50 gms';
						   console.log("success");
						
					   }else if((weight>=51 && weight<=200)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((weight>=51 && weight<=200)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((weight>=51 && weight<=200)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((weight>=51 && weight<=200)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((weight>=51 && weight<=200)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '51 - 200 gms';
						   console.log("success");
						
					   }else if((weight>=201 && weight<=500)&& ( dist>='1 km' && dist<='100 km')){
						   your_column_name='kms1_100';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((weight>=201 && weight<=500)&& (dist>='100 km' && dist<='200 km')){
						   your_column_name='kms100_200';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((weight>=201 && weight<=500)&& (dist>='201 km' && dist <='999 km')){
						   your_column_name='kms200_1000';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((weight>=201 && weight<=500)&& (dist>='1000 km' && dist<='2000 km')){
						   your_column_name='kms1001_2000';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((weight>=201 && weight<=500)&& (dist>='2000 km')){
						   your_column_name='above2000kms';
						   weightGroup = '201 - 500 gms';
						   console.log("success");
						
					   }else if((weight>500) && (dist>='1 km' && dist<='100 km')){
						    your_column_name='kms1_100';
						   weightGroup='add 500 gms';
						   console.log("success");
					   }else if((weight>500) && (dist>='100 km' && dist<='200 km')){
						    your_column_name='kms100_200';
						   weightGroup='add 500 gms';
						   console.log("success");
					   }else if((weight>500) && (dist>='201 km' && dist <='999 km')){
						    your_column_name='kms200_1000';
						   weightGroup='add 500 gms';
						   console.log("success");
					   }else if((weight>500) && (dist>='1000 km' && dist<='2000 km')){
						    your_column_name='kms1001_2000';
						   weightGroup='add 500 gms';
						   
					   }else if((weight>500) && (dist>='2000 km')){
						    your_column_name='above2000kms';
						   weightGroup='add 500 gms';
					   }


					  connection.query("select ?? from rates where weights = ?;select ?? from metro where weights = ?;select deliverytime1 from deliverytime where deliverytime5 ='sample1';select servicetype4 from ServiceType where servicetype1 = 'PREMIUM';select servicetype1 from ServiceType where servicetype4 = 'STANDARD' ;INSERT INTO store1 SET org = ?, dest = ?, date = ?, weight = ?, package = ?, length = ?, width = ?, height = ?;INSERT INTO store1 SET org = ?, dest = ?, date = ?, weight = ?, package = ?, length = ?, width = ?, height = ?, user_gms1 = ?" , [your_column_name, weightGroup, your_column_name, weightGroup, org,  dest, date, weight, package, length, width, height,org,  dest, date, weight, package, length, width, height, user_gms1], function(error, data){
console.log(JSON.stringify(data[3]));
			
	   if((user_gms1>500) && (dist>='1 km' && dist<='100 km')){	   
	   var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   console.log(str5);
	  total_amount2= 30 + Number(str5);
	  res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else if((user_gms1>500) && (dist>='100 km' && dist<='200 km')){		   
	    var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   console.log(str5);
	  total_amount2= 30 + Number(str5);
	 //res.send({data: total_amount1,data1: total_amount2});
	 res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else  if((user_gms1>500) && (dist>='201 km' && dist <='999 km')){			   
	   var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   console.log(str5);
	  total_amount2= 30 + Number(str5);
	res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else if((user_gms1>500) && (dist>='1000 km' && dist<='2000 km')){
       var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   console.log(str5);
	  total_amount2= 30 + Number(str5);
	 res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else if((user_gms1>500) && (dist>='2000 km')){		   
	   var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	  total_amount2= 30 + Number(str5);
	res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else    if((weight>500) && (dist>='1 km' && dist<='100 km')){	   
	   var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   console.log(str5);
	  total_amount2= 30 + Number(str5);
	 res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else if((weight>500) && (dist>='100 km' && dist<='200 km')){		   
	    var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   console.log(str5);
	  total_amount2= 30 + Number(str5);
	 res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else  if((weight>500) && (dist>='201 km' && dist <='999 km')){			   
	   var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   console.log(str5);
	  total_amount2= 30 + Number(str5);
	 res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else if((weight>500) && (dist>='1000 km' && dist<='2000 km')){
       var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   console.log(str5);
	  total_amount2= 30 + Number(str5);
	 //res.send({data: total_amount1,data1: total_amount2});
	res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
}else if((weight>500) && (dist>='2000 km')){		   
	   var str = JSON.stringify(data[0]);
	   var str3 = JSON.stringify(data[1]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	  total_amount1= 30 + Number(str2);
	  var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	  total_amount2= 30 + Number(str5);
	// res.send({data: total_amount1,data1: total_amount2});
res.send( {data: total_amount1,data1: total_amount2,data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4]),data2:JSON.stringify(data[2])});
	 //console.log(total_amount1);
	 //console.log(total_amount2);
}else{
   
	   var str = JSON.stringify(data[0]);
	   var str1=str.substr(17,19);
	   var str2 = str1.substr(0,5);
	    var str3 = JSON.stringify(data[1]);
	   var str4=str3.substr(17,19);
	   var str5 = str4.substr(0,3);
	   res.send({data: str2,data1: str5,data2:JSON.stringify(data[2]),data3:JSON.stringify(data[3]),data4:JSON.stringify(data[4])});
	   //res.send('./', {data: str2,data1: str5});

} 
 });

						
				}
					
                 else {
                    console.log(dest + ' is not reachable by land from ' + org);
                }
            }
        }
    }
});
});
//INSERT ServiceType
//INSERT new product


//INSERT new product
app.post('/api/insert', function (req, res) {
    var name = req.body.name;
    var address_line1 = req.body.address_line1;
    var address_line2 = req.body.address_line2;
	 var state = req.body.state;
    var city = req.body.city;
    var pincode = req.body.pincode;
	 var mobileno = req.body.mobileno;
    var data = {
        "error": 1,
        "products": ""
    };
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!name && !!address_line1 && !!address_line2 && !!state && !!city && !!pincode && !!mobileno) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO add1 SET name = ?, address_line1 = ?, address_line2 = ?, state = ?, city = ?, pincode = ?, mobileno = ? ",[name, address_line1, address_line2,  state,  city, pincode, mobileno], function (err, rows, fields) {
				if (!!err) {
					data["products"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["products"] = "Product Added Successfully";
					console.log("Added: " + [name, address_line1, address_line2, state, city, pincode, mobileno]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
			});
      
    } else {
        data["products"] = "Please provide all required data (i.e : name, desc, price)";
        res.json(data);
    }
});
app.get('/customer', function (req, res) {
	var data1,data2
	var data = {
		 "error": 1,
		"deliverytime": "",
		"ServiceType": ""
	}
   connection.query("select servicetype1 from ServiceType where servicetype4 = 'STANDARD';select deliverytime1 from deliverytime where deliverytime5 = 'sample1';select deliverytime3 from deliverytime where deliverytime4 = 'sample2'", function (error,data) {
	  if (error) throw error;
	  
	  var str1= JSON.stringify(data[1]);
	   var str2= JSON.stringify(data[2]);
	   
	  res.end(JSON.stringify(data[0])+','+JSON.stringify(data[1])+','+JSON.stringify(data[2]));
	  
	});
});
// This responds a GET request for the /list page.

//UPDATE Product
app.put('/api/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var address_line1 = req.body.address_line1;
    var address_line2 = req.body.address_line2;
	var state = req.body.state;
    var city = req.body.city;
    var pincode = req.body.pincode;
    var mobileno = req.body.mobileno;
    var data = {
        "error": 1,
        "product": ""
    };
	console.log('PUT Request :: /update: ' + id);
	//log.info('PUT Request :: /update: ' + id);
    if (!!id && !!name && !!address_line1 && !!address_line2 && !!state && !!city && !!pincode && !!mobileno) {
		//pool.getConnection(function (err, connection) {
			connection.query("UPDATE add1 SET name = ?, address_line1 = ?, address_line2 = ?, state = ?, city = ?, pincode = ?, mobileno = ? WHERE id=?",[name,  address_line1, address_line2, state, city,  pincode, mobileno, id], function (err, rows, fields) {
				if (!!err) {
					data["product"] = "Error Updating data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["product"] = "Updated Book Successfully";
					console.log("Updated: " + [id, name, address_line1, address_line2, state, city, pincode, mobileno]);
					//log.info("Updated: " + [id, name, description, price]);
				}
				res.json(data);
			});
		//});
    } else {
        data["product"] = "Please provide all required data (i.e : id, name, address_line1, address_line2, state, city, pincode, mobileno)";
        res.json(data);
    }
});

//LIST Product by ID
app.get('/api/list/:id', function (req, res) {
	var id = req.params.id;
	var data = {
        "error": 1,
        "product": ""
    };
	
	console.log("GET request :: /list/" + id);
	//log.info("GET request :: /list/" + id);
	//pool.getConnection(function (err, connection) {
		connection.query('SELECT * from add1 WHERE id = ?', id, function (err, rows, fields) {
			//connection.release();
			
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["product"] = rows;
				res.json(data);
			} else {
				data["product"] = 'No product Found..';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
	
	//});
});
//mydate

app.post('/api/date', function (req, res) {
    var mydate = req.body.mydate;
   
	console.log(mydate);
    var data = {
        "error": 1,
        "mydate": ""
    };
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!mydate) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO mydate SET mydate = ? ",[mydate], function (err, rows, fields) {
				if (!!err) {
					data["mydate"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["mydate"] = "new user Added Successfully";
					//console.log("Added: " + [mydate]);
					//log.info("Added: " + [name, description, price]);
					//res.json(data);
				}
				res.json(data);
				  // message = "Succesfully! Your account has been created.";
       
			});
      
    } else {
        data["mydate"] = "Please provide all required data (i.e : firstname, lastname, email, phone, mobile, pan, date)";
        res.json(data);
       }
});
//new register
app.post('/api/newregister', function (req, res) {
    var fullname = req.body.fullname;
	var  mobile = req.body.mobile;
	var	idproof = req.body.idproof;
	var	idproofno = req.body.idproofno;
	var	address = req.body.address;
	console.log(fullname);
    var data = {
        "error": 1,
        "newuser": ""
    };
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!fullname &&  !!mobile && !!idproof && !!idproofno && !!address) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO registartion SET fullname = ?,  mobile = ?,  idproof = ?, idproofno = ?, address = ?",[fullname, mobile, idproof, idproofno, address], function (err, rows, fields) {
				if (!!err) {
					data["newuser"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["newuser"] = "new user Added Successfully";
					console.log("Added: " + [fullname,  mobile, idproof, idproofno, address]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
				  // message = "Succesfully! Your account has been created.";
       
			});
      
    } else {
        data["newuser"] = "Please provide all required data (i.e : fullname, mobile, idproof, idproofno, address)";
        res.json(data);
       }
});

//laon amount and installement

app.post('/api/loaninstall', function (req, res) {
    var loan_amount = req.body.loan_amount;
	var  enddate = req.body.enddate;
	var	startdate = req.body.startdate;
	var	installementtype = req.body.installementtype;
	var	noofinstallement = req.body.noofinstallement;
	var	interest = req.body.interest;
	var	trepayamount  = req.body.trepayamount;
	var	installement_amount = req.body.installement_amount;
	var	mydate = req.body.mydate;
	//interest trepayamount installement_amount mydate
	console.log(loan_amount);
    var data = {
        "error": 1,
        "newuser": ""
    };
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!loan_amount &&  !!enddate && !!startdate && !!installementtype && !!noofinstallement && !!interest  && !!trepayamount && !!installement_amount && !!mydate) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO loan_account SET loan_amount = ?,  enddate = ?,  startdate = ?, installementtype = ?, noofinstallement = ?, interest = ?, trepayamount = ?; INSERT INTO installementtable SET installement_amount = ?, mydate = ?",[loan_amount, enddate, startdate, installementtype, noofinstallement, interest, trepayamount,installement_amount, mydate], function (err, rows, fields) {
				if (!!err) {
					data["newuser"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["newuser"] = "new user Added Successfully";
					console.log("Added: " + [loan_amount,  enddate, startdate, installementtype, noofinstallement, interest, trepayamount, installement_amount, mydate]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
				  // message = "Succesfully! Your account has been created.";
       
			});
      
    } else {
        data["newuser"] = "Please provide all required data (i.e : loan_amount, enddate, startdate, installementtype, noofinstallement, interest, trepayamount, installement_amount, mydate)";
        res.json(data);
       }
});


app.post('/api/register', function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
	  var phone = req.body.phone;
	var  mobile = req.body.mobile;
	var	pan = req.body.pan;
	var	date = req.body.date;
	console.log(firstname);
    var data = {
        "error": 1,
        "newuser": ""
    };
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!firstname && !!lastname && !!email && !!phone && !!mobile && !!pan && !!date) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO newuser SET firstname = ?, lastname = ?, email = ?, phone = ?, mobile = ?,  pan = ?, date = ?",[firstname, lastname, email, phone,  mobile, pan, date], function (err, rows, fields) {
				if (!!err) {
					data["newuser"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["newuser"] = "new user Added Successfully";
					console.log("Added: " + [firstname, lastname, email, phone, mobile, pan, date]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
				  // message = "Succesfully! Your account has been created.";
       
			});
      
    } else {
        data["newuser"] = "Please provide all required data (i.e : firstname, lastname, email, phone, mobile, pan, date)";
        res.json(data);
       }
});

app.post('/api/expend', function (req, res) {
    var Room_Rent = req.body.Room_Rent;
    var Light_Bill = req.body.Light_Bill;
    var Mobile_Bill = req.body.Mobile_Bill;
	  var Payment = req.body.Payment;
	var  Petrol = req.body.Petrol;
	var	Others = req.body.Others;
	var	date = req.body.date;
	console.log(Room_Rent);
    var data = {
        "error": 1,
        "expenditure": ""
    };
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!Room_Rent && !!Light_Bill && !!Mobile_Bill && !!Payment && !!Petrol && !!Others && !!date) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO expenditure SET Room_Rent = ?, Light_Bill = ?, Mobile_Bill = ?, Payment = ?, Petrol = ?,  Others = ?, date = ?",[Room_Rent, Light_Bill, Mobile_Bill, Payment,  Petrol, Others, date], function (err, rows, fields) {
				if (!!err) {
					data["expenditure"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["expenditure"] = "new user Added Successfully";
					console.log("Added: " + [Room_Rent, Light_Bill, Mobile_Bill, Payment, Petrol, Others, date]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
				  // message = "Succesfully! Your account has been created.";
       
			});
      
    } else {
        data["expenditure"] = "Please provide all required data (i.e : Room_Rent, Light_Bill, Mobile_Bill, Payment, Petrol, Others, date)";
        res.json(data);
       }
});
//Annunity Page

app.post('/api/send', function (req, res) {
    var loan = req.body.loan;
    var interest = req.body.interest;
    var startdate = req.body.startdate;
	var  tinterest = req.body.tinterest;
	 var noofinstallment = req.body.noofinstallment;
    var year = req.body.year;
    var month = req.body.month;
	var  week = req.body.week;
	 var day = req.body.day;
    var tpayamount = req.body.tpayamount;
    var enddate = req.body.enddate;

	
	console.log(loan);
    var data = {
        "error": 1,
        "annunity": ""
    };
	//message='';
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!loan && !!interest && !!startdate && !!tinterest) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO annunity SET loan = ?, interest = ?, startdate = ?, tinterest = ?, noofinstallment = ?, year = ?,  month = ?, week = ?, day = ?, tpayamount = ?, enddate = ?",[loan, interest, startdate, tinterest, noofinstallment, year,  month, week, day , tpayamount ,enddate], function (err, rows, fields) {
				if (!!err) {
					data["annunity"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["annunity"] = "annunity Successfully";
					console.log("Added: " + [loan, interest, startdate, tinterest, noofinstallment, year,  month, week, day , tpayamount ,enddate]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
				  // message = "Succesfully! Your account has been created.";
       
			});
      
    } else {
        data["annunity"] = "Please provide all required data (i.e : loan, interest, startdate, noofinstallment, year,  month, week, day , tpayamount ,enddate)";
        res.json(data);
       }
});

//tamount page

app.post('/api/tamount', function (req, res) {
    var TAmount = req.body.TAmount;
    var LAmount = req.body.LAmount;
    var TIAmount = req.body.TIAmount;
	var  RAmount = req.body.RAmount;
	 var DAmount = req.body.DAmount;
    var date = req.body.date;
    var data = {
        "error": 1,
        "receive": ""
    };
	//message='';
	console.log(TAmount);
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!TAmount && !!LAmount && !!TIAmount &&  !!RAmount && !!DAmount && !!date) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO receive SET TAmount = ?, LAmount = ?, TIAmount = ?, RAmount = ?, DAmount = ?, date = ?",[TAmount, LAmount, TIAmount, RAmount, DAmount, date], function (err, rows, fields) {
				if (!!err) {
					data["receive"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["receive"] = "receive Successfully";
					console.log("Added: " + [TAmount, LAmount, TIAmount, RAmount, DAmount, date]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
				  // message = "Succesfully! Your account has been created.";
       
			});
      
    } else {
        data["receive"] = "Please provide all required data (i.e : TAmount, LAmount, TIAmount, RAmount, DAmount, date)";
        res.json(data);
       }
});
//INSERT new product
app.post('/api/insert', function (req, res) {
    var name = req.body.name;
    var address_line1 = req.body.address_line1;
    var address_line2 = req.body.address_line2;
	 var state = req.body.state;
    var city = req.body.city;
    var pincode = req.body.pincode;
	 var mobileno = req.body.mobileno;
    var data = {
        "error": 1,
        "products": ""
    };
	console.log('POST Request :: /insert: ');
	//log.info('POST Request :: /insert: ');
    if (!!name && !!address_line1 && !!address_line2 && !!state && !!city && !!pincode && !!mobileno) {
		//pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO add1 SET name = ?, address_line1 = ?, address_line2 = ?, state = ?, city = ?, pincode = ?, mobileno = ? ",[name, address_line1, address_line2,  state,  city, pincode, mobileno], function (err, rows, fields) {
				if (!!err) {
					data["products"] = "Error Adding data";
					console.log(err);
					//log.error(err);
				} else {
					data["error"] = 0;
					data["products"] = "Product Added Successfully";
					console.log("Added: " + [name, address_line1, address_line2, state, city, pincode, mobileno]);
					//log.info("Added: " + [name, description, price]);
				}
				res.json(data);
			});
      
    } else {
        data["products"] = "Please provide all required data (i.e : name, desc, price)";
        res.json(data);
    }
});

app.post('/api/delete', function (req, res) {
    var id = req.body.id;
    var data = {
        "error": 1,
        "product": ""
    };
	console.log('DELETE Request :: /delete: ' + id);
	//log.info('DELETE Request :: /delete: ' + id);
    if (!!id) {
		//pool.getConnection(function (err, connection) {
			connection.query("DELETE FROM newuser WHERE id = ?",[id],function (err, rows, fields) {
				if (!!err) {
					data["product"] = "Error deleting data";
					console.log(err);
					//log.error(err);
				} else {
					data["product"] = 0;
					data["product"] = "Delete product Successfully";
					console.log("Deleted: " + id);
					//log.info("Deleted: " + id);
				}
				res.json(data);
			});
		
    } else {
        data["product"] = "Please provide all required data (i.e : id ) & must be a integer";
        res.json(data);
    }
});

//getting report

/*app.post('/api/report', function (req, res) {
	 var fdate=req.body.fdate;
	  var tdate=req.body.tdate;
    var data = {
        "error": 1,
        "report": ""
    };
	console.log(fdate);
	//console.log('DELETE Request :: /delete: ' + id);
	//log.info('DELETE Request :: /delete: ' + id);
    if (!!fdate && !!tdate) {
		//pool.getConnection(function (err, connection) {
			connection.query('SELECT * FROM report WHERE fdate = ? AND tdate = ?',[fdate,tdate],function (err, rows, fields) {
				if (!!err) {
					data["report"] = "Error deleting data";
					console.log(err);
					//log.error(err);
				} else {
					data["report"] = 0;
					data["report"] = " product Successfully";
					//console.log("Deleted: " + id);
					//log.info("Deleted: " + id);
				}
				res.json(data);
				//console.log(res.json(data));
			});
		
    } else {
       // data["report"] = "Please provide all required data (i.e : id ) & must be a integer";
        res.json(data);
    }
});*/

app.post('/login', function (req, res) {
	//console.log("GET Request :: /list");
	  var message = '';
   //var sess = req.session; 
var data = {
        "error": 1,
        "report": ""
    };
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      connection.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
			data["error"] = 0;
				data["report"] = rows;
				res.json(data);
			message="successfull";
            res.sendFile( __dirname + "/" + "relax/index.html",{ message: message } );
         }
         else{
             //req.flash('info', 'you must enter your username and password to login');
			 message ="invalid username and password"
			  res.sendFile( __dirname + "/" + "relax/dash.html",{ message: message } );
			  data["error"] = 0;
				data["report"] = rows;
				res.json(data);
         }
                 
      });
   } else {
      res.sendFile( __dirname + "/" + "relax/input.html",{message: message} );
	  //req.flash('info', 'invalid username or password');
   }
     
 
   
});
app.get('/api/mydate1', function (req, res) {
	//console.log("GET Request :: /list");

	var data = {
        "error": 1,
        "mydate": ""
    };
	    connection.query('SELECT * FROM mydate', function (err, rows, fields) {
		//connection.query('SELECT * FROM report WHERE fdate = ? AND tdate = ?',[fdate,tdate], function (err, rows, fields) {
				
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["mydate"] = rows;
				res.json(data);
				//console.log(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["mydate"] = 'No products Found..';
				res.json(data);
			} else {
				data["mydate"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
      
   
});
app.post('/api/report', function (req, res) {
	//console.log("GET Request :: /list");
	
	 var fdate=req.body.fdate;
	  var tdate=req.body.tdate;
	  //console.log(fdate);
	var data = {
        "error": 1,
        "report": ""
    };
	    connection.query('SELECT * FROM report WHERE  fdate   BETWEEN ? AND ?',[fdate,tdate], function (err, rows, fields) {
		//connection.query('SELECT * FROM report WHERE fdate = ? AND tdate = ?',[fdate,tdate], function (err, rows, fields) {
				
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["report"] = rows;
				res.json(data);
				//console.log(data);
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
app.post('/api/delete', function (req, res) {
	//console.log("GET Request :: /list");
	
	var id = req.body;
console.log(id);
	    connection.query('DELETE FROM newuser WHERE  id = ? ',[id] ,function (error, results) {
		//connection.query('SELECT * FROM report WHERE fdate = ? AND tdate = ?',[fdate,tdate], function (err, rows, fields) {
				
			 if (error) throw error;
	  res.end(JSON.stringify(results));
	});
		});

app.get('/api/list', function (req, res) {
	console.log("GET Request :: /list");
	var data = {
        "error": 1,
        "report": ""
    };
		connection.query('SELECT * from report', function (err, rows, fields) {
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
	
	//});
});//datesort

//expenditure:Room Rent


app.get('/api/roomrent', function (req, res) {
	console.log("GET Request :: /roomrent");
	var data = {
        "error": 1,
        "Room_Rent": ""
    };
		connection.query('SELECT sum(Room_Rent) as Room_Rents FROM expenditure;SELECT Room_Rent,date FROM expenditure', function(err, rows, fields){
if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["Room_Rent"] = rows;
				res.json(data);
				//console.log(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["Room_Rent"] = 'No products Found..';
				res.json(data);
				
			} else {
				data["Room_Rent"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
});

app.get('/api/light_bill', function (req, res) {
	console.log("GET Request :: /light_bill");
	var data = {
        "error": 1,
        "light_bill": ""
    };
		connection.query('SELECT sum(Light_Bill) as Light_Bills FROM expenditure;SELECT Light_Bill,date from expenditure', function (err, rows, fields) {
			//connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["light_bill"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["light_bill"] = 'No products Found..';
				res.json(data);
			} else {
				data["light_bill"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
	
	//});
});//datesort
app.get('/api/mobile_bill', function (req, res) {
	console.log("GET Request :: /mobile_bill");
	var data = {
        "error": 1,
        "mobile_bill": ""
    };
		connection.query('SELECT sum(Mobile_Bill) as Mobile_Bills FROM expenditure;SELECT Mobile_Bill,date from expenditure', function (err, rows, fields) {
			//connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["mobile_bill"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["mobile_bill"] = 'No products Found..';
				res.json(data);
			} else {
				data["mobile_bill"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
	
	//});
});//datesort
app.get('/api/payment', function (req, res) {
	console.log("GET Request :: /payment");
	var data = {
        "error": 1,
        "payment": ""
    };
		connection.query('SELECT sum(Payment) as Payments FROM expenditure;SELECT Payment,date from expenditure', function (err, rows, fields) {
			//connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["payment"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["payment"] = 'No products Found..';
				res.json(data);
			} else {
				data["payment"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
	
	//});
});//datesort
app.get('/api/petrol', function (req, res) {
	console.log("GET Request :: /petrol");
	var data = {
        "error": 1,
        "Petrol": ""
    };
		connection.query('SELECT sum(Petrol) as Petrols FROM expenditure;SELECT Petrol,date from expenditure', function (err, rows, fields) {
			//connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["Petrol"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["Petrol"] = 'No products Found..';
				res.json(data);
			} else {
				data["Petrol"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
	
	//});
});//datesort
app.get('/api/others', function (req, res) {
	console.log("GET Request :: /others");
	var data = {
        "error": 1,
        "Others": ""
    };
		connection.query('SELECT sum(Others) as Otherss FROM expenditure;SELECT Others,date from expenditure', function (err, rows, fields) {
			//connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["Others"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["Others"] = 'No products Found..';
				res.json(data);
			} else {
				data["Others"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
	
	//});
});//datesort

app.get('/api/table1/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	var data = {
        "error": 1,
        "report": ""
    };
	
	console.log("GET request :: /list/" + id);
	//log.info("GET request :: /list/" + id);
	//pool.getConnection(function (err, connection) {
		connection.query('SELECT * from receive1 WHERE id = ?', [id],function(err, rows, fields){
if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["report"] = rows;
				res.json(data);
				//console.log(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["report"] = 'No products Found..';
				res.json(data);
				res.redirect('/posts');
			} else {
				data["report"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
});

app.get('/api/expendituressum', function (req, res) {
	
	var data = {
        "error": 1,
        "sum": ""
    };
	
	//console.log("GET request :: /list/" + id);
	//log.info("GET request :: /list/" + id);
	//pool.getConnection(function (err, connection) {
		connection.query('SELECT sum(Room_Rent) as Room_Rent ,sum(Light_Bill) as Light_Bill,sum(Mobile_Bill) as Mobile_Bill , sum(Payment) as Payment,sum(Petrol) as Petrol,sum(Others) as Others from expenditure ',function(err, rows, fields){
if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["sum"] = rows;
				res.json(data);
				//console.log(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["sum"] = 'No products Found..';
				res.json(data);
				res.redirect('/posts');
			} else {
				data["sum"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
});

app.post('/sort', function (req, res) {
	 var fdate=req.body.fdate;
	  var tdate=req.body.tdate;
   connection.query('SELECT * FROM report WHERE  fdate   BETWEEN ? AND ? ',[fdate,tdate],function(error,results){
		 if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.post('/datesort', function (req, res) {
	 var fdate=req.body.fdate;
	  var tdate=req.body.tdate;
	  console.log(fdate);
	   console.log(tdate);
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('SELECT * FROM report WHERE  fdate   BETWEEN ? AND ? ',[fdate,tdate],function(err, rows, fields){
if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["report"] = rows;
				res.json(data);
				//console.log(data);
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

app.post('/lent', function (req, res) {
	 var fdate=req.body.fdate;
	  var tdate=req.body.tdate;
	  //console.log(fdate);
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('SELECT lent FROM report WHERE  fdate   BETWEEN ? AND ? ',[fdate,tdate],function(err, rows, fields){
if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["report"] = rows;
				res.json(data);
				//console.log(data);
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
app.get('/earned', function (req, res) {
   connection.query('SELECT * FROM report WHERE  fdate   BETWEEN ? AND ? AND earned IS NOT NULL',[fdate,tdate],function(error,results){
		 if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.post('/receive', function (req, res) {
	 var fdate=req.body.fdate;
	  var tdate=req.body.tdate;
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('SELECT received_amount FROM report WHERE  fdate   BETWEEN ? AND ? ',[fdate,tdate],function (err, rows, fields) {
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
app.get('/all', function (req, res) {
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('SELECT * FROM report',function (err, rows, fields) {
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


app.get('/notification', function (req, res) {
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('SELECT count(comment_status) as cid FROM newuser where comment_status = 0;SELECT * FROM newuser ORDER BY id DESC;',function (err, rows, fields) {
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
app.get('/newuser', function (req, res) {
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('SELECT * FROM newuser',function (err, rows, fields) {
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
//SELECT * FROM newuser;
app.get('/updatenote', function (req, res) {
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('UPDATE newuser SET comment_status = 1 WHERE comment_status = 0;SELECT count(comment_status) as cid FROM newuser WHERE comment_status=0;',function (err, rows, fields) {
		
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
app.get('/api/books/', function (req, res) {
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('SELECT * FROM receive1;',function (err, rows, fields) {
		
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
app.get('/api/books1/', function (req, res) {
	var data = {
        "error": 1,
        "report": ""
    };
   connection.query('SELECT  sum(RAmount) as RAmount,sum(LAmount) as LAmount FROM receive1;',function (err, rows, fields) {
		
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