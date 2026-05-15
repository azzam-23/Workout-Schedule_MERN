import { workoutScheduleModel } from "../models/workoutScheduleModel.js";
import { Types } from "mongoose";

/* ---------------- CREATE ---------------- */
const createScheduleForUser = async (userId: string) => {
  const existing = await workoutScheduleModel.findOne({ userId });

  if (existing) return existing;

  const newSchedule = new workoutScheduleModel({
    userId,
    workoutSchedule: [],
  });

  await newSchedule.save();
  return newSchedule;
};

/* ---------------- GET ---------------- */
export const getActiveScheduleForUser = async (userId: string) => {
  let schedule = await workoutScheduleModel.findOne({ userId });

  if (!schedule) {
    schedule = await createScheduleForUser(userId);
  }

  return schedule;
};

/* ---------------- ADD EXERCISE ---------------- */
export const addExercise = async ({
  userId,
  name,
  type,
  sets,
  day,
}: {
  userId: string;
  name: string;
  type: string;
  sets: number;
  day: string;
}) => {
  const schedule = await getActiveScheduleForUser(userId);

  let dayPlan = schedule.workoutSchedule.find((d) => d.day === day);

  if (!dayPlan) {
    dayPlan = { day, exercises: [] };
    schedule.workoutSchedule.push(dayPlan);
  }

  dayPlan.exercises.push({ name, type, sets });

  await schedule.save();
  return schedule;
};

/* ---------------- UPDATE ---------------- */
export const updateExercise = async ({
  userId,
  exerciseId,
  name,
  type,
  sets,
}: {
  userId: string;
  exerciseId: string;
  name?: string;
  type?: string;
  sets?: number;
}) => {
  const schedule = await getActiveScheduleForUser(userId);

  for (const day of schedule.workoutSchedule) {
    const exercise = day.exercises.find(
      (e) => e._id?.toString() === exerciseId
    );

    if (exercise) {
      if (name) exercise.name = name;
      if (type) exercise.type = type;
      if (sets !== undefined) exercise.sets = sets;
    }
  }

  await schedule.save();
  return schedule;
};

/* ---------------- DELETE ---------------- */
export const deleteExercise = async ({
  userId,
  exerciseId,
}: {
  userId: string;
  exerciseId: string;
}) => {
  const schedule = await getActiveScheduleForUser(userId);

  schedule.workoutSchedule.forEach((day) => {
    day.exercises = day.exercises.filter(
      (e) => e._id?.toString() !== exerciseId
    );
  });

  await schedule.save();
  return schedule;
};