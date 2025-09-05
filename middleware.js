 const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn = (req,res,next)=>{
        if(!req.isAuthenticated()){
          req.session.redirectUrl = req.originalUrl;
          // console.log(req.session.redirectUrl);
        req.flash("error", "you must br login to create a listing");
         return res.redirect("/login"); 
    }
  next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
  if ( req.session.redirectUrl) {
    req.locals=  req.session.redirectUrl;
    console.log(req.locals);
  }
  next();
};

module.exports.isOwner = async(req,res,next)=>{
      let { id } = req.params;
    let listing = await Listing.findById(id);
 if(!listing.owner._id.equals(res.locals.currUser._id)){
     req.flash("error", "You don't have a permission to edit ");
   return res.redirect(`/listings/${id}`);

 }
 next();
}
module.exports.isReviewauthor = async(req,res,next)=>{
      let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
 if(!review.author._id.equals(res.locals.currUser._id)){
     req.flash("error", "You are not the author of this review ");
   return res.redirect(`/listings/${id}`);

 }
 next();
}