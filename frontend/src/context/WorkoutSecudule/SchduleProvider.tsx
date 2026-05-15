import {
  useState,
  type FC,
  type PropsWithChildren,
} from "react";

import { scheduleContext } from "./SchduleContext";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";
import type { DayPlan } from "../../types/DayPlan";
import type { Exercise } from "../../types/Exercises";

const ScheduleProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [schedule, setSchedule] =
    useState<DayPlan[]>([]);

  const { token } = useAuth();

  const fetchSchedule = async () => {
    const response = await fetch(
      `${BASE_URL}/workout-schedule`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setSchedule(data.workoutSchedule || []);
  };

  const addExercise = async (
    exercise: Exercise
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/workout-schedule/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(exercise),
        }
      );

      if (!response.ok) return;

      await fetchSchedule(); // refresh immediately
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <scheduleContext.Provider
      value={{
        schedule,
        addExercise,
        fetchSchedule
      }}
    >
      {children}
    </scheduleContext.Provider>
  );
};

export default ScheduleProvider;