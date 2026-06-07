 import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["Strength", "Cardio", "HIIT", "Yoga", "Mobility", "Sport", "Other"],
      default: "Strength"
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    intensity: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    notes: { type: String, default: "" },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
