const User = require("../models/user");

module.exports.renderSignup =(req,res)=>{
    res.render("users/signUp.ejs");
};

module.exports.SignUp=async (req,res)=>{
    try{

        let {email,username,password} = req.body;
        const newUser = new User({email,username});
        const registerUser =  await User.register(newUser,password);
          console.log(registerUser);
          req.login(registerUser,(err)=>{
            if ( err) {
                return next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listings");
        });
    }catch(e){
        // res.send(e);
        req.flash("error",e.message);
        res.redirect("/signUp");
    }
};

module.exports.renderLogin =(req,res)=>{
    res.render("users/login.ejs");
};

 
module.exports.Login=async(req,res)=>{
req.flash( "success"," you have logged in");
if (req.locals) {
    return res.redirect(req.locals);
}
else{
    res.redirect("/listings");
}
 };

module.exports.LogOut=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you have logged out!");
        res.redirect("/listings");
    });
};