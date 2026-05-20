import mongoose, { Schema, Types } from "mongoose";

export interface IExercise {
  _id?: Types.ObjectId;
  name: string;
  type: string;
  sets: number;
}

export interface IDayPlan {
  day: string;
  exercises: IExercise[];
}

export interface IWorkoutSchedule {
  userId: Types.ObjectId;
  workoutSchedule: IDayPlan[];
}

const exerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  sets: { type: Number, required: true },
});

const dayPlanSchema = new Schema<IDayPlan>({
  day: { type: String, required: true },
  exercises: [exerciseSchema],
});

const workoutScheduleSchema = new Schema<IWorkoutSchedule>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  workoutSchedule: [dayPlanSchema],
});

export const workoutScheduleModel = mongoose.model<IWorkoutSchedule>(
  "WorkoutSchedule",
  workoutScheduleSchema
);