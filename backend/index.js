import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import passport from "./config/passport.js";
import { connectDB } from "./connections/connectDB.js";

import userRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import doctorinfoRoutes from "./routes/doctorinfoRoutes.js";
import emotionRoutes from "./routes/emotionRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import userInfoRoutes from "./routes/userInfoRoutes.js";


const app = express();
const port = process.env.PORT || 7000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/auth", userRoutes);
app.use("/api", slotRoutes);
app.use("/api", emotionRoutes);
app.use("/api",userInfoRoutes);
app.use("/api",bookingRoutes);
app.use("/api",doctorinfoRoutes);


app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
