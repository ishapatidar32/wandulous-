const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/userregister.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/user.js");
// signup user  open the singup page
// add data in user schema after sumbtion
router.route("/signup")
.get(usercontroller.singuppage)
.post( wrapAsync(usercontroller.addSingupdata));
// login user through passport
router.route("/login")
.get( usercontroller.loginPage)
.post(saveRedirectUrl ,passport.authenticate("local",{failureRedirect: '/login' ,failureFlash: true, }) , usercontroller.checkuser
);

// logout 
router.get("/logout",usercontroller.logoutuser);
module.exports = router ;