const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  reference: { type: String, unique: true },
  date: { type: Date, required: true },
  timeSlot: String,
  origin: String,
  destination: String,
  vehicleType: String,
  seats: Number,
  cost: Number,
  driver: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  relatedSale: { type: mongoose.Schema.Types.ObjectId, ref: "Sale" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
