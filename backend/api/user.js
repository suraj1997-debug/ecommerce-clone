const express = require('express');
const router = express.Router();
const mongoose  = require ('mongoose');
const { signup, signin, profile,signout } = require('./controller/user');
const { checkAuth } = require('./middleware/auth');
const { validateSignupRequest,validateSigninRequest, isValidated } = require('./validators/validate');


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Hello from Server"
    })
})

router.post('/signin',validateSigninRequest,isValidated,signin);

router.post('/signup',validateSignupRequest,isValidated,signup);

router.get('/profile',checkAuth,profile);

// router.post('/signout',checkAuth,signout);

module.exports = router;