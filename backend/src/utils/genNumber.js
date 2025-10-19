const { v4: uuidv4 } = require("uuid");

const genSaleNumber = () => {
  // Simple sale number: date + short uuid
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `S-${date}-${uuidv4().slice(0, 6)}`;
};

const genReference = (prefix = "R") => {
  return `${prefix}-${Date.now().toString().slice(-6)}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
};

module.exports = { genSaleNumber, genReference };
