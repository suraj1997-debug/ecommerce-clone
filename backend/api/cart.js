const express = require('express');
const router = express.Router();
const mongoose  = require ('mongoose');
const {  getCartItems, addItemToCart, removeCartItems } = require('./controller/cart');
const { checkAuth } = require('./middleware/auth');


router.post('/user/cart/addtocart',checkAuth,addItemToCart);

router.post('/user/getCartItems',checkAuth,getCartItems);

router.post('/user/cart/removeItem',checkAuth,removeCartItems);

module.exports = router;