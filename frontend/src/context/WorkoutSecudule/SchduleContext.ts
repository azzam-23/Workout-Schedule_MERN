import { createContext, useContext } from "react";
import type { DayPlan } from "../../types/DayPlan";
import type { Exercise, NewExercise } from "../../types/Exercises";

export interface ScheduleContextType {
  schedule: DayPlan[];

  addExercise: (exercise: NewExercise) => void;
  fetchSchedule: () => void;
  addDay: (day: string) => void;
  deleteDay: (day: string) => void;
  updateExercise: (exercise: Exercise) => void;
  deleteExercise: (exerciseId: string) => void;
}


export const scheduleContext = createContext<ScheduleContextType>({
  schedule: [],
  addExercise: () => {},
  fetchSchedule: () => {},
  addDay: () => {},
  deleteDay: () => {},
  updateExercise: () => {},
  deleteExercise: () => {},
});

export const useSchedule = () => useContext(scheduleContext);
