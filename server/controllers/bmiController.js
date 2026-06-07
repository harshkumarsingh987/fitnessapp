 import BmiEntry from "../models/BmiEntry.js";

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

export const listBmiEntries = async (req, res, next) => {
  try {
    const entries = await BmiEntry.find({ user: req.user._id }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

export const createBmiEntry = async (req, res, next) => {
  try {
    const { heightCm, weightKg, date } = req.body;
    const meters = heightCm / 100;
    const bmi = Number((weightKg / (meters * meters)).toFixed(1));
    const entry = await BmiEntry.create({
      user: req.user._id,
      heightCm,
      weightKg,
      bmi,
      category: getBmiCategory(bmi),
      date
    });

    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
};

export const deleteBmiEntry = async (req, res, next) => {
  try {
    const entry = await BmiEntry.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!entry) {
      res.status(404);
      throw new Error("BMI entry not found");
    }
    res.json({ message: "BMI entry deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};