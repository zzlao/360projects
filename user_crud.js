function UserCRUD(){
	var sessionFactory = require("./SessionFactory");
	this.findAllM=function(callback){
		var conn = sessionFactory.getConnection();
		var findAllMobile="SELECT id,brand from mobile";
		conn.query(findAllMobile,function(err,rows){
			if(err) throw err;
			conn.end();
			return callback(rows);
		})
	}
	this.findByRegister = function(username,callback){
		var conn = sessionFactory.getConnection();
		var findByIdSQL = "SELECT id from mysql where username='"+ username +"'"
		conn.query(findByIdSQL,function(err,rows){
			if(err) throw err;
			conn.end;
			return callback(rows[0])
		})
	}
	this.findByUser = function(username,password,callback){
		var conn=sessionFactory.getConnection();
		var findByIdSQL="SELECT id from mysql where username='" + username + "' and password='" + password + "'";
		console.log(findByIdSQL)
		conn.query(findByIdSQL,function(err,rows){
			if(err) throw err;
			conn.end();
			return callback(rows[0]);
		});
	}
	this.insertUser = function(usernameVal,passwordVal,callback){
		var conn=sessionFactory.getConnection();
		var insertSQL = "insert into mysql(username,password) values('" + usernameVal + "','" + passwordVal+"')";
		conn.query(insertSQL,function(err,res){
			if(err) throw err;
			var flag =false;
			if(res.affectedRows>0) flag=true;
			conn.end();
			callback(flag)
		})
	}
}
module.exports = new UserCRUD();
