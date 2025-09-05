const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingschema} = require("../schema.js");
const {reviewschema} = require("../schema.js");
const ExpressError= require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const passport = require("passport");
const {isLoggedIn} =require("../middleware.js");
const {isOwner} =require("../middleware.js");
const { index, renderNewform, show, create, edit, update, lisdelete, createListing, editListing, updateListing } = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });
//using Router.Route method

router.route("/")
.get(index)
.post(isLoggedIn,upload.single('image'),(createListing)); 
 

//new routes
router.get("/new",isLoggedIn, (renderNewform)
);

router.route("/:id")
 .put(isLoggedIn,isOwner,upload.single('listing[image]'), (updateListing))
 .delete(isLoggedIn, (lisdelete))
 .get( show);




//index routes
// router.get("/",  (index)
// );


//create routes
// router.post("/",isLoggedIn,(createListing));  

//edit routes
router.get("/:id/edit",isLoggedIn, (editListing));
//update routes
// router.put("/:id",isLoggedIn,isOwner, (updateListing));
// 
// delete routes
// router.delete("/:id",isLoggedIn, (lisdelete))
// 

//show routes
// router.get("/:id", (show)
// );

module.exports = router;