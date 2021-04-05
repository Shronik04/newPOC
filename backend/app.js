const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const cookieParser = require('cookie-parser')
const requireAuth = require('./middleware/authMid')
const cors = require('cors')
require('dotenv/config')
const check = require("./middleware/check")
const admin = require("./middleware/admin")
const category =require('./middleware/cat')
const { db } = require("./models/cat");
const app = express();

//use of middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use("/data" , check)
app.use("/data" , admin)
app.use('/cat', category)


//connection

mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) => {
		const DB = mongoose.connection;

		DB.collection('categories').countDocuments()
		.then(result => {
		  if(result ==0){
	  DB.collection('categories').insertMany([{name:"Teacher"},{name:"Actor"},{name:"Doctor"},{name:"Painter"},{name:"Lawer"},{name:"Scientist"}]);
		  }  app.listen(4000)
		})
		
	console.log("app running aat 4000")})
	.catch((err) => console.log("Error in connecting DB"));




app.get("/", (req, res) => {
	res.render("home");
});

app.get("/datas", (req, res) => res.render("data"));
app.get('/admin', requireAuth, (req, res) => res.render('show'));
app.use(auth);

