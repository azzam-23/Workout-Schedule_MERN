import { createContext, useContext } from "react";
import type { DayPlan } from "../../types/DayPlan";
import type { Exercise } from "../../types/Exercises";

export interface ScheduleContextType {
  schedule: DayPlan[];

  addExercise: (exercise: Exercise) => void;
  fetchSchedule: () => void;
  addDay: (day: string) => void;
  deleteDay: (day: string) => void;
}


export const scheduleContext = createContext<ScheduleContextType>({
  schedule: [],
  addExercise: () => {},
  fetchSchedule: () => {},
  addDay: () => {},
  deleteDay: () => {},
});

export const useSchedule = () => useContext(scheduleContext);
