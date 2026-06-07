 import express from "express";
import { createBmiEntry, deleteBmiEntry, listBmiEntries } from "../controllers/bmiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(listBmiEntries).post(createBmiEntry);
router.route("/:id").delete(deleteBmiEntry);

export default router;