module.exports = function checkRole(requiredRole) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
  };
};
