const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sku: String,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  commissionType: {
    type: String,
    enum: ["percent", "flat", "none"],
    default: "flat",
  },
  commissionValue: { type: Number, default: 0 }, // percent or flat amount
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
