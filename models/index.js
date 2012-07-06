var mongoose = require('mongoose');
	
mongoose.connect('mongodb://localhost/tbdocdb', function(err){
	if(err){
		console.log('connect to db error: ' + err.message);
		process.exit(1);
	}
});

// models
require('./article');
require('./user');
exports.Article = mongoose.model('Article');
exports.User = mongoose.model('User');

