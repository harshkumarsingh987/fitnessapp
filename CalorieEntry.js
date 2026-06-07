 import mongoose from "mongoose";

const calorieEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    meal: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Drink", "Other"],
      default: "Other"
    },
    calories: { type: Number, required: true, min: 0 },
    proteinGrams: { type: Number, default: 0, min: 0 },
    carbsGrams: { type: Number, default: 0, min: 0 },
    fatGrams: { type: Number, default: 0, min: 0 },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("CalorieEntry", calorieEntrySchema);
