const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const { checkAuth} = require('./middleware/auth');
const { addAddress, getAddress } = require("./controller/address");

router.post('/user/address/create',checkAuth,addAddress);

router.post('/user/getAddress',checkAuth,getAddress);

module.exports = router;