const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getAllUsers
} = require("../controllers/authController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");


// ========================================
// REGISTER
// ========================================

router.post(
  "/register",
  register
);


// ========================================
// LOGIN
// ========================================

router.post(
  "/login",
  login
);


// ========================================
// GET ALL USERS - ADMIN ONLY
// ========================================

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);


module.exports = router;