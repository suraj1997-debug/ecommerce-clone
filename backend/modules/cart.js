const mongoose = require('mongoose');

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

var CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'users',
        required:true
    },
   cartItems:[
       {
           product:{
               type:mongoose.Schema.Types.ObjectId,ref:'products',
               required:true
           },
           quantity:{
               type:Number,
               default:1
           }

       }
   ],
},{timestamps:true});

var CartModel =  mongoose.model('carts',CartSchema);

module.exports=CartModel;