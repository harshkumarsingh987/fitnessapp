import React from "react";
 import TrackerPage from "./TrackerPage";

const Workouts = () => (
  <TrackerPage
    title="Workout Tracking"
    subtitle="Log training sessions by type, intensity, duration, and calories burned."
    path="/workouts"
    fields={[
      { name: "title", label: "Workout", defaultValue: "Full body session" },
      { name: "type", label: "Type", defaultValue: "Strength", options: ["Strength", "Cardio", "HIIT", "Yoga", "Mobility", "Sport", "Other"] },
      { name: "durationMinutes", label: "Duration minutes", type: "number", defaultValue: 45 },
      { name: "caloriesBurned", label: "Calories burned", type: "number", defaultValue: 250 },
      { name: "intensity", label: "Intensity", defaultValue: "Medium", options: ["Low", "Medium", "High"] },
      { name: "notes", label: "Notes", defaultValue: "", required: false, full: true }
    ]}
    columns={[
      { key: "title", label: "Workout" },
      { key: "type", label: "Type" },
      { key: "durationMinutes", label: "Minutes" },
      { key: "caloriesBurned", label: "Calories" },
      { key: "intensity", label: "Intensity" }
    ]}
  />
);

export default Workouts;
