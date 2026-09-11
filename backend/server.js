require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const orderRoutes = require("./routes/orderRoutes");

const {
  protect,
  adminOnly
} = require("./middleware/authMiddleware");


dotenv.config();

const app = express();

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/orders", orderRoutes);


app.get(
  "/api/admin/test",
  protect,
  adminOnly,
  (req, res) => {
    res.json({
      message: "Welcome Admin! Protected route working.",
      user: req.user
    });
  }
);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "TastyBites API is running"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TastyBites server running on port ${PORT}`);
});