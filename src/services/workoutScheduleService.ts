import { workoutScheduleModel } from "../models/workoutScheduleModel.js";

interface CreateScheduleForUser {
  userId: string;
}

const createScheduleForUser = async ({ userId }: CreateScheduleForUser) => {
  const existingSchedule = await workoutScheduleModel.findOne({ userId });

  if (existingSchedule) {
    return existingSchedule;
  }

  const newSchedule = new workoutScheduleModel({
    userId,
    exercises: [],
  });

  await newSchedule.save();

  return newSchedule;
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
    day,
  });

  await schedule.save();

  return schedule;
};

interface UpdateExercise {
  userId: string;
  exerciseId: string;
  name?: string;
  type?: string;
  sets?: number;
}

export const updateExercise = async ({
  userId,
  exerciseId,
  name,
  type,
  sets,
}: UpdateExercise) => {
  const schedule = await getActiveScheduleForUser({ userId });

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  const exercise = schedule.exercises.find(
    (e) => e._id!.toString() === exerciseId
  );

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  if (name) exercise.name = name;
  if (type) exercise.type = type;
  if (sets !== undefined) exercise.sets = sets;

  await schedule.save();

  return schedule;
};

interface DeleteExercise {
  userId: string;
  exerciseId: string;
}

export const deleteExercise = async ({
  userId,
  exerciseId,
}: DeleteExercise) => {
  const schedule = await workoutScheduleModel.findOne({ userId });

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  const exerciseExists = schedule.exercises.some(
    (e) => e._id!.toString() === exerciseId
  );

  if (!exerciseExists) {
    throw new Error("Exercise not found");
  }

  schedule.exercises = schedule.exercises.filter(
    (e) => e._id!.toString() !== exerciseId
  );

  await schedule.save();

  return schedule;
};