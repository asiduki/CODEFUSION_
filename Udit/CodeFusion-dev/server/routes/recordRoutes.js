import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { fetchRecords, saveRecord } from "../controllers/recordController.js";

const router = express.Router();

router.get("/fetch", verifyToken, fetchRecords);
router.post("/save", verifyToken, saveRecord);

export default router;
