if (process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/Expresserr.js");
const session = require("express-session"); //  use as a midilvar
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userregister.js");
const listingrout = require("./routes/listings.js");
const reviewrout = require("./routes/review.js");
const userrout = require("./routes/user.js");

let port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);  
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,  // thime in sec
});
store.on("error",() =>{
    console.log("Error in Mongo Session Store",err);
}); 

const sessionOptions = {  // store the info of user  the 14 day expire session (the user will logout after 14 day if hi oe shi do not do any activity on weside cooke will delete  )
    store,
    secret : process.env.SECRET,
     resave: false,
    saveUninitialized : true ,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000, // thime in mile second
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true 
    },
};

main()
  .then(() =>{
    console.log("connection successful");
   })
   .catch((err) => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate())); // login user and singin user 

passport.serializeUser(User.serializeUser());  // to serialize users into the session to store the data
passport.deserializeUser(User.deserializeUser()); // to remove user info is known as deserialize
app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
     res.locals.currUser = req.user;
    next();
});
app.use("/listings",listingrout);
app.use("/listings/:id/reviews",reviewrout);
app.use("/",userrout);
app.get("/",(req,res) =>{
    res.send("working");
});
app.all(/.*/,(req,res,next) =>{
    next(new ExpressError(404,"page Not Found !"));
});
// express ka medilewar 
app.use((err,req,res,next) =>{
    let  {statusCode = 500, message ="something went wrong !"} = err;
   // res.status(statusCode).send(message);
   res.status(statusCode).render("error.ejs",{ message});
});
app.listen(port,() =>{
    console.log("port is lesing");
});



// uploding files or image 
// make form capable of storing imgae and fils in backend by "multipart/form-data"
// use storg websid for storing image and they will give us url/link 
// which will store in bsno formate in mongoDB 
// because it have size limit and cantnot store in mongoDB 
// multer is use fore store data and uplode fils to up;od folder 
// cloud setup is use for "3  party to store data"  so for that we use cloudinary & .env file 
// to use some npm libray for cloudinary and muter to store the data of image 
// npm i cloudinary ,  multer-storage-cloudinary
// mapbox for map apl 
// geocoding : is the process of converting addresses (like a street addresss) into geographic cordinates(like latitud and longitude), 
// which you can use to place markers on a map , or position the map . 
// is to convert word(location) to latitude and longitude 
// to deploy we can use mongo atlas to deploy ower data base to cloud 
// express have local storage only for devlupment env not for production 
// deployment - render 