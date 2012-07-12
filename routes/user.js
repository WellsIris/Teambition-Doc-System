
/*
 * User Related Routes.
 */
var models = require('../models'),
    url = require("url"),
	User = models.User;

exports.login = function(req, res){
	console.log("login is invoked");
	var username = req.body.user||req.params.user||" ";
	var pass = req.body.pass||req.params.pass||"";
	console.log("username:"+username);
	console.log(User.find({"user":username}));
  if(User.find({"user":username},function(err,u){
  									console.log(u);
  									console.log(err);
  									//if(!u.pass == pass){return res.send("password is not match")}
  								}))
  {
	  req.session.user = username;
	  res.redirect('/user/'+username);
	}else{
		res.send("user is not existed");
	  }

};

exports.regis = function(req, res){
	u = new User();
	console.log(req.body.user);
	console.log(req.body.pass);
	u.user = req.body.user;
	u.pass = req.body.pass;
	u.save();
	console.log("username:"+req.body.user+"has saved.");
	req.session.user = username;
	res.redirect('/user/'+username);
}
exports.welcome = function(req, res){
	var pathname = url.parse(req.url).pathname;
	console.log("session:"+req.session.user);
	res.send("welcome,"+req.session.user);
}
exports.quit = function(req, res){
	console.log("quit is invoked");
	req.session.user = "";
	res.redirect("/");
}