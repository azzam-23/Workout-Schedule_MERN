import type { Exercise } from "./Exercises";
export interface DayPlan {
  _id: string;
  day: string;
  exercises: Exercise[];
}