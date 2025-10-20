const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const checkRole = require("../middleware/checkRole");
const { authMiddleware } = require("../middleware/auth");

router.use(authMiddleware); // Must be logged in

// Public routes (any logged-in user)
router.get("/", authMiddleware, branchController.getBranches);
router.get("/:id", authMiddleware, branchController.getBranchById);

// Admin-only routes
router.post("/", checkRole("admin"), branchController.createBranch);
router.put("/:id", checkRole("admin"), branchController.updateBranch);
router.delete("/:id", checkRole("admin"), branchController.deleteBranch);

module.exports = router;
