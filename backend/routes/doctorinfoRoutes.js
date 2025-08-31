import express from "express";
import { addOrUpdateDoctorInfo, listDoctors } from "../controllers/doctorController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken,addOrUpdateDoctorInfo);

router.get("/getDoctor",verifyToken ,listDoctors);


export default router;
