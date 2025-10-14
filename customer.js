/*const mongoose = require("mongoose");
const { schema } = require("./models/listing");
const { string, types } = require("joi");
const Schema = mongoose.Schema;
const orderSchema = new Schema ({
    iteam : String,
    price : Number
});
const customerSchema = new Schema({
    name : String ,
    orders : [
        {
            type: Schema.Types.ObjectId,
            ref : "Order",
        },
    ],
});
const Order = mongoose.model("Order",orderSchema);
const customer = mongoose.model("customer",customerSchema);
// function to show 
const findCustomer = async () => {
    let result = await customer.find({}).populate("orders");
};
/*customerSchema.pre("findOneAndDelete", async () => { // same as find by id and delet
    console.log("PRE MIDDLEWARE");
}) befor query
customerSchema.post("findOneAndDelete", async (customer) => { // same as find by id and delet
    if(customer.orders.length){
    let res = await    Order.deleteMany({_id: {$in: customer.orders}});
    console.log(res);
    }
    console.log("post MIDDLEWARE");
})
// function add the customer in data base 
const addcustomer = async () => {
    let newcut = new customer ({
        name : "mhai",
    });
    let neword = new Order ({
        iteam : "pizza",
        price : 250
    });
    newcut.orders.push(neword);
    await neword.save();
    await newcut.save();
};
const delcust = async() =>{
    let data = await customer.findByIdAndDelete("/");
    console.log(data);
}
$pull operator remove from an existing array all instances of value or values that match a specified condition
app.get("/getcookies",(req,res) =>{
      res.cookie("greet","hello");
    res.send("sent you some cookies !")}) 
     parse the cookise 
app.get("/" ,(req,res) =>{
    console.dir(req.cookies );
    res.send("cookis") ;})
app.get("/greet",(req,res) =>{
     let {name = "somewrong"} = req.cookies;
     res.send(`hii ${name}`) })

     signed cookies to prtect  from tempring 
    cookies is the peac of information which can be parsee and store the information  */
