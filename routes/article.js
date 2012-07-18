
/*
* Article Related Routes.
*/
var models = require('../models'),
	querystring = require("querystring"),
	Article = models.Article;


exports.addarticle = function(req, res){
	res.render('add_page', {layout:false, title: '撰写新文档' });
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
	var con = content.split("@@");
	var simple_content = con[1];
	var content = con[0];

	console.log("id:"+id+"  titlt"+title+"   content:"+content);
	console.log(Article.update);
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
	article.author = req.session.user;
	article.title = req.body.title;
	article.category = req.body.category;
	article.capter = req.body.capter;
	article.index = req.body.index||1;
	var content = req.body.content;
	var con = content.split("@@");
	article.simple_content = con[1];
	article.content = con[0];
	article.save();
	res.redirect('/');
};

exports.del = function(req, res){
	console.log("article.del is invoked");
	var id=req.body.id||req.params.id;
	Article.remove({"_id":id},function(err){console.log("error:"+err);});
	res.redirect('/');
};

exports.getarticles = function(req, res){
	console.log("getarticles invoked");
	var u = req.session.user;
	if(u){
		console.log("user is:"+u);
		Article.find({author:u},function(err,docs){return ga(err,docs);});
	}else{
		console.log("user is a tourist");
		Article.find({},function(err,docs){return ga(err,docs);});
	}
	function ga(err,docs){
		res.writeHead(200, {"Content-Type": "application/json"});
		
		var articles = [];
			for(var i = 0; i < docs.length; i++){
		   articles.push(docs[i]);
		}
		var result = JSON.stringify(articles) || '';
		
		res.write(result);
		res.end();									
	}
};