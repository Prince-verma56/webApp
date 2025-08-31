import express from "express";
import { submitUserForm, getUserForm } from "../controllers/userInfoController.js";
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/submit", verifyToken, submitUserForm);


router.get("/me", verifyToken, getUserForm);

export default router;
