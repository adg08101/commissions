const mongoose = require("mongoose");

const ItemDetailSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  qty: Number,
  base: Number,
  commissionAmount: Number,
});

const CommissionSchema = new mongoose.Schema({
  sale: { type: mongoose.Schema.Types.ObjectId, ref: "Sale", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  itemsDetail: [ItemDetailSchema],
  paid: { type: Boolean, default: false },
  paidAt: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Commission", CommissionSchema);
