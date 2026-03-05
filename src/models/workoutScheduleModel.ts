import mongoose, { Schema, Types } from "mongoose";

export interface Iexercise {
  name: string;
  type: string;
  sets: number;
}

const exerciseSchema = new Schema<Iexercise>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  sets: { type: Number, default: 3 },
});




export interface Iday {
  day: string;
  exercises: Iexercise[];
}

const daySchema = new Schema<Iday>({
  day: { type: String, required: true },
  exercises: [exerciseSchema],
});




export interface IworkoutSchedule {
  userId: Types.ObjectId;
  workoutSchedule: Iday[];
}

const workoutScheduleSchema = new Schema<IworkoutSchedule>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workoutSchedule: [daySchema],
});


export const workoutScheduleModel =
  mongoose.model<IworkoutSchedule>(
    "WorkoutSchedule",
    workoutScheduleSchema
  );