
/*
 * GET home page.
 */
var models = require('../models'),
	Article = models.Article;
	User = models.User;

exports.index = function(req, res){
	var articles = [];
	if(req.session.user){console.log("user existed.");
	Article.find({"author":req.session.user},function(err,docs){
		for(var i = 0; i < docs.length; i++){
			articles.push(docs[i]);
		}
		res.render('index', { title: 'Teambition 官方文档中心', description: '本文档提供了Teambition API的接口信息及使用范例', user:req.session.user});
	});	
	}
	else{console.log("no user ");
	  	res.render('index', { title: 'Teambition 官方文档中心', description: '本文档提供了Teambition API的接口信息及使用范例', user:""});
	}
};

exports.article = require('./article');
exports.user = require('./user');