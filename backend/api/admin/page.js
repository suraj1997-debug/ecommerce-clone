const express = require('express');
const router = express.Router();
const mongoose  = require ('mongoose');
const { checkAuth, adminMiddleware } = require('../middleware/auth');
const multer = require('multer');
const shortid =require('shortid');
const { createPage, getPage } = require('../controller/page');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname)
    }
  })

  var upload = multer({ storage })

  router.post('/page/create',checkAuth,adminMiddleware,upload.fields([
      { name:'banners' },
      { name:'products' }
  ]),createPage);


  router.get('/page/:category/:type',getPage);

  module.exports = router;