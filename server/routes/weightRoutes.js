 import express from "express";
import { createMine, deleteMine, listMine, updateMine } from "../controllers/crudController.js";
import { protect } from "../middleware/authMiddleware.js";
import WeightEntry from "../models/WeightEntry.js";

const router = express.Router();

router.use(protect);
router.route("/").get(listMine(WeightEntry)).post(createMine(WeightEntry));
router.route("/:id").put(updateMine(WeightEntry)).delete(deleteMine(WeightEntry));

export default router;