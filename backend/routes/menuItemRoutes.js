const express = require("express");

const {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItemController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// ========================================
// PUBLIC ROUTES
// ========================================

// Get all menu items
router.get(
  "/",
  getMenuItems
);


// Get single menu item
router.get(
  "/:id",
  getMenuItemById
);


// ========================================
// ADMIN ROUTES
// ========================================

// Create menu item + image
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createMenuItem
);


// Update menu item + optional image
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateMenuItem
);


// Delete menu item
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteMenuItem
);


// ========================================
// EXPORT
// ========================================

module.exports = router;