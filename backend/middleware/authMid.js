const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv/config')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, process.env.SECRET,async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                
                res.redirect('/login')
            } 
           
            else { 
          
                
                const verified =await User.findById(decodedToken.id)
                console.log(verified, "hello");
                next();
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

module.exports = requireAuth