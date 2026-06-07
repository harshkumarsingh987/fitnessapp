import React from "react";
 import TrackerPage from "./TrackerPage";

const Weight = () => (
  <TrackerPage
    title="Weight Tracking"
    subtitle="Record body weight and optional body-fat notes to monitor progress."
    path="/weights"
    fields={[
      { name: "weightKg", label: "Weight kg", type: "number", defaultValue: 72 },
      { name: "bodyFatPercent", label: "Body fat %", type: "number", defaultValue: 18, required: false },
      { name: "note", label: "Note", defaultValue: "", required: false, full: true }
    ]}
    columns={[
      { key: "weightKg", label: "Weight kg" },
      { key: "bodyFatPercent", label: "Body fat %" },
      { key: "note", label: "Note" }
    ]}
  />
);

export default Weight;
