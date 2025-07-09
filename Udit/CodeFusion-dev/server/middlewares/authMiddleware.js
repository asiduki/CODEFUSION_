// server/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("🔍 Incoming request cookies:", req.cookies); // <-- Debug log

  const token = req.cookies.token;

  if (!token) {
    console.log("❌ No token found in cookies");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
    req.user = decoded;
    console.log("✅ Token verified, user:", decoded.username);
    next();
  } catch (err) {
    console.log("❌ Invalid token:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
