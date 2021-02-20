const express = require('express');
const router = express.Router();
const mongoose  = require ('mongoose');
const { addCat, getCategories, updateCategories, deleteCategories } = require('./controller/category');
const { checkAuth, adminMiddleware } = require('./middleware/auth');
const multer = require('multer');
const shortid =require('shortid');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname)
    }
  })

  var upload = multer({ storage })

router.post('/category/create',checkAuth,adminMiddleware,upload.single('categoryImage'),addCat);

router.get('/category/categories',getCategories);

router.post('/category/update',checkAuth,adminMiddleware,upload.array('categoryImage'),updateCategories);

router.post('/category/delete',checkAuth,adminMiddleware,deleteCategories);


module.exports = router;