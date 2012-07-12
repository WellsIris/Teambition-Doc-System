var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var CapterSchema = new Schema({
	index:{type:String},
	art_title:{type:String},
	title: {type: String},
	content: {type: String},
	create_at: {type: Date, default: Date.now}
});

mongoose.model('Capter',CapterSchema);