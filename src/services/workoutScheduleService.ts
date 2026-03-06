import { workoutScheduleModel } from "../models/workoutScheduleModel.js";
import mongoose from "mongoose";

interface CreatescheduleForUser {
  userId: string;
}

const createScheduleForUser = async ({ userId }: CreatescheduleForUser) => {
  const schedule = await workoutScheduleModel.create({ userId });
  await schedule.save();
  return schedule;
};

interface GetActiveScheduleForUser {
  userId: string;
}

export const getActiveScheduleForUser = async ({
  userId,
}: GetActiveScheduleForUser) => {
  let schedule = await workoutScheduleModel.findOne({ userId });
  if (!schedule) {
    schedule = await createScheduleForUser({ userId });
  }

  return schedule;
};

interface AddExercise {
  userId: string;
  name: string;
  type: string;
  sets: number;
  day: string;
}

export const addExercise = async ({
  userId,
  name,
  type,
  sets,
  day,
}: AddExercise) => {

  const schedule = await getActiveScheduleForUser({ userId });

  schedule.exercises.push({
    name,
    type,
    sets,
    day
  });

  await schedule.save();

  return schedule;
};



export const seedInitialWorkoutSchedules = async () => {
  try {
    const exercise1 = new mongoose.Types.ObjectId();
    const exercise2 = new mongoose.Types.ObjectId();
    const exercise3 = new mongoose.Types.ObjectId();

    const schedules = [
      {
        userId: new mongoose.Types.ObjectId(),
        workoutSchedule: [
          {
            day: "Sunday",
            exercises: [
              { name: "Push Up", type: "strength", sets: 3 },
              { name: "Squat", type: "strength", sets: 4 },
            ],
          },
          {
            day: "Tuesday",
            exercises: [{ name: "Running", type: "cardio", sets: 1 }],
          },
        ],
      },
    ];

    const existing = await workoutScheduleModel.countDocuments();

    if (!existing) {
      await workoutScheduleModel.insertMany(schedules);
      console.log("Workout schedules seeded ✅");
    }

    return schedules;
  } catch (err) {
    console.error("Cannot seed workout schedules", err);
  }
};
