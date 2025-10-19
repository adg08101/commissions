const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Data missing" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already taken" });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: role || "seller",
  });
  res
    .status(201)
    .json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Data missing" });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Wrong credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)
    return res.status(401).json({ message: "Wrong credentials" });

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  // send cookie httpOnly and return basic user
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

module.exports = { register, login, logout };
