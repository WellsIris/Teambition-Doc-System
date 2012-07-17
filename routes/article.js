
/*
* Article Related Routes.
*/
var models = require('../models'),
	querystring = require("querystring"),
	Article = models.Article;

var Converter = require("pagedown/Markdown.Converter.js").Converter;
var converter = new Converter();

exports.addarticle = function(req, res){
	res.render('article_add_page', {layout:false, title: '撰写新文档' });
};

exports.submitarticle = function(req, res){
	article = new Article();
	article.author = req.session.user;
	article.title = req.body.title;
	article.category = req.body.category;
	article.capter = req.body.capter;
	article.index = req.body.index||1;
	article.content = converter.makeHtml(req.body.content);
	article.save();
	res.redirect('/');
};

exports.del = function(req, res){
	console.log("article.del is invoked");
	var id=req.body.id||req.params.id;
	console.log(req.body.id||req.params.id||"no id");
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
		console.log(docs);
		console.log(1);
		var articles = [];
			for(var i = 0; i < docs.length; i++){
		   articles.push(docs[i]);
		}
		var result = JSON.stringify(articles) || '';
		console.log(result);
		res.write(result);
		res.end();									
	}
};