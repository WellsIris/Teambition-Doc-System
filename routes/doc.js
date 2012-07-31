
/*
* Article Related Routes.
*/
var models = require('../models'),
	querystring = require("querystring"),
	Article = models.Article,
	Document = models.Document;


exports.add = function(req, res){
	console.log("doc add invoked");
	var d = new Document();
	d.founder = req.body.founder;
	d.partners = req.body.partners;
	d.docName = req.body.docName;
	d.save(function(err){
		console.log(err);
	});
	
	res.redirect('/');
};
exports.getAll = function(req, res){
	console.log("doc getAll invoked");
	var user = req.session.user||req.body.user||req.params.user||req.param("user");
	
	var documents = [];
	
	Document.find({founder:user},function(err,docs){
		for(var i = 0; i < docs.length; i++){
		   documents.push(docs[i]);
		}
		res.writeHead(200, {"Content-Type": "application/json"});
		var result = JSON.stringify(documents) || '';
	
		res.write(result);
		res.end();
	});
	
	

};
exports.saveSession = function(req, res){
	console.log("saveSession invoked");
	var user = req.body.user||req.params.user||req.param("user");
	
	req.session.user = user;
};


