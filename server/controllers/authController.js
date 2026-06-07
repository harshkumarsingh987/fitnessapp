 import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  heightCm: user.heightCm,
  targetWeightKg: user.targetWeightKg,
  dailyCalorieGoal: user.dailyCalorieGoal,
  dailyWaterGoalMl: user.dailyWaterGoalMl
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password, heightCm, targetWeightKg } = req.body;
    const existing = await User.findOne({ email });

    if (existing) {
      res.status(409);
      throw new Error("Email is already registered");
    }

    const user = await User.create({ name, email, password, heightCm, targetWeightKg });
    generateToken(res, user._id);
    res.status(201).json(publicUser(user));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    generateToken(res, user._id);
    res.json(publicUser(user));
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res) => {
  res.json(publicUser(req.user));
};

export const updateProfile = async (req, res, next) => {
  try {
    const allowed = ["name", "heightCm", "targetWeightKg", "dailyCalorieGoal", "dailyWaterGoalMl"];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) req.user[key] = req.body[key];
    });
    const updated = await req.user.save();
    res.json(publicUser(updated));
  } catch (error) {
    next(error);
  }
};

export const logout = (_req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: "Logged out" });
};