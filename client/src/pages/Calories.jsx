import React from "react";
 import TrackerPage from "./TrackerPage";

const Calories = () => (
  <TrackerPage
    title="Calories Tracking"
    subtitle="Track meals and macronutrients throughout the day."
    path="/calories"
    fields={[
      { name: "meal", label: "Meal", defaultValue: "Chicken bowl" },
      { name: "category", label: "Category", defaultValue: "Lunch", options: ["Breakfast", "Lunch", "Dinner", "Snack", "Drink", "Other"] },
      { name: "calories", label: "Calories", type: "number", defaultValue: 520 },
      { name: "proteinGrams", label: "Protein g", type: "number", defaultValue: 35 },
      { name: "carbsGrams", label: "Carbs g", type: "number", defaultValue: 50 },
      { name: "fatGrams", label: "Fat g", type: "number", defaultValue: 18 }
    ]}
    columns={[
      { key: "meal", label: "Meal" },
      { key: "category", label: "Category" },
      { key: "calories", label: "Calories" },
      { key: "proteinGrams", label: "Protein" },
      { key: "carbsGrams", label: "Carbs" },
      { key: "fatGrams", label: "Fat" }
    ]}
  />
);

export default Calories;
