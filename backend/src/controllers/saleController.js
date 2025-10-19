const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Commission = require("../models/Commission");
const { genSaleNumber } = require("../utils/genNumber");
const { calcLineCommission } = require("../utils/commissionCalc");

const createSale = async (req, res) => {
  const { sellerId, items = [], customerName } = req.body;
  if (!sellerId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "SellerId and items required" });
  }

  // Validate and build sale items by fetching product data
  let subtotal = 0;
  const saleItems = [];
  const commissionItemsDetail = [];
  let totalCommission = 0;

  // For each item, fetch product and copy commission rules and unit price
  for (const it of items) {
    if (!it.product || !it.quantity) continue;
    const prod = await Product.findById(it.product);
    if (!prod)
      return res
        .status(400)
        .json({ message: `Product not found: ${it.product}` });

    const unitPrice = it.unitPrice != null ? Number(it.unitPrice) : prod.price;
    const itemObj = {
      product: prod._id,
      name: prod.name,
      quantity: Number(it.quantity),
      unitPrice,
      commissionType: prod.commissionType,
      commissionValue: prod.commissionValue,
    };

    const { base, commissionAmount } = calcLineCommission(itemObj);
    subtotal += base;
    totalCommission += commissionAmount;

    saleItems.push(itemObj);
    commissionItemsDetail.push({
      product: prod._id,
      qty: itemObj.quantity,
      base,
      commissionAmount,
    });
  }

  subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;
  totalCommission = Math.round((totalCommission + Number.EPSILON) * 100) / 100;
  const total = subtotal;

  // Generate sale number
  const number = genSaleNumber();

  const sale = await Sale.create({
    number,
    seller: sellerId,
    customerName,
    items: saleItems,
    subtotal,
    total,
    createdBy: req.user ? req.user._id : null,
  });

  // Create commission record
  await Commission.create({
    sale: sale._id,
    seller: sellerId,
    amount: totalCommission,
    itemsDetail: commissionItemsDetail,
  });

  res.status(201).json({ sale, commissionAmount: totalCommission });
};

const listSales = async (req, res) => {
  // optional filters: seller, date range, status
  const { seller, status, start, end, page = 1, limit = 50 } = req.query;
  const filter = {};
  if (seller) filter.seller = seller;
  if (status) filter.status = status;
  if (start || end) filter.createdAt = {};
  if (start) filter.createdAt.$gte = new Date(start);
  if (end) filter.createdAt.$lte = new Date(end);

  const sales = await Sale.find(filter)
    .populate("seller", "name email")
    .populate("items.product", "name sku")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(sales);
};

const getSale = async (req, res) => {
  const sale = await Sale.findById(req.params.id)
    .populate("seller", "name email")
    .populate("items.product", "name sku");
  if (!sale) return res.status(404).json({ message: "Not found" });
  res.json(sale);
};

module.exports = { createSale, listSales, getSale };
