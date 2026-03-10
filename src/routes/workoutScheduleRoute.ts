import express from "express";
import {
  getActiveScheduleForUser,
  addExercise,
  updateExercise,
  deleteExercise,
} from "../services/workoutScheduleService.js";

import validateJWT from "../middlewares/validateJWT.ts";
import type { ExtendRequset } from "../types/extendedRequest.ts";

const router = express.Router();


router.post("/add", validateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!.userId;
    const { name, type, sets, day } = req.body;

    const response = await addExercise({
      userId,
      name,
      type,
      sets,
      day,
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});


router.get("/", validateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!.userId;

    const schedule = await getActiveScheduleForUser({ userId });

    res.status(200).json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});


router.put("/update", validateJWT, async (req: ExtendRequset, res) => {
  try {
    const userId = req.user!.userId;

    const { name, type, sets, exerciseId } = req.body;

    const response = await updateExercise({
      userId,
      exerciseId,
      name,
      type,
      sets,
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});


router.delete(
  "/:exerciseId",
  validateJWT,
  async (req: ExtendRequset & { params: { exerciseId: string } }, res) => {
    try {
      const userId = req.user!.userId;
      const { exerciseId } = req.params;

      const response = await deleteExercise({
        userId,
        exerciseId,
      });

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  }
);

export default router;


