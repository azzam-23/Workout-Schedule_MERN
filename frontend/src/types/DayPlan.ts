import type { Exercise } from "./Exercises";
export interface DayPlan {
  day: string;
  exercises: Exercise[];
}