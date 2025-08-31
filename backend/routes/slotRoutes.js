import express from "express";
import { addSlots, getSlotsByDoctor } from "../controllers/slotController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addSlots);
router.get("/:doctorId", getSlotsByDoctor);

export default router;
