const Listing = require("../models/listing");
const Review = require("../models/review.js");

module.exports.createReview=async (req,res)=>{
         console.log(req.params.id);
         let listing = await Listing.findById(req.params.id);
         if ( !req.user) {
           req.flash("error", "you can't send an review");
         return  res.redirect(`/listings/${listing._id}`)
          
         }
         let {comment,rating} = req.body;
         let newReview = new Review({
             comment:comment,
             rating:rating,
         });
         
         newReview.author= req.user._id;
         listing.review.push(newReview);
         
         await newReview.save();
         await listing.save();
           req.flash("success", "new review created");
         // console.log(newReview);
         res.redirect(`/listings/${listing._id}`);
     };

     module.exports.deleteReview=async(req,res)=>{
         
          let { id,reviewId}= req.params;
  await Listing.findByIdAndUpdate(id, {$pull:{review:reviewId}});
          await Review.findByIdAndDelete(reviewId);
            req.flash("success", "Review deleted");
      res.redirect(`/listings/${id}`);
      };