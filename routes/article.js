
/*
 * Article Related Routes.
 */

var Converter = require("pagedown/Markdown.Converter.js").Converter;
var converter = new Converter();

exports.addarticle = function(req, res){
  res.render('article_add_page', { title: 'Weclome to Doc' });
};

exports.submitarticle = function(req, res){
	console.log(req.headers);
	res.render('aritcle_submit_status_page',{ layout: false, title: 'result', content: converter.makeHtml(req.body.content)});
}