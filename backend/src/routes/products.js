const express = require("express");
const router = express.Router();
const { authMiddleware, permit } = require("../middleware/auth");
const {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", authMiddleware, listProducts);
router.post("/", authMiddleware, permit("admin"), createProduct);
router.get("/:id", authMiddleware, getProduct);
router.put("/:id", authMiddleware, permit("admin"), updateProduct);
router.delete("/:id", authMiddleware, permit("admin"), deleteProduct);

module.exports = router;
