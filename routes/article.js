
/*
* Article Related Routes.
*/
var models = require('../models'),
	querystring = require("querystring"),
	Article = models.Article,
	Document = models.Document,
	Capter = models.Capter;


exports.addarticle = function(req, res){
	var author = req.param("author");
	res.render('add_page', {layout:false, title: '撰写新文档',author:author });
};
exports.editarticle = function(req,res){
	var o = {};
	o.title = req.body.title||"";
	o.category = req.body.category||req.body.title||"";
	o.capter = req.body.capter||"";
	o.index = req.body.index||1;
	o.content = req.body.simple_content||"";
	o.layout = false;
	o._id = req.body.id;
	res.render('edit_page', o);
}
exports.update = function(req,res){
	console.log("update invoked");
	var id = req.body.id;
	var title = req.body.title;
	var category = req.body.category;
	var capter = req.body.capter;
	var index = req.body.index||1;
	var content = req.body.content;
	var simple_content = req.body.simple_content;
	Article.update({"_id":id},{$set:{
			"title":title,
			"category":category,
			"capter":capter,
			"index":index,
			"content":content,
			"simple_content":simple_content
		}},false,false);
	res.redirect('/');
}
exports.submitarticle = function(req, res){
	article = new Article();
	article.author = req.body.author;
	article.title = req.body.title;
	article.category = req.body.category;
	article.capter = req.body.capter;
	article.index = req.body.index||1;
	article.content = req.body.content;
	article.simple_content = req.body.simple_content;
	article.save();
	res.redirect('/');
};

exports.del = function(req, res){
	console.log("article.del is invoked");
	var id=req.body.id||req.params.id;
	Article.remove({"_id":id},function(err){console.log("error:"+err);});
	res.redirect('/');
};

exports.getAll = function(req, res){
	console.log("getarticles invoked");
	var user = req.param("user");
	var documents = [];
	
	Document.find({founder:user},function(err,docs){
		for(var i = 0; i < docs.length; i++){
		   documents.push(docs[i]);
		}
	});
	Document.where(user).in("partners").exec(function(err,docs){
		for(var i = 0; i < docs.length; i++){
		   documents.push(docs[i]);
		}
	});

	res.writeHead(200, {"Content-Type": "application/json"});
	var result = JSON.stringify(documents) || '';
	res.write(result);
	res.end();

	
};