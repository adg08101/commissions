const express = require("express");
const router = express.Router();
const { authMiddleware, permit } = require("../middleware/auth");
const {
  listCommissions,
  markPaid,
} = require("../controllers/commissionController");

router.get("/", authMiddleware, permit("admin", "seller"), listCommissions);
router.post("/:id/mark-paid", authMiddleware, permit("admin"), markPaid);

module.exports = router;
