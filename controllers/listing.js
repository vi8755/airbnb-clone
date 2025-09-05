const Listing = require("../models/listing");

module.exports.index=async  (req,res,next)=>{
    try {
        let allListings = await Listing.find();
        // console.log(alllistings);
        res.render ("\listings/index.ejs",{allListings});
    } catch (error) {
        next(err);
    }
};

module.exports.renderNewform=(req,res)=>{  
    res.render("\listings/new.ejs");
};

module.exports.show=( async (req,res)=>{
    let { id } = req.params;
    // console.log(id);
    const listing = await Listing.findById(id).populate({
        path:"review",
        populate:{
            path:"author",
        }
})
.populate("owner");
    // console.log(listing);
    if (!listing) {
        req.flash("error","Listing you requested does not exits");
        res.redirect("/listings");
    }
    res.render("\listings/show.ejs", {listing});
});

module.exports.createListing=async (req,res,next)=>{
    let url = req.file.path;
    let filename= req.file.filename;
    // console.log(url, "..", filename);
    try{

        let {title,description,price,location,country,image}=req.body;
        let newlistings =await new Listing({
            title:title,
            description:description,
            image:image,
            price:price,
            location:location,
            country:country,
        });
        newlistings.owner= req.user._id;
        newlistings.image = {url,filename};
     await newlistings.save();
    req.flash("success", "new listing created");
        res.redirect("/listings");
    }catch(err){
        next(err);
    }
};

module.exports.editListing=( async (req,res)=>{
    let { id } =req.params;
    const listing = await Listing.findById(id);
     if (!listing) {
        req.flash("error","Listing you requested does not exits");
        res.redirect("/listings");
    }
    res.render("\listings/edit.ejs",{listing});
});

module.exports.updateListing=( async (req,res)=>{
    let { id } = req.params;
    if(!req.body.listing){
        throw new ExpressError(404,"send valid  data for listing");
    }
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){   
    let url = req.file.path;
    let filename= req.file.filename;
      listing.image = {url,filename};
      await listing.save();
    }
    // console.log(updatelisting);
      req.flash("success", "Listing has Updated");
    res.redirect(`/listings/${id}`);
});

 module.exports.lisdelete=( async(req,res)=>{
    let {id}= req.params;
    const deletelisting = await Listing.findByIdAndDelete(id);
    // console.log(deletelisting);
      req.flash("success", "Listing deleted");
    res.redirect("/listings");
});
