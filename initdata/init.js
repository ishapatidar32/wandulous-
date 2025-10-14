const mongoose = require("mongoose");
const initdata = require("./data(1).js");
const Listing = require("../models/listing.js");
main()
  .then(() =>{
    console.log("connection successful");
   })
   .catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
const initDb = async() =>{
    await Listing.deleteMany({});
     initdata.data = initdata.data.map((obj)=>({...obj,owner: "68e22c813cfd1e81d9230806"})) ; // add  one more property to over each object of data and reineslising 
    await Listing.insertMany(initdata.data);
    console.log("data was initialize");
};

initDb();