 import mongoose from "mongoose";

const bmiEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    heightCm: { type: Number, required: true, min: 30 },
    weightKg: { type: Number, required: true, min: 1 },
    bmi: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("BmiEntry", bmiEntrySchema);