const express = require('express');
const router = express.Router();
const mongoose  = require ('mongoose');
const { signup, signin, signout} = require('../controller/admin/admin');
const { checkAuth } = require('../middleware/auth');
const { validateSigninRequest, isValidated, validateSignupRequest } = require('../validators/validate');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Hello from Server"
    })
})

router.post('/admin/signin',validateSigninRequest,isValidated,signin);

router.post('/admin/signup',validateSignupRequest,isValidated,signup);

router.post('/admin/signout',checkAuth,signout);

module.exports = router;