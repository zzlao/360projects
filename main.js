var userCRUD = require("./user_crud");
var express = require("express");
var http = require('http');
var app = express();
var bodyParser = require("body-parser");
var fs=require("fs")
var urlencodedParser = bodyParser.urlencoded({
	extended:false
});

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.post("/register",urlencodedParser,function(request,response){
	var username = request.body.username;
	var password = request.body.password;
	userCRUD.findByRegister(username,function(result){
		
		if(result != null){
			response.send(false);
			response.end();
		}else{
			userCRUD.insertUser(username,password,function(flag){
				response.send(flag);
				response.end();
			})
		}
	})
})

app.post("/login",urlencodedParser,function(request,response){
	var username=request.body.username;
	var password=request.body.password;
	console.log(username+":"+password);
	userCRUD.findByUser(username,password,function(result){
		if(result != null){
			response.send(true)
		}else{
			response.send(false)
		}
		response.end();
	});
});
app.get("/show",function(request,response){
	userCRUD.findAllM(function(rows){
		response.send(rows);
		response.end();
	})
})
app.get("/xinxi",function(request,response){
	fs.readFile("./json/xinxi.json",function(err,data){
		response.send(data);
		response.end(JSON.stringify(data));
	});	
})
app.listen(8888,function(){
	console.log("opening 8888...")
})
