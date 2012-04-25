
/*
 * GET home page.
 */
var models = require('../models'),
	Article = models.Article;

exports.index = function(req, res){
	var articles = [];
	Article.find(function(err,docs){
		for(var i = 0; i < docs.length; i++){
			articles.push(docs[i]);
		}
		console.log(articles);
		res.render('index', { title: 'Teambition 官方文档中心', description: '本文档提供了Teambition API的接口信息及使用范例', articles: articles });
	});	
};

exports.article = require('./article');