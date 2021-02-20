const mongoose = require('mongoose');
const userModel = require('../../modules/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

env.config();

const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

exports.signup = (req, res) => {

    userModel.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) return res.status(400).json({
                message: 'User already registered'
            });

            const {
                firstname,
                lastname,
                email,
                password } = req.body;

            const hash_password = await bcrypt.hash(password, 10);
            const userDetails = new userModel({
                firstname,
                lastname,
                email,
                hash_password,
                username: shortid.generate()
            })

            userDetails.save((error, user) => {
                if (error) {
                  return res.status(400).json({
                    message: "Something went wrong",
                  });
                }
          
                if (user) {
                  const token = generateJwtToken(user._id, user.role);
                  const { _id, firstName, lastName, email, role, fullname } = user;
                  return res.status(201).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullname },
                  });
                }
              });
            });
          };

exports.signin = (req, res) => {
    userModel.findOne({ email: req.body.email })
        .exec(async(error, user) => {
            if (error) return res.status(400).json(error);
            if (user) {
                const isPassword = await user.authenticate(req.body.password);
                if (isPassword && user.role ==='user') {
                    const token = generateJwtToken(user._id, user.role);
                        
                    // res.cookie(token,'token',{expiresIn:'1d'});
                    const { _id, firstname, lastname, email, role, fullname } = user;

                    res.status(200).json({
                        token: token,
                        user: {
                            _id, firstname, lastname, email, role, fullname
                        }
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Invalid Password"
                    })
                }
            }
            else {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
        });
}

exports.profile = (req, res) => {
    res.status(200).json({
        message: "it works"
    })
}

// exports.signout=(req,res)=>{
//     res.clearCookie('token');
//     res.status(200).json({
//         message:"User Logged Out Successfully"
//     })
// }