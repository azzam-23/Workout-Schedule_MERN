import express from "express";
import { seedInitialWorkoutSchedules, getActiveScheduleForUser} from "../services/workoutScheduleService.js";
import type { Document, DefaultSchemaOptions, Types } from "mongoose";
import type { IworkoutSchedule } from "../models/workoutScheduleModel.ts";
import validateJWT from "../middlewares/validateJWT.ts";
import type { ExtendRequset } from "../types/extendedRequest.ts";

const router = express.Router();

router.post("/seed", async (req, res) => {
  try {
    const result = await seedInitialWorkoutSchedules();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

router.get("/", validateJWT, async (req:ExtendRequset, res) => {
  try {
 const userId = req.user!.userId; 
    const schedule = await getActiveScheduleForUser({ userId });
    res.status(200).json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});
export default router;




