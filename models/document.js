var mongoose = require('mongoose'),
	Schema = mongoose.Schema;	
var DocumentSchema = new Schema({
	founder:String,
	partners:String,
	docName: String,
	outline:String,
	create_at: {type: Date, default: Date.now}
});

mongoose.model('Document', DocumentSchema);
