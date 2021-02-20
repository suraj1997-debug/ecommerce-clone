const mongoose = require('mongoose');
const categoryModel = require('../../modules/category');
const slugify = require('slugify');
const env = require('dotenv');
const shortid = require('shortid');

env.config();

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




exports.addCat = (req,res)=>{

  const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`
    }

    if(req.file){
        categoryObj.categoryImage= process.env.API + '/public/' + req.file.filename;
    }

    if(req.body.parentid){
        categoryObj.parentid = req.body.parentid;
    }


    const cat = new categoryModel(categoryObj);

    cat.save()
    .then(data=>{
        res.status(201).json({
            message:"Category added Successfully!!",
            category:data
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}


exports.getCategories=(req,res)=>{


    const getCategories=categoryModel.find({})
    
    getCategories.exec()
    .then(categories=>{

        const categorylist = allCategories(categories);

        res.status(200).json({
            categories:categorylist
        })
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    })
}


exports.updateCategories = async(req,res)=>{

    const {_id,name,type,parentid} = req.body;
   const UpdatedCategories = [];
    if(name instanceof Array){
        for(let i=0;i<name.length;i++){
         
            const category = {
                name:name[i]
            }
            if(parentid[i] !== ""){
                category.parentid = parentid[i];
            }
            if(type[i] !== ""){
                category.type = type[i];
            }

            const UpdatedCategory = await categoryModel.findOneAndUpdate({_id:_id[i]},category,{new:true});
            UpdatedCategories.push(UpdatedCategory);
           
        }
        return res.status(201).json({
            UpdateCategories:UpdatedCategories
        })
    }
    else{
        const category = {
            name
        }
        if(parentid !== ""){
            category.parentid = parentid;
        }

        if(type !== ""){
            category.type = type;
        }

        const UpdatedCategory = await categoryModel.findOneAndUpdate({_id},category,{new:true});
        UpdatedCategories.push(UpdatedCategory);
        return res.status(201).json({
            UpdateCategories:UpdatedCategories
        })
    }
}


exports.deleteCategories=async(req,res)=>{
const {ids} = req.body.payload;
const DeletedCategories = [];
for(let i=0;i<ids.length;i++){
    const deleteCategory = await categoryModel.findOneAndDelete({_id:ids[i]._id});
  
    DeletedCategories.push(deleteCategory);
  
    if(DeletedCategories.length === ids.length){
        res.status(201).json({
            message:"Category Deleted Successfully"
        })
    }
    else{
        res.status(400).json({
            error:"Something Went Wrong"
        })
    }

}
}