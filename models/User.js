const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Please add email address"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please add password"],
	},
	links: [
		{
			type: Types.ObjectId,
			ref: "Link",
		},
	],
});

module.exports = model("User", userSchema);
