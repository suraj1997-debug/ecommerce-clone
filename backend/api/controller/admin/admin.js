const mongoose = require('mongoose');
const userModel = require('../../../modules/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const bcrypt= require("bcrypt");
const shortid = require('shortid');

env.config();

exports.signup=(req,res)=>{
    userModel.findOne({email:req.body.email})
    .exec(async(error,user)=>{
        if(user) return res.status(400).json({
            message: 'Admin already registered'
        });

    const {
        firstname,
        lastname,
        email,
        password}=req.body;

   const hash_password = await bcrypt.hash(password,10);
    const userDetails=new userModel({
        firstname,
        lastname,
        email,
        hash_password,
        username:shortid.generate(),
        role:'admin'
    })
 
   
    userDetails.save()
    .then(data=>{
        res.status(201).json({
            message:"Admin Created Successfully"
        })
    })
    .catch(err=>{
            res.status(400).json({
                message:"Something went wrong"
            })
    })

    })
}

exports.signin=(req,res)=>{
    userModel.findOne({email:req.body.email})
    .exec(async(error,user)=>{
        if(error) return res.status(400).json(error);
        if(user){
            const isPassword = await user.authenticate(req.body.password);

            if(isPassword && user.role ==='admin'){
                const token=jwt.sign(
                    {
                        _id:user._id,
                        role:user.role,
                        firstname:user.firstname
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:'1d'
                    });
                    res.cookie(token,'token',{expiresIn:'1d'});

                 const {_id,firstname,lastname,email,role,fullname} = user;

                res.status(200).json({
                    token:token,
                    user:{
                        _id,firstname,lastname,email,role,fullname
                    }
                });
            }
            else{
                return res.status(400).json({
                    message:"Invalid Password"
                })
            }
        }
    else{
        return res.status(400).json({
            message:"Something went wrong"
        })
    }
});
}

exports.signout=(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({
        message:"Admin Logged Out Successfully"
    })
}