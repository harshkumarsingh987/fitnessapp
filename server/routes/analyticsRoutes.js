 import express from "express";
import { getProgress, getSummary } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/summary", getSummary);
router.get("/progress", getProgress);

export default router;