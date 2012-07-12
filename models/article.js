var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var ArticleSchema = new Schema({
	author:{type:String},
	title: {type: String},
	capter:{type:String},
	index:{type:String},
	category: {type: String},
	content: {type: String},
	create_at: {type: Date, default: Date.now}
});

mongoose.model('Article', ArticleSchema);
