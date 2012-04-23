
/*
 * Article Related Routes.
 */

markdown = require('markdown').markdown;

exports.addarticle = function(req, res){
  res.render('article_add_page', { title: 'Weclome to Doc' });
};

exports.submitarticle = function(req, res){
	res.render('aritcle_submit_status_page',{ title: 'result', content: markdown.toHTML(req.body.content)});
}