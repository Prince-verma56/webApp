import express from "express";
import { bookSlot, getUserBookings } from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/book", verifyToken, bookSlot);
router.get("/my-bookings", verifyToken, getUserBookings);

export default router;
