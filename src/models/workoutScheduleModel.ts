import mongoose, { Schema, Types } from "mongoose";

export interface IExercise {
   _id?: Types.ObjectId;
  name: string;
  type: string;
  sets: number;
  day: string;
}

export interface IWorkoutSchedule {
  userId: Types.ObjectId;
  exercises: IExercise[];
}

const exerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  sets: { type: Number, default: 3 },
  day: { type: String, required: true },
});

const workoutScheduleSchema = new Schema<IWorkoutSchedule>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  exercises: [exerciseSchema],
});

export const workoutScheduleModel = mongoose.model<IWorkoutSchedule>(
  "WorkoutSchedule",
  workoutScheduleSchema
);