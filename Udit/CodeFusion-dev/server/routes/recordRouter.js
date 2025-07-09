// server/routes/recordRouter.js
import express from "express";
import { fetchRecord, saveRecord } from "../controllers/recordController.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // ✅

const router = express.Router();

router.post("/save", verifyToken, saveRecord);
router.get("/fetch", verifyToken, fetchRecord);

export default router;
