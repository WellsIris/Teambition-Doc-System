var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var CapterSchema = new Schema({
	title:String,
	detail_content: {type: String,default : ""},
	simple_content:{type:String,default:""}
});

mongoose.model('Capter', CapterSchema);
