import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bmiRoutes from "./routes/bmiRoutes.js";
import calorieRoutes from "./routes/calorieRoutes.js";
import waterRoutes from "./routes/waterRoutes.js";
import weightRoutes from "./routes/weightRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "fitness-tracker-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/calories", calorieRoutes);
app.use("/api/weights", weightRoutes);
app.use("/api/bmi", bmiRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
