const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkRole = require("../middleware/checkRole");
const { authMiddleware } = require("../middleware/auth");

router.use(authMiddleware); // Must be logged in
router.use(checkRole("admin")); // Must be admin

// Create
router.post("/", userController.createUser);

// Read
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

// Update
router.put("/:id", userController.updateUser);

// Delete
router.delete("/:id", userController.deleteUser);

module.exports = router;
