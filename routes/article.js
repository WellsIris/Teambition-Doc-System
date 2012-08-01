
/*
* Article Related Routes.
*/
var models = require('../models'),
	querystring = require("querystring"),
	Article = models.Article,
	Document = models.Document,
	Capter = models.Capter;


exports.addarticle = function(req, res){
	console.log("add art invoked");
	var author = req.param("a");
	var doc_id = req.param("d");
	var title = req.param("t");
	var content = req.param("c");
	var h = req.param("h");
	console.log(h+"content:"+content);
	var id = req.param("i");
	console.log("id"+id);
	if(id !=""&&typeof id != "undefined"){
		Article.update({_id:id},{$set:{
			title:title,
			content:content,
			h:h
		}},false,false);
		res.writeHead(200, {"Content-Type": "application/text"});
		res.write("update success");
		res.end();
	}else{
		var a = new Article();
		a.author = author;
		a.doc_id = doc_id;
		a.title= title;
		a.content = content;
		a.h = h;
		Document.find({_id:doc_id},function(err,doc){
			var index = doc[0].atls;
			a.index = index;
			console.log(a);
			a.save();
			Document.update({_id:doc_id},{$set:{
				atls:index+1
			}},false,false);
			res.writeHead(200, {"Content-Type": "application/text"});
			
			res.write("add success");
			res.end();
			});
		
		
	}
	
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
	var id=req.param("id");
	Article.remove({"_id":id},function(err){console.log("error:"+err);});
	res.writeHead(200, {"Content-Type": "application/text"});		
	res.write("del success");
	res.end();
};

exports.getAll = function(req, res){
	console.log("getarticles invoked");
	var doc_id = req.param("doc_id");
	console.log(doc_id);
	var atls = [];
	
	Article.find({doc_id:doc_id},function(err,as){
		for(var i = 0; i < as.length; i++){
			//as[i].html = escape(as[i].html);
			//as[i].content = escape(as[i].content);
			atls.push(as[i]);
		}
		res.writeHead(200, {"Content-Type": "application/json"});
		var result = JSON.stringify(atls) || '';
		res.write(result);
		console.log("result:"+result);
		res.end();
	});
	
	

	
};