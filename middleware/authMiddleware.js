const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secretKey, (err, user) => {
    console.error("Token verification error:", err);
    if (err) res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
