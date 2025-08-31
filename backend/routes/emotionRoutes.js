import express from "express";
import multer from "multer";
import { analyzeEmotion } from "../controllers/emotionController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();
const upload = multer(); 

router.post("/analyze", verifyToken,verifyRole("user"),upload.single("image") ,analyzeEmotion);

export default router;
