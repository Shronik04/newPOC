const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Schema;
const Category = require('../models/cat')
const userSchema = new mongoose.Schema({


	name:{
		type:String,
		required:[true, "enter your name "],
	},
	email: {
		type: String,
		required: [true, "please enter a valid email"],
		unique: true,
		validate: [isEmail, "please enter a valid email"],
	},
	password: {
		type: String,
		minLength: [6, "min length req is 6 characters"],
		required: [true, "Enter a password"],
    },
    role: {
        type: Number,
        default: 0,
	},
	category: {
		type: ObjectId,
		ref:"Category",
		required:true
	},
	status: {
		type: String,
		default: "active"
	},
	
	  resetToken:String,
	  expireToken : String,
});

userSchema.post("save", function (doc, next) {
	console.log("new user was created & saved", doc);
	next();
});
userSchema.pre("save", async function (next) {
	// console.log("user abotu to be created & saved", this);
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
const User = mongoose.model("user", userSchema);
module.exports = User;
