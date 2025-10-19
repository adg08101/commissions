const express = require("express");
const router = express.Router();
const { authMiddleware, permit } = require("../middleware/auth");
const {
  createSale,
  listSales,
  getSale,
} = require("../controllers/saleController");

// create sale: any authenticated seller or admin
router.post("/", authMiddleware, permit("admin", "seller"), createSale);
router.get("/", authMiddleware, listSales);
router.get("/:id", authMiddleware, getSale);

module.exports = router;
