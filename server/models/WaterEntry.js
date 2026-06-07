 import mongoose from "mongoose";

const waterEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amountMl: { type: Number, required: true, min: 1 },
    note: { type: String, default: "" },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("WaterEntry", waterEntrySchema);
