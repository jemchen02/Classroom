var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
	name: {type:String, required: true},
	username: {type:String, required: true},
	password: {type:String, required: true},
	corrects: {type:Number, default: 0},
	answered: [{type: Schema.Types.ObjectId, ref: "Post", required: true}],
	uType: {type:String, required: true}
})
module.exports = mongoose.model("User", userSchema);