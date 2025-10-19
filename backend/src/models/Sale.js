const mongoose = require("mongoose");

const SaleItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  quantity: { type: Number, default: 1 },
  unitPrice: Number,
  commissionType: String,
  commissionValue: Number,
});

const SaleSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerName: String,
  items: [SaleItemSchema],
  subtotal: Number,
  total: Number,
  status: {
    type: String,
    enum: ["draft", "confirmed", "cancelled"],
    default: "confirmed",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", SaleSchema);
