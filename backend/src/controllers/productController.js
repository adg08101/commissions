const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const { name, sku, price, commissionType, commissionValue } = req.body;
  if (!name || price == null)
    return res.status(400).json({ message: "Name or price missing" });

  const product = await Product.create({
    name,
    sku,
    price,
    commissionType,
    commissionValue,
  });
  res.status(201).json(product);
};

const listProducts = async (req, res) => {
  const products = await Product.find().sort({ name: 1 });
  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
