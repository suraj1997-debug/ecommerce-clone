const mongoose = require("mongoose");
const express = require("express");
const { checkAuth } = require("./middleware/auth");
const { addOrder, getOrders, getOrder } = require("./controller/order");
const router = express.Router();

router.post("/addOrder",checkAuth,addOrder);

router.get("/getOrders",checkAuth,getOrders);

router.post("/getOrder",checkAuth,getOrder);

module.exports = router;
