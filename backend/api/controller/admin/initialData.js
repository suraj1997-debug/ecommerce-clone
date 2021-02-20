const mongoose = require('mongoose');
var category = require('../../../modules/category');
var product = require('../../../modules/product');
var Order = require('../../../modules/order');

function allCategories(categories,parentid = null){
    let  categorylist = [];
    let category;
    if(parentid == null){
        category= categories.filter(cat=>cat.parentid == undefined)
    }
    else{
        category = categories.filter(cat=>cat.parentid == parentid)
    }

    for(let cate of category){
        categorylist.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            type:cate.type,
            parentid:cate.parentid,
            children:allCategories(categories,cate._id)
        });
    }
    return categorylist;
};

exports.initialRenderData= async(req,res)=>{
    const categories = await category.find({}).exec();
    const products = await product.find({})
       .select('_id name slug productPictures price description quantity category')
       .populate({path:'category',select:'_id name'})
       .exec();
       const orders = await Order.find({})
       .populate("items.productId", "name")
       .exec();
        res.status(200).json({
            categories:allCategories(categories),
            products,
            orders
        })

      
    
       
}