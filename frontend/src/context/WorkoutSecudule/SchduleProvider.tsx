import { useState, type FC, type PropsWithChildren } from "react";

import { scheduleContext } from "./SchduleContext";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";
import type { Exercise } from "../../types/Exercises";
import type { DayPlan } from "../../types/DayPlan";

const ScheduleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [schedule, setSchedule] = useState<DayPlan[]>([]);

  const [, setError] = useState("");

  const { token } = useAuth();

  const fetchSchedule = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/workout-schedule`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch workout schedule");
        return;
      }

      const data = await response.json();

      setSchedule(data.workoutSchedule || []);
    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  const addExercise = async (exercise: Exercise) => {
    try {
      const response = await fetch(`${BASE_URL}/workout-schedule/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
      });

      if (!response.ok) return;

      await fetchSchedule();
    } catch (err) {
      console.log(err);
    }
  };

  const addDay = async (day: string) => {
    try {
      const response = await fetch(`${BASE_URL}/workout-schedule/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ day }),
      });

      if (!response.ok) return;

      await fetchSchedule();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDay = async (day: string) => {
    try {
      const response = await fetch(`${BASE_URL}/workout-schedule/day/${day}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      await fetchSchedule();
    } catch (err) {
      console.log(err);
    }
  };

  const updateExercise = async (exercise: Exercise) => {
    try {
      const response = await fetch(`${BASE_URL}/workout-schedule/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          exerciseId: exercise._id,
          name: exercise.name,
          type: exercise.type,
          sets: exercise.sets,
        }),
      });

      if (!response.ok) return;

      await fetchSchedule();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <scheduleContext.Provider
      value={{
        schedule,
        addExercise,
        addDay,
        fetchSchedule,
        deleteDay,
        updateExercise,
      }}
    >
      {children}
    </scheduleContext.Provider>
  );
};

export default ScheduleProvider;
