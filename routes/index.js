
/*
 * GET home page.
 */
var models = require('../models'),
	Article = models.Article;
	User = models.User,
	Document = models.Document;

exports.index = function(req, res){
	
	res.render('index');
	
};

exports.article = require('./article');
exports.user = require('./user');
exports.doc = require('./doc');