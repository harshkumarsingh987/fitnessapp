 import BmiEntry from "../models/BmiEntry.js";
import CalorieEntry from "../models/CalorieEntry.js";
import WaterEntry from "../models/WaterEntry.js";
import WeightEntry from "../models/WeightEntry.js";
import Workout from "../models/Workout.js";

const startOfDay = (date = new Date()) => {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
};

const getTotalsByDay = async (Model, userId, field, days = 14) => {
  const from = startOfDay();
  from.setDate(from.getDate() - days + 1);

  return Model.aggregate([
    { $match: { user: userId, date: { $gte: from } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: { $sum: `$${field}` }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

export const getSummary = async (req, res, next) => {
  try {
    const today = startOfDay();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [workouts, calories, water, latestWeight, latestBmi] = await Promise.all([
      Workout.find({ user: req.user._id, date: { $gte: today, $lt: tomorrow } }),
      CalorieEntry.find({ user: req.user._id, date: { $gte: today, $lt: tomorrow } }),
      WaterEntry.find({ user: req.user._id, date: { $gte: today, $lt: tomorrow } }),
      WeightEntry.findOne({ user: req.user._id }).sort({ date: -1 }),
      BmiEntry.findOne({ user: req.user._id }).sort({ date: -1 })
    ]);

    res.json({
      workoutMinutes: workouts.reduce((sum, item) => sum + item.durationMinutes, 0),
      workoutCalories: workouts.reduce((sum, item) => sum + item.caloriesBurned, 0),
      caloriesConsumed: calories.reduce((sum, item) => sum + item.calories, 0),
      waterMl: water.reduce((sum, item) => sum + item.amountMl, 0),
      latestWeight,
      latestBmi,
      goals: {
        calories: req.user.dailyCalorieGoal,
        waterMl: req.user.dailyWaterGoalMl,
        targetWeightKg: req.user.targetWeightKg
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProgress = async (req, res, next) => {
  try {
    const [calories, water, workoutCalories, weights, bmi] = await Promise.all([
      getTotalsByDay(CalorieEntry, req.user._id, "calories"),
      getTotalsByDay(WaterEntry, req.user._id, "amountMl"),
      getTotalsByDay(Workout, req.user._id, "caloriesBurned"),
      WeightEntry.find({ user: req.user._id }).sort({ date: 1 }).limit(30),
      BmiEntry.find({ user: req.user._id }).sort({ date: 1 }).limit(30)
    ]);

    res.json({ calories, water, workoutCalories, weights, bmi });
  } catch (error) {
    next(error);
  }
};
