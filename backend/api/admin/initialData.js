const mongoose = require('mongoose');
const express = require('express');
const { initialRenderData } = require('../controller/admin/initialData');
const { checkAuth, adminMiddleware } = require('../middleware/auth');
const router = express.Router();


router.post('/initialData',checkAuth,adminMiddleware,initialRenderData);


module.exports = router;