var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Capter = require('./capter');
	
var ArticleSchema = new Schema({
	author:String,
	title: String,
	capters:[Capter],
	doc_id:String,
	create_at: {type: Date, default: Date.now}
});

mongoose.model('Article', ArticleSchema);
