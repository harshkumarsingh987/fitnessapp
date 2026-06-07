import React from "react";
 import TrackerPage from "./TrackerPage";

const Water = () => (
  <TrackerPage
    title="Water Intake Tracking"
    subtitle="Log hydration and compare daily intake against your goal."
    path="/water"
    fields={[
      { name: "amountMl", label: "Amount ml", type: "number", defaultValue: 300 },
      { name: "note", label: "Note", defaultValue: "", required: false, full: true }
    ]}
    columns={[
      { key: "amountMl", label: "Amount ml" },
      { key: "note", label: "Note" }
    ]}
  />
);

export default Water;
