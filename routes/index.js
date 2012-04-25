
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
	});
	res.render('index', { title: 'Weclome to Teambition Doc' });
};

exports.article = require('./article');