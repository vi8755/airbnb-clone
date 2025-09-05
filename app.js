if ( process.env.NODE_ENV!= "production") {
    require('dotenv').config();
    
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const initData = require("./init/data.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError= require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const {listingschema} = require("./schema.js");
const {reviewschema} = require("./schema.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const cookieparser = require("cookie-parser");
const session  = require("express-session");
const MongoStore = require('connect-mongo');
const flash =  require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const { error } = require('console');
// const express = require('express')
 
 const dbUrl =  process.env. ATLASDB_URL;
 
 main().then(()=>{
     console.log("connection succesful");
 })
 .catch(err => console.log(err));
 
 async function main() {
     await mongoose.connect(dbUrl);
     
 }
 
 const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env. SECRET
    },
    touchAfter:24*3600,
 });
store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
});


 const sessionOptions = {
    store,
     secret:process.env.SECRET,
     resave:false,
     saveUninitialized:true,
     Cookie:{
         expires:Date.now() + 2*24*60*60*1000,
         Maxage:2*24*60*60*1000,
         httpOnly:true
     },
 };


 app.use(session(sessionOptions));
 app.use(flash());

 app.use(passport.initialize());
 app.use(passport.session());

 passport.use(new localStrategy(User.authenticate()));

 passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
 
 


 
 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



// let samplelisting = new Listing({
//     title:"my villa",
//     description:"nice place",
//     price:321,
//     location:"delhi",
//     country:"india"
// });
//  samplelisting.save().then((res)=>{
//     console.log(res);
//  });

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currUser= req.user;

    next();
});
app.get("/demouser", async(req,res)=>{
    let fakeuser = new User({
        email:"vk@gmail.com",
        username:"vishal",
    });
    let registerUser = await User.register(fakeuser,"helloworld");
    res.send(registerUser);
})

 app.use("/listings",listingsRouter);
 app.use("/listings/:id/reviews",reviewsRouter);
 app.use("/",userRouter); 
 
    app.listen(9999,(req,res)=>{
        console.log("app is listing at 9999");
    
    });