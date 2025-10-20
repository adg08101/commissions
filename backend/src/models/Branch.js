const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Store / Branch Name
  address: { type: String }, // Optional
  phone: { type: String }, // Optional
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Branch", BranchSchema);
