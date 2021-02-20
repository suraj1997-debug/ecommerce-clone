
const {check,validationResult} = require('express-validator');

exports.validateSignupRequest = [
    check('firstname').notEmpty().withMessage("first name is required"),
    check('lastname').notEmpty().withMessage("last name is not required"),
    check('email').isEmail().withMessage("Valid Email is required"),
    check('password').isLength({min:4}).withMessage("Password must be atleast 6 characters long")
]

exports.validateSigninRequest = [
    check('email').isEmail().withMessage("Valid Email is required"),
    check('password').isLength({min:4}).withMessage("Password must be atleast 6 characters long")
]

exports.isValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
    return res.status(400).json({
        errors:errors.array()[0].msg
    }) 
}
next();
}