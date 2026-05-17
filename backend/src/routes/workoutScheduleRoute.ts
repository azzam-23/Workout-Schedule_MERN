import express from "express";
import validateJWT from "../middlewares/validateJWT.ts";
import type { ExtendRequset } from "../types/extendedRequest.ts";

import {
  getActiveScheduleForUser,
  addExercise,
  updateExercise,
  deleteExercise,
  deleteDay,
} from "../services/workoutScheduleService.ts";

const router = express.Router();

/* ---------------- GET ---------------- */
router.get(
  "/",
  validateJWT,
  async (req: ExtendRequset, res) => {
    try {
      const userId = req.user!.userId;

      const schedule =
        await getActiveScheduleForUser({
          userId,
        });

      res.status(200).json({
        workoutSchedule:
          schedule.workoutSchedule,
      });

    } catch (err) {
      console.error(err);

      res
        .status(500)
        .send("Something went wrong");
    }
  }
);

/* ---------------- ADD EXERCISE ---------------- */
router.post(
  "/add",
  validateJWT,
  async (req: ExtendRequset, res) => {
    try {
      const userId = req.user!.userId;

      const {
        name,
        type,
        sets,
        day,
      } = req.body;

      const result =
        await addExercise({
          userId,
          name,
          type,
          sets,
          day,
        });

      res.status(200).json(result);

    } catch (err) {
      console.error(err);

      res
        .status(500)
        .send("Something went wrong");
    }
  }
);

/* ---------------- UPDATE EXERCISE ---------------- */
router.put(
  "/update",
  validateJWT,
  async (req: ExtendRequset, res) => {
    try {
      const userId = req.user!.userId;

      const {
        exerciseId,
        name,
        type,
        sets,
      } = req.body;

      const result =
        await updateExercise({
          userId,
          exerciseId,
          name,
          type,
          sets,
        });

      res.status(200).json(result);

    } catch (err) {
      console.error(err);

      res
        .status(500)
        .send("Something went wrong");
    }
  }
);

/* ---------------- DELETE EXERCISE ---------------- */
router.delete(
  "/:exerciseId",
  validateJWT,
  async (
    req: ExtendRequset & {
      params: {
        exerciseId: string;
      };
    },
    res
  ) => {
    try {
      const userId = req.user!.userId;

      const { exerciseId } =
        req.params;

      const result =
        await deleteExercise({
          userId,
          exerciseId,
        });

      res.status(200).json(result);

    } catch (err) {
      console.error(err);

      res
        .status(500)
        .send("Something went wrong");
    }
  }
);

/* ---------------- DELETE DAY ---------------- */
router.delete(
  "/day/:day",
  validateJWT,
  async (
    req: ExtendRequset & {
      params: {
        day: string;
      };
    },
    res
  ) => {
    try {
      const userId = req.user!.userId;

      const { day } =
        req.params;

      const result =
        await deleteDay({
          userId,
          day,
        });

      res.status(200).json(result);

    } catch (err) {
      console.error(err);

      res
        .status(500)
        .send("Error deleting day");
    }
  }
);

export default router;