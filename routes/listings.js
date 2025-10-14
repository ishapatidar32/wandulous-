const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner ,validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudeconfig.js");
const upload = multer({storage})


router.route("/")
.get(wrapAsync (listingController.index))
.post(isLoggedIn,
     validatelisting,
     upload.single('listing[image]'),
     wrapAsync(listingController.addnewlisting)
);
router.get("/new",isLoggedIn,listingController.rendernewForm);

// update route 
// delete rout
 router.route("/:id")
 .get(wrapAsync(listingController.showlisting))
.put(isLoggedIn,isOwner, upload.single('listing[image]'),
    validatelisting, wrapAsync (listingController.addEditToListing))
.delete(isLoggedIn,isOwner,wrapAsync( listingController.deletelisting));


// edit rout 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editlistingForm));


module.exports = router ;