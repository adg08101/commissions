const Reservation = require("../models/Reservation");
const { genReference } = require("../utils/genNumber");

const createReservation = async (req, res) => {
  const {
    date,
    timeSlot,
    origin,
    destination,
    vehicleType,
    seats,
    cost,
    driver,
    relatedSale,
  } = req.body;
  if (!date || !origin || !destination)
    return res.status(400).json({ message: "Fields missing" });

  const reference = genReference("RES");
  const reservation = await Reservation.create({
    reference,
    date,
    timeSlot,
    origin,
    destination,
    vehicleType,
    seats,
    cost,
    driver,
    relatedSale,
    createdBy: req.user ? req.user._id : null,
  });

  res.status(201).json(reservation);
};

const listReservations = async (req, res) => {
  const { start, end, status, page = 1, limit = 50 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (start || end) filter.date = {};
  if (start) filter.date.$gte = new Date(start);
  if (end) filter.date.$lte = new Date(end);

  const reservations = await Reservation.find(filter)
    .populate("relatedSale", "number subtotal")
    .sort({ date: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(reservations);
};

module.exports = { createReservation, listReservations };
