
/*
* Article Related Routes.
*/
var models = require('../models'),
	querystring = require("querystring"),
	Article = models.Article,
	Document = models.Document,
	Capter = models.Capter;


exports.add = function(req, res){
	console.log("doc add invoked");
	var d = new Document();
	d.founder = req.body.founder;
	d.partners = req.body.partners;
	d.outline = req.body.outline;
	d.docName = req.body.docName;
	d.save(function(err){
		console.log(err);
	});
	if(d.outline!=""){
		var ol = initOutline(d.outline);
	}
	var len = ol.articles.length;
	for(var i=0;i<len;i++){
		var atl = ol.articles[i];
		var arr = ol[atl];
		var a = new Article();
		a.title = atl;
		a.author = d.founder;
		a.capters = makeCapters(arr);
		a.doc_id = d._id;
		a.save(function(err){console.log(err)});
	}

	function initOutline(ol){
		var result = {};
		var atl = result.articles = [];
		var arts = ol.split("@");
		for(var i=0;i<arts.length;i++){
			var a = arts[i].split("#");
			var cs = a[1].split(",");
			atl.push(a[0]);
			result[a[0]] = cs;
		}
		
		return result;
	}
	function makeCapters(arr){
		var len = arr.length;
		var a = [];
		for(var i=0;i<len;i++){
			var c = new Capter();
			c.title = arr[i];
			c.save(function(err){console.log(err)});
			a.push(c);
		}
		return a;
	}

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


