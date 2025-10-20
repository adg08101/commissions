const Branch = require("../models/Branch");

// Create a new branch (admin only)
exports.createBranch = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existing = await Branch.findOne({ name });
    if (existing)
      return res.status(400).json({ message: "Branch already exists" });

    const branch = new Branch({ name, address, phone });
    await branch.save();
    res.status(201).json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all branches (any logged-in user)
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single branch by ID
exports.getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ message: "Branch not found" });
    res.json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update branch (admin only)
exports.updateBranch = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ message: "Branch not found" });

    if (name) branch.name = name;
    if (address) branch.address = address;
    if (phone) branch.phone = phone;

    await branch.save();
    res.json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete branch (admin only)
exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ message: "Branch not found" });

    // Use deleteOne on the document
    await Branch.deleteOne({ _id: branch._id });

    res.json({ message: "Branch deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
