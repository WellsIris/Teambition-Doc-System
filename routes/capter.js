
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
	var author = req.param("user");
	var date = Date.now;
	var id = req.body.id;
	var title = req.body.title;
	var index = req.body.index||1;
	var detail_content = req.body.detail_content;
	var simple_content = req.body.simple_content;
	Capter.update({"_id":id},{$set:{
			"title":title,
			"author":author,
			"time":time,
			"index":index,
			"datail_content":detail_content,
			"simple_content":simple_content
		}},false,false);
	res.redirect('/');
}
exports.submitarticle = function(req, res){
	capter = new Capter();
	capter.author = req.body.author;
	capter.title = req.body.title;
	capter.index = req.body.index||1;
	capter.detail_content = req.body.detail_content;
	capter.simple_content = req.body.simple_content;
	capter.save();
	res.redirect('/');
};

exports.del = function(req, res){
	console.log("capter.del is invoked");
	var id=req.body.id||req.params.id;
	Capter.remove({"_id":id},function(err){console.log("error:"+err);});
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