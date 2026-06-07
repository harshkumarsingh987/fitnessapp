 import express from "express";
import { createMine, deleteMine, listMine, updateMine } from "../controllers/crudController.js";
import { protect } from "../middleware/authMiddleware.js";
import WaterEntry from "../models/WaterEntry.js";

const router = express.Router();

router.use(protect);
router.route("/").get(listMine(WaterEntry)).post(createMine(WaterEntry));
router.route("/:id").put(updateMine(WaterEntry)).delete(deleteMine(WaterEntry));

export default router;