const router = require("express").Router();
const veri = require("./tokenVerify");
const User = require("../models/user");


router.get("/admin" , veri, async(req,res)=>{

    const logged = await User.findOne({_id: req.user.id})
    console.log(logged.role);
    if(logged.role===1){
        res.send("Admin page")
    }
    else{
        res.send("not an admin")
    }
})
module.exports = router;        