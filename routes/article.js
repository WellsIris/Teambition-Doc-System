
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
	article.content = converter.makeHtml(req.body.content);
	article.save();
	res.redirect('/');
};

exports.del = function(req, res){
	var query = req.query["title"];
	Article.remove({"title":query,"author":req.session.user},function(err){console.log(err);});
	res.redirect('/');
};

exports.getarticles = function(req, res){
	console.log("getarticles invoked");
	Article.find({},function(err,docs){
		res.writeHead(200, {"Content-Type": "application/json"});
		console.log(docs);
		console.log(1);
		var articles = [];
			for(var i = 0; i < docs.length; i++){
		   articles.push(docs[i]);
		}
		var result = JSON.stringify(articles[0]) || '';
		console.log(result);
		res.write(result);
		res.end();									
	});
};