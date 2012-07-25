var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var CapterSchema = new Schema({
	
	name : String,
	time : {type:Date,default:Date.now},
	title:String,
	index:Number,
	detail_content: {type: String},
	simple_content:{type:String}
});

mongoose.model('Capter', CapterSchema);
