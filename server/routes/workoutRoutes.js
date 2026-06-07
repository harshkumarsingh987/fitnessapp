 import express from "express";
import { createMine, deleteMine, listMine, updateMine } from "../controllers/crudController.js";
import { protect } from "../middleware/authMiddleware.js";
import Workout from "../models/Workout.js";

const router = express.Router();

router.use(protect);
router.route("/").get(listMine(Workout)).post(createMine(Workout));
router.route("/:id").put(updateMine(Workout)).delete(deleteMine(Workout));

export default router;