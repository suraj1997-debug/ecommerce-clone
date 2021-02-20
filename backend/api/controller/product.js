const mongoose = require('mongoose');
const slugify = require('slugify');
const productModel = require('../../modules/product');
const categoryModel = require('../../modules/category');


exports.addProduct=(req,res)=>{

    const{
        name,
        price,
        description,
        category,
        quantity,
        createdBy

    }=req.body;

    let productPictures =[];

    if(req.files.length > 0){
       productPictures = req.files.map(file=>{
           return {img : file.filename}
       });
    }

    const ProductDetails = new productModel({
        name:name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy:req.user._id
    })

    ProductDetails.save()
    .then(product=>{
        res.status(201).json({
            message:"Product Created Successfully!!",
            product:product
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

}


exports.getProductsBySlug = (req,res)=>{
    const {slug} = req.params;
    categoryModel.findOne({slug:slug})
    .exec((error,category)=>{
        if(error){
           return res.status(400).json({
                error:error
            })
        }

        if(category){
           productModel.find({category:category._id})
           .select('_id name slug productPictures price description quantity category')
           .populate({path:'category',select:'_id name slug'})
           .exec((error,products)=>{
               if(error){
                   res.status(400).json({
                       error:error
                   })
               }
               if(products.length > 0){
                res.status(200).json({
                    products:products,
                    priceRange: {
                        under5k: 5000,
                        under10k: 10000,
                        under15k: 15000,
                        under20k: 20000,
                        under30k: 30000,
                      },
                    productPrice:{
                        under5k: products.filter(product=>product.price <= 5000),
                        under10k: products.filter(product=>product.price > 5000 && product.price <= 10000),
                        under15k: products.filter(product=>product.price > 10000 && product.price <= 15000),
                        under20k: products.filter(product=>product.price > 15000 && product.price <= 20000),
                        under30k: products.filter(product=>product.price > 20000 && product.price <= 30000),
                    }
                })
               }
               
           }) 
        }

    })
}



exports.getProductDetailsById = (req,res)=>{
    const {productId} = req.params;
    productModel.findOne({_id:productId})
    .exec((error,product)=>{
        if(error){
           return res.status(400).json({
                error:error
            })
        }
        if(product){
            return res.status(200).json({
                product
            })
        }
        else{
            return res.status(400).json({ error:"Params Required!!"})
        }
    })
}