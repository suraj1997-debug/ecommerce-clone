const mongoose = require('mongoose');

//mongodb connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@suraj.11gjo.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connected");
    });


var conn = mongoose.Collection;

var PageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    banners: [
        {
            img: {
                type: String
            },
            navigateTo:{
                type:String
            }

        }
    ],
    products: [
        {
            img: {
                type: String
            },
            navigateTo:{
                type:String
            }

        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',   
        required: true,
        unique: true
    },
    type: {
        type:String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true
    },
}, { timestamps: true });

var PageModel = mongoose.model('page', PageSchema);

module.exports = PageModel;