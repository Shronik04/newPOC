const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require('dotenv/config')
const crypto = require('crypto')


const handleError = (err) => {
	console.log(err.message, err.code);
	let errors = { email: "", password: "" };

	if (err.message === "incorrect email") {
		errors.email = "that email is not registered";
		return errors;
	}

	if (err.message === "incorrect password") {
		errors.password = "that password is not registered";
		return errors;
	}

	if (err.code === 11000) {
		errors.email = "This email already exists";
		return errors;
	}

	if (err.message.includes("")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "ninja secret", {
		expiresIn: maxAge,
	});
};


module.exports.shronik_put = async (req,res) =>{

	const newPass=req.body.npass;
	const tok=req.body.ntok

	console.log("NEW PASS CALLED");
console.log(newPass);
console.log(req.body.ntok);


	User.findOne({resetToken: tok, expireToken: {$gt:Date.now()} })
	.then(result=>{
		if(!result)
		return res.status(422).send("Session expired")

		bcrypt.hash(newPass, 10).then(hashPassword => {
      
            result.password = hashPassword;
            result.resetToken = undefined;
            result.expireToken = undefined;

            result.save().then((savedUser)=>{
              res.send("Password Successfully updated")
            })
            .catch(err => console.log(err))
    })
	})
	.catch(err=>{console.log(err);
		res.send(err)})

}


module.exports.signup_post = async (req, res) => {
	const { name, email, password, category} = req.body;
	try {
		const user = await User.create({ name, email, password,  category });
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).send({ user: user._id, message: "created" });
	} catch (err) {
		const errors = handleError(err);
		res.status(400).json(errors);
	}
};
module.exports.login_post = async (req, res) => {

	const { email, password } = req.body;


	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		if (user.status === "disabled") {
			res.status(400).send("You are not allowed")
		}
		else {
			res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.status(200).send({ token, message: "logged" });
			// res.send("logged")
		}

	} catch (err) {
		const errors = handleError(err);
		res.status(400).json({ errors });
	}
};
module.exports.admin_get = (req, res) => {
	res.send("welcome to admin");
};
module.exports.all = (req, res) => {

	try {
		const search = req.query.name;
		User.find({ name: { $regex: search, $options: '$i' } })
			.populate('category')
			.then((result) => res.send(result))
		.catch((err)=>console.log(err))

	}
	catch {
			User.find()
		.populate('category')
		.then((result) => res.send(result))
		.catch((err) => console.log("err"));
	}


};
module.exports.user_get = async (req, res) => {
	//   console.log("req",req.user)
	const userShow = await User.findOne({ _id: req.user.id });
	console.log("this is user", userShow);
	res.send(userShow);
};

module.exports.id = (req, res) => {
	User.findById(req.params.id)
		.then((result) => res.send(result))
		.catch((err) => console.log(err));
};

module.exports.del = (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then((result) => res.send(result))
		.catch((err) => console.log(err));
};

module.exports.edit_post = async (req, res) => {
	User.updateOne(
		{ _id: req.params.id },
		{ $set: { name: req.body.name, email: req.body.email, status: req.body.status, category: req.body.category } }
	).then((result) => res.send(result))
		.catch((err) => { res.status(400).send("email already exists") })
};

module.exports.pass = async (req, res) => {
	
	const user = await User.findById(req.params.id) 
	var old = req.body.old
	const auth = await bcrypt.compare(old, user.password)
	var passw = req.body.passw
	var passw2 = req.body.passw2
	

	if (auth) {
		if (passw === passw2) {
		const salt = await bcrypt.genSalt();
			passw2 = await bcrypt.hash(passw2, salt)
			
	User.updateOne({ _id: req.params.id },
		{ $set: { password: passw2 } })
		.then((result) => res.send('success'))
	.catch((err)=>{res.status(400).send("some error in setting")})
		}
		else {
			console.log("Password don't match");
			res.status(400).send("Password don't match")
		}

	}
	else {
		res.status(400).send("current password does not match")
	
	}

}
module.exports.reset = async (req, res)=>{
// async..await is not allowed in global scope, must use a wrapper
	// res.send(result);
	crypto.randomBytes(32,(err,buffer)=>{
		if(err){
			console.log(err);
		}
		const token =buffer.toString('hex')

		if(req.body.email ==""){
			res.status(400).send("Email is required")
		}
		User.findOne({email: req.body.email})
		.then((result)=>{
			if(result == null){
				res.status(404).send("No such email found")
			}
			else{
				result.token =token;
				result.expireToken =Date.now() + 3600000;
				result.save().then((result)=>{
					var transporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
						// user: `${process.env.EMAIL_ADDRESS}`,
						// pass: `${process.env.PASSWORD}`,
						user:process.env.MAIL , // generated ethereal user
						  pass: process.env.E_PASS,
						},
						});
						

						var mailOptions = {
							from: `admin@nodemail.com`,
							to: `${req.body.email}`,
							subject: "Reset password",
								text: "new!",
							html:`<p>Click this Link:<a href="http://localhost:3000/resetpass${token}" >RESET PASSWORD</a> </p>`
							};
							
							transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
							console.log(error);
							res.send(error);
							} else {
							console.log("Email sent: " + info.response)
							res.send("Email sent");
							}
							});
							
				})
			}
		})
	})
	

}

