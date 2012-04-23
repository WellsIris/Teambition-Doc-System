
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Weclome to Teambition Doc' });
};

exports.article = require('./article');