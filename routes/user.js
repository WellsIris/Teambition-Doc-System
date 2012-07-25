
/*
 * User Related Routes.
 */
var models = require('../models'),
    url = require("url"),
	User = models.User,
	http = require('http'),
	querystring = require('querystring'),
	config = require('../config').config;

exports.login = function(req, res){	
	
	res.clearCookie('oauth_access_token');
	res.clearCookie('oauth_access_signature');

	var options = {
		host: config.api_host,
		port: 80,
		path: '/oauth/request_token',
		method: 'GET',
		headers: {'AUTHORIZATION': "OAuth oauth_consumer_key="+config.oauth_consumer_key+",oauth_signature="+config.oauth_signature+",oauth_nonce=" + Math.floor(new Date().getTime()).toString() + ",oauth_timestamp=" + Math.floor(new Date().getTime()/1000).toString() + ",oauth_signature_method=PLAINTEXT,oauth_version=1.0,oauth_callback="+config.oauth_callback}
	};

	var get_request_token = http.get(options, function(response) {
		response.on('data', function (chunk) {
			var results = querystring.parse(chunk.toString());
			var oauth_token= results["oauth_token"];
      		var oauth_token_secret= results["oauth_token_secret"];
      		req.session.oauth_token = oauth_token;
      		req.session.oauth_token_secret = oauth_token_secret;
			res.redirect('http://'+config.api_host+'/oauth/authorize?oauth_token='+oauth_token);
		});
	});
};

exports.auth_callback = function(req, res){
	var options = {
		host: config.api_host,
		port: 80,
		path: '/oauth/access_token',
		method: 'GET',
		headers: {'AUTHORIZATION': "OAuth oauth_consumer_key="+config.oauth_consumer_key+",oauth_token=" + req.session.oauth_token + ",oauth_signature="+ config.oauth_signature + req.session.oauth_token_secret + ",oauth_nonce=" + Math.floor(new Date().getTime()).toString() + ",oauth_timestamp=" + Math.floor(new Date().getTime()/1000).toString() + ",oauth_verifier=" + req.param('oauth_verifier') + ",oauth_signature_method=PLAINTEXT,oauth_version=1.0"}
	};
	var get_access_token = http.get(options, function(response) {
		response.on('data', function (chunk) {
			var results = querystring.parse(chunk.toString());
			var oauth_access_token= results["oauth_token"];
      		var oauth_access_token_secret= results["oauth_token_secret"];
      		var oauth_access_signature = config.oauth_signature + oauth_access_token_secret;
			res.cookie('oauth_access_token',oauth_access_token);
			res.cookie('oauth_access_signature',oauth_access_signature);
			res.redirect('/');
		});
	});
};

exports.logout = function(req,res){
	res.clearCookie('oauth_access_token');
	res.clearCookie('oauth_access_signature');
	res.redirect('/');
};
exports.signup = function(req, res){
	res.render('signup', {
		layout:false
	});
};
