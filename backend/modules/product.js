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

var ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    offer:{
        type:Number
    },
    productPictures:[
       { img:{
            type:String
        }
    }
   ],
    reviews:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId, ref:'users'
            },
            review:String
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId, ref:'category',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref: 'users',
        required:true
    },
    updatedAt:Date,

},{timestamps:true});

var ProductModel =  mongoose.model('products',ProductSchema);

module.exports=ProductModel;