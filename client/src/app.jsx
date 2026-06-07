import React from "react";
 import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import Bmi from "./pages/Bmi";
import Calories from "./pages/Calories";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Water from "./pages/Water";
import Weight from "./pages/Weight";
import Workouts from "./pages/Workouts";

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="calories" element={<Calories />} />
        <Route path="weight" element={<Weight />} />
        <Route path="bmi" element={<Bmi />} />
        <Route path="water" element={<Water />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Route>
  </Routes>
);

export default App;
