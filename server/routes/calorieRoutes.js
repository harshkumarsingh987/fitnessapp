 import express from "express";
import { createMine, deleteMine, listMine, updateMine } from "../controllers/crudController.js";
import { protect } from "../middleware/authMiddleware.js";
import CalorieEntry from "../models/CalorieEntry.js";

const router = express.Router();

router.use(protect);
router.route("/").get(listMine(CalorieEntry)).post(createMine(CalorieEntry));
router.route("/:id").put(updateMine(CalorieEntry)).delete(deleteMine(CalorieEntry));

export default router;