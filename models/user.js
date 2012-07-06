var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var UserSchema = new Schema({
	user: {type: String},
	pass: {type: String},
	create_at: {type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);
