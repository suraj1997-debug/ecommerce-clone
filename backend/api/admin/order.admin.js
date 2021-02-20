const express = require("express");
const { checkAuth, adminMiddleware } = require("../middleware/auth");
const {
  updateOrder,
  getCustomerOrders,
} = require("../controller/admin/order.admin");
const router = express.Router();

router.post(`/order/update`, checkAuth, adminMiddleware, updateOrder);
router.post( `/order/getCustomerOrders`,checkAuth, adminMiddleware,getCustomerOrders);

module.exports = router;