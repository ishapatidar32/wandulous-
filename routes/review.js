const express = require("express");
const router = express.Router({mergeParams :true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , validateReview , isReviewAuthor} = require("../middleware.js");
const Reviewcontrollers = require("../controllers/reviews.js");

// Add Review route 
router.post("/", validateReview , isLoggedIn,wrapAsync(Reviewcontrollers.addReviewsToListing));

// delete review route
router.delete("/:reviewId",isReviewAuthor, wrapAsync(Reviewcontrollers.deleteReview));
module.exports = router ;
