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


var orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserAddress.address",
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    items: [
        {
           productId:{
               type:mongoose.Schema.Types.ObjectId,
               ref: "products"
           },
           payablePrice:{
               type:Number,
               required:true
           },
           purchasedQty:{
               type:Number,
               required:true
           }
        }
    ],
    paymentStatus:{
        type:String,
        enum: ['pending','completed','cancelled','refund'],
        required:true
    },
    paymentType: {
        type: String,
        enum: ["cod", "card"],
        required: true,
      },
    orderStatus: [
      {
          type: {
            type: String,
            enum: ["ordered", "packed", "shipped", "delivered"],
            default: "ordered",
          },
          date: {
            type: Date,
          },
          isCompleted: {
            type: Boolean,
            default: false,
          },
        },
      ],
},{timestamps: true});

var orderModel = mongoose.model("Orders",orderSchema);

module.exports = orderModel;


