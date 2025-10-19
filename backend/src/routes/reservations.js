const express = require("express");
const router = express.Router();
const { authMiddleware, permit } = require("../middleware/auth");
const {
  createReservation,
  listReservations,
} = require("../controllers/reservationController");

router.post(
  "/",
  authMiddleware,
  permit("admin", "seller", "client"),
  createReservation
);
router.get("/", authMiddleware, listReservations);

module.exports = router;
