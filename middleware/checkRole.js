const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ msg: "Forbidden. You are not authorized." });
    }
    next();
  };
};

module.exports = checkRole;
