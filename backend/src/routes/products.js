const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authMiddleware } = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// Public routes (authenticated users)
router.get("/", authMiddleware, productController.getProducts);
router.get("/:id", authMiddleware, productController.getProductById);

// Admin-only routes
router.post(
  "/",
  authMiddleware,
  checkRole("admin"),
  productController.createProduct
);
router.put(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  productController.updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  productController.deleteProduct
);

module.exports = router;
