require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const orderRoutes = require("./routes/orderRoutes");

const {
  protect,
  adminOnly,
} = require("./middleware/authMiddleware");

const app = express();

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/menu-items", menuItemRoutes);

app.use("/api/orders", orderRoutes);

// =========================
// ADMIN TEST ROUTE
// =========================

app.get(
  "/api/admin/test",
  protect,
  adminOnly,
  (req, res) => {
    res.json({
      message: "Welcome Admin! Protected route working.",
      user: req.user,
    });
  }
);

// =========================
// ROOT TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "TastyBites API is running",
  });
});

// =========================
// VERCEL
// =========================

module.exports = app;