import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { UserModel } from "../models/authModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // If token is for admin (no DB lookup)
    if (decoded.role === "admin") {
      req.user = decoded; // attach admin payload
      return next();
    }

    // Otherwise, check DB user
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token - user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
