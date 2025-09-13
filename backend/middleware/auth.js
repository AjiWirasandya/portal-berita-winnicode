const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "Token missing" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "rahasia");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" });
  }
};

module.exports = verifyToken;
