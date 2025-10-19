const Commission = require("../models/Commission");

const listCommissions = async (req, res) => {
  const { seller, start, end, paid } = req.query;
  const filter = {};
  if (seller) filter.seller = seller;
  if (paid != null) filter.paid = paid === "true";
  if (start || end) filter.createdAt = {};
  if (start) filter.createdAt.$gte = new Date(start);
  if (end) filter.createdAt.$lte = new Date(end);

  const commiss = await Commission.find(filter)
    .populate("seller", "name email")
    .populate("sale", "number createdAt");

  res.json(commiss);
};

const markPaid = async (req, res) => {
  const { id } = req.params;
  const commission = await Commission.findByIdAndUpdate(
    id,
    { paid: true, paidAt: new Date() },
    { new: true }
  );
  if (!commission) return res.status(404).json({ message: "Not found" });
  res.json(commission);
};

module.exports = { listCommissions, markPaid };
