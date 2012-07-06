
/*
 * User Related Routes.
 */
var models = require('../models'),
    url = require("url"),
	User = models.User;

exports.login = function(req, res){
	console.log("username:"+req.body.user);
  if(User.find(req.body.user)){
	  console.log("username:"+req.body.user);
	  req.session.user = req.body.user;
	  res.redirect('/user/'+req.body.user);
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
	res.redirect('/');
}
exports.welcome = function(req, res){
	var pathname = url.parse(req.url).pathname;
	console.log("session:"+req.session.user);
	res.send("welcome,"+req.session.user);
}