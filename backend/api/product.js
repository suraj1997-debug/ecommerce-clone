const express = require('express');
const router = express.Router();
const mongoose  = require ('mongoose');
const { addProduct, getProductsBySlug, getProductDetailsById } = require('./controller/product');
const multer = require('multer');
const shortid =require('shortid');
const { checkAuth, adminMiddleware } = require('./middleware/auth');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname)
    }
  })

  var upload = multer({ storage })


router.post('/product/create',checkAuth,adminMiddleware,upload.array('productPictures'),addProduct);

router.get('/getProductBySlug/:slug',getProductsBySlug);

router.get('/product/:productId',getProductDetailsById);

module.exports = router;