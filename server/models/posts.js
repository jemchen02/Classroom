var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var postSchema = new Schema({
	postedBy: {type:String, required: true},
	content: {type:String, required: true},
	answer: {type:String}
})
module.exports = mongoose.model("Post", postSchema);