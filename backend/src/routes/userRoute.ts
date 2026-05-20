import express from "express";
import { login, register } from "../services/userService";
import userModel from "../models/userModel";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const { statusCode, data } = await register({
      name ,
      email,
      password,
    });

    return res.status(statusCode).json(data);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { statusCode, data } = await login({
      email,
      password,
    });

    return res.status(statusCode).json(data);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;