import { workoutScheduleModel } from "../models/workoutScheduleModel";



interface CreateScheduleForUser {
  userId: string;
}

const createScheduleForUser = async ({
  userId,
}: CreateScheduleForUser) => {
  const existing = await workoutScheduleModel.findOne({ userId });

  if (existing) return existing;

  const newSchedule = new workoutScheduleModel({
    userId,
    workoutSchedule: [],
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

  let dayPlan = schedule.workoutSchedule.find(
    (d) => d.day === day
  );

  if (!dayPlan) {
    dayPlan = { day, exercises: [] };
    schedule.workoutSchedule.push(dayPlan);
  }

  dayPlan.exercises.push({ name, type, sets });

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



interface DeleteExercise {
  userId: string;
  exerciseId: string;
}

export const deleteExercise = async ({
  userId,
  exerciseId,
}: DeleteExercise) => {
  const schedule = await getActiveScheduleForUser({ userId });

  schedule.workoutSchedule.forEach((day) => {
    day.exercises = day.exercises.filter(
      (e) => e._id?.toString() !== exerciseId
    );
  });

  await schedule.save();
  return schedule;
};



interface DeleteDay {
  userId: string;
  day: string;
}

export const deleteDay = async ({
  userId,
  day,
}: DeleteDay) => {
  const schedule = await getActiveScheduleForUser({ userId });

  schedule.workoutSchedule = schedule.workoutSchedule.filter(
    (dayPlan) => dayPlan.day !== day
  );

  await schedule.save();
  return schedule;
};