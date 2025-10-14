const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index = async (req,res) =>{
   const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
};                                      
module.exports.rendernewForm = (req,res) =>{ 
    res.render("./listings/newlist.ejs")
};

module.exports.showlisting = async (req,res) =>{
    let {id} = req.params;
   const listing = await Listing.findById(id)
   .populate({path :"reviews",populate: { path : "author"},})
   .populate("owner");
   if(!listing){
        req.flash("error","listing you requested for does not exist !")
        res.redirect("/listings");
    }
   res.render("./listings/show.ejs",{listing});
};

module.exports.addnewlisting = async (req,res,next) =>{
 let response =   await  geocodingClient.forwardGeocode({
     query: req.body.listing.location, 
      limit: 1,
    })
  .send()
    
     let url = req.file.path;
     let filename = req.file.filename;
      //   let {id} = req.params;
    // long method let {title,descriptio,image,price,location,country} = req.body;
     const listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = {url ,filename};
    newListing.geometry  = response.body.features[0].geometry;
     await newListing.save();
    req.flash("success","new list is add successfull !");
    res.redirect("/listings");
     };
module.exports.editlistingForm = async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested for does not exist !");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl =  originalImageUrl.replace("/upload","/upload/h_300,w_250")
     res.render("./listings/edit.ejs",{listing , originalImageUrl});
};
module.exports.addEditToListing = async (req,res) =>{
      let {id} = req.params;
      let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});
      if( typeof req.file !== "undefined") {
       let url = req.file.path;
       let filename = req.file.filename;
      listing.image = {
        url , filename
      }
       await listing.save(); 
    }
     req.flash("success","listing is update !");
    res.redirect(`/listings/${id}`);
};
module.exports.deletelisting = async (req,res) =>{
      let {id} = req.params;
      let deletelist =  await Listing.findByIdAndDelete(id);
     // console.log(deletelist);
      req.flash("success","listing is deleted succesfull !");
      res.redirect("/listings");
};