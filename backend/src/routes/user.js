const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

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
