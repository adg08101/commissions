const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null);
    if (!token) return res.status(401).json({ message: "No token" });

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(payload.id).select("-passwordHash");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const permit = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: "Access denied" });
    next();
  };
};

module.exports = { authMiddleware, permit };
