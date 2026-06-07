 import mongoose from "mongoose";

const weightEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    weightKg: { type: Number, required: true, min: 1 },
    bodyFatPercent: { type: Number, min: 0, max: 100 },
    note: { type: String, default: "" },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("WeightEntry", weightEntrySchema);
