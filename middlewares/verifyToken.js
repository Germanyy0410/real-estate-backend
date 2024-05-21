import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Not Authenticated!", status: false });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log("Token is not valid");
      return res.status(403).json({ message: "Token is not Valid!" });
    }
    req.userId = payload.id;
    next();
  });
};
