function calcLineCommission(line) {
  const qty = Number(line.quantity || 0);
  const unitPrice = Number(line.unitPrice || 0);
  const base = qty * unitPrice;

  let commissionAmount = 0;
  if (line.commissionType === "percent") {
    commissionAmount = base * (Number(line.commissionValue || 0) / 100);
  } else if (line.commissionType === "flat") {
    commissionAmount = Number(line.commissionValue || 0) * qty;
  } else {
    commissionAmount = 0;
  }

  // round to 2 decimals
  commissionAmount =
    Math.round((commissionAmount + Number.EPSILON) * 100) / 100;
  return { base, commissionAmount };
}

module.exports = { calcLineCommission };
