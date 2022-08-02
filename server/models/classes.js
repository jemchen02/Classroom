var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var classSchema = new Schema({
	teacher: {type:String, required: true},
	name: {type:String, required: true},
	students: [{type:String, required: true}],
	posts: [{type: Schema.Types.ObjectId, ref: "Post", required: true}]
})
module.exports = mongoose.model("Class", classSchema);
