const router = require("express").Router();
const User = require("../models/user");
const veri = require("./tokenVerify");

router.get("/show", veri, async (req, res) => {
  const logged = await User.findOne({_id :req.user.id} );

  console.log(logged);
  if (logged.role === 1) {
    res.send("1");
  } else if (logged.role === 0) {
    res.send("0");
  } else {
    res.status("400").send("invalid request");
  }
});
module.exports = router;
