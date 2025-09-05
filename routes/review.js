const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingschema} = require("../schema.js");
const {reviewschema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, isReviewauthor } = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/reviews.js");


// FOR REVIEW
     //post reviews routes
     router.post("/",isLoggedIn, (createReview));
  //post delete routes
      router.delete("/:reviewId",isReviewauthor, (deleteReview));
  
module.exports = router;