const jwt = require("jsonwebtoken");
require('dotenv/config')

module.exports = function reqAuth(req,res,next){
const token = req.header("Auth");

if(token){
    try{
        const veri = jwt.verify(token, process.env.SECRET);
        req.user=veri;
    }
    catch(err){
        res.status(400).send("wrong token ")
    }
    next();
}
else{
    res.status(401).send("not allowed")
}
}