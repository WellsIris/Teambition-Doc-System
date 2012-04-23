
/*
 * Article Related Routes.
 */

var Converter = require('../node_modules/pagedown/Markdown.Converter').Converter
  , conv = new Converter()

exports.addarticle = function(req, res){
  res.render('article_add_page', { title: 'Weclome to Doc' });
};

exports.submitarticle = function(req, res){
	console.log(conv.makeHtml(req.body.content));
	res.render('aritcle_submit_status_page',{ title: 'result', content: conv.makeHtml(req.body.content)});
}