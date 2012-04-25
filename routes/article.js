
/*
 * Article Related Routes.
 */
var models = require('../models'),
	Article = models.Article;

var Converter = require("pagedown/Markdown.Converter.js").Converter;
var converter = new Converter();

exports.addarticle = function(req, res){
  res.render('article_add_page', { title: '撰写新文档' });
};

exports.submitarticle = function(req, res){
	article = new Article();
	article.title = req.body.title;
	article.category = req.body.category;
	article.content = converter.makeHtml(req.body.content);
	article.save();
	res.render('aritcle_submit_status_page',{ layout: false, title: 'result', content: converter.makeHtml(req.body.content)});
}