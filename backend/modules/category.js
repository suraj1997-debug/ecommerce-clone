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

var CategorySchema =new mongoose.Schema({
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
    type:{
        type:String
    },
    categoryImage:{
        type:String
    },
    parentid:{
        type:String
    }
},{timestamps:true});

var CategoryModel =  mongoose.model('category',CategorySchema);

module.exports=CategoryModel;