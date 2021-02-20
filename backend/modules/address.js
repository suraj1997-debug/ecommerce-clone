const mongoose = require("mongoose");

//mongodb connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@suraj.11gjo.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connected");
});

var conn = mongoose.Collection;

var addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50,
      },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
      },
    pinCode: {
        type: String,
        required: true,
        trim: true,
      },
    locality: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100,
      },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100,
      },
    cityDistrictTown: {
        type: String,
        required: true,
        trim: true,
      },
    state: {
        type: String,
        required: true,
        required: true,
      },
    landmark: {
        type: String,
        min: 10,
        max: 100,
      },
    alternatePhone: {
        type: String,
      },
    addressType: {
        type: String,
        required: true,
        enum: ["home", "work"],
        required: true,
      },
});

var userAddressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    address: [addressSchema]
},{timestamps:true});


mongoose.model("Address", addressSchema);
module.exports = mongoose.model("UserAddress", userAddressSchema);