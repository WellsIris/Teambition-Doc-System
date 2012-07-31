var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var ArticleSchema = new Schema({
	author:String,
	title: String,
	content:String,
	html:String,
	doc_id:String,
	index:Number,
	create_at: {type: Date, default: Date.now}
});

mongoose.model('Article', ArticleSchema);
