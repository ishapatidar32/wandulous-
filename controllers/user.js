const User = require("../models/userregister.js");
module.exports.singuppage = (req,res) =>{
    res.render("users/signup.ejs");
};

module.exports.addSingupdata = async(req,res) =>{
    try {
      let {username,email,password} = req.body;
    const newuser =  new User({email , username });
    const  registeredUser = await User.register(newuser,password);
    req.login(registeredUser,(err) =>{
        if(err){
           return next(err)
        }
         req.flash("success","you have register successfull");
        res.redirect("/listings");
    });
    } catch(e){
       req.flash("error","pless write the correct information");
    }
};
module.exports.loginPage = (req,res) =>{
   res.render("users/login.ejs");
};
module.exports.checkuser = async(req,res)  =>{
    req.flash( "success","welcome to wanderlust you are logged in ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
module.exports.logoutuser = (req,res,next) =>{
   req.logout((err) =>{
    if(err) {
      return   next(err);
    }
    req.flash("success","you are logged out ");
    res.redirect("/listings");
   })
}