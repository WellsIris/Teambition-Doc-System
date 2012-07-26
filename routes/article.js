
/*
* Article Related Routes.
*/
var models = require('../models'),
	querystring = require("querystring"),
	Article = models.Article,
	Document = models.Document,
	Capter = models.Capter;


exports.addarticle = function(req, res){
	var author = req.param("user");
	var doc_id = req.param("id");
	res.render('add_art', {layout:false, title: '撰写新文档',author:author,doc_id:doc_id });
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
	var a = new Article();
	a.author = req.body.author;
	a.title = req.body.title;
	a.doc_id = req.body.doc_id;
	var c = new Capter();
	c.title = req.body.capter;
	c.detail_content = req.body.detail_content;
	c.simple_content = req.body.simple_content;
	c.save();
	a.capters = [];
	a.capters.push(c);
	a.save(function(err){console.log(err)});
	var ol;
	Document.find({"_id":a.doc_id},function(err,doc){
		
		ol = doc[0].outline+"@"+a.title+"#"+c.title;
		Document.update({"_id":a.doc_id},{$set:{
		"outline":ol
		}},false,false);
	});
	

	
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
	var doc_id = req.param("doc_id");
	var atls = [];
	
	Article.find({doc_id:doc_id},function(err,as){
		for(var i = 0; i < as.length; i++){
		   atls.push(as[i]);
		}
		res.writeHead(200, {"Content-Type": "application/json"});
		var result = JSON.stringify(atls) || '';
		res.write(result);
		console.log("result:"+result);
		res.end();
	});
	
	

	
};