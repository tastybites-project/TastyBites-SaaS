const express = require("express");

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
} = require("../controllers/orderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");


// Customer Create Order
router.post(
  "/",
  protect,
  createOrder
);

// Customer
router.get(
  "/my-orders",
  protect,
  getMyOrders
);


// Admin Get All Orders
router.get(
  "/",
  protect,
  adminOnly,
  getAllOrders
);


// Get Single Order
router.get(
  "/:id",
  protect,
  getOrderById
);


// Admin Update Status
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);


module.exports = router;