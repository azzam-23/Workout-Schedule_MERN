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
  dayPlanId?: string;
  name: string;
  type: string;
  sets: number;
  pr?: number;
  day: string;
}
interface AddExercise {
  userId: string;
  dayPlanId?: string;
  name: string;
  type: string;
  sets: number;
  pr?: number;
  day: string;
}

export const addExercise = async ({
  userId,
  dayPlanId,
  name,
  type,
  sets,
  pr,
  day,
}: AddExercise) => {
  const schedule = await getActiveScheduleForUser({ userId });

  if (dayPlanId) {
    
    const dayPlan = schedule.workoutSchedule.find(
      (d) => d._id?.toString() === dayPlanId
    );

    if (!dayPlan) {
      throw new Error("Workout session not found");
    }

    
    dayPlan.exercises.push({
      name,
      type,
      sets,
      pr,
    });
  } else {
    
    schedule.workoutSchedule.push({
      day,
      exercises: [{ name, type, sets, pr }],
    });
  }

  await schedule.save();

  return schedule;
};



interface UpdateExercise {
  userId: string;
  exerciseId: string;
  name?: string;
  type?: string;
  sets?: number;
  pr?: number;
}

export const updateExercise = async ({
  userId,
  exerciseId,
  name,
  type,
  sets,
  pr,
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
      if (pr !== undefined) exercise.pr = pr;
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
  dayPlanId: string;
}

export const deleteDay = async ({
  userId,
  dayPlanId,
}: DeleteDay) => {
  const schedule = await getActiveScheduleForUser({ userId });

  schedule.workoutSchedule = schedule.workoutSchedule.filter(
    (dayPlan) => dayPlan._id?.toString() !== dayPlanId
  );

  await schedule.save();

  return schedule;
};