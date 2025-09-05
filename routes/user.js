const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { renderSignup, SignUp, renderLogin, Login, LogOut } = require("../controllers/users.js");

router.use(express.urlencoded({extended: true}));
router.use(express.json());

//Router.Route method
router.route("/signUp")
.get( (renderSignup))
.post( (SignUp));

router.route("/login")
.get( (renderLogin))
.post(saveRedirectUrl,passport.authenticate("local",{
     failureRedirect:'/login', 
     failureFlash:true,
    })
  , (Login));

  router.get("/logout", (LogOut));





// router.get("/signUp", (renderSignup))
// router.post("/signUp", (SignUp));

// router.get("/login", (renderLogin));
//  router.post("/login",saveRedirectUrl,passport.authenticate("local",{
//      failureRedirect:'/login', 
//      failureFlash:true,
//     })
//   , (Login));



module.exports = router;  