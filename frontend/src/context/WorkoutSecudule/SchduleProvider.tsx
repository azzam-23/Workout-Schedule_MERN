import { useCallback, useState, type FC, type PropsWithChildren } from "react";
import { scheduleContext } from "./SchduleContext";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";
import type { Exercise, NewExercise } from "../../types/Exercises";
import type { DayPlan } from "../../types/DayPlan";

const ScheduleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [schedule, setSchedule] = useState<DayPlan[]>([]);

  const [, setError] = useState("");

  const { token } = useAuth();

const fetchSchedule = useCallback(async () => {
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
    console.error("Fetch schedule error:", err);
    setError("Server error");
  }
}, [token]);


  const addExercise = async (exercise: NewExercise) => {
      
  try {
    const response = await fetch(`${BASE_URL}/workout-schedule/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });

    if (!response.ok) {
      const error = await response.text();

      console.error("Add exercise failed:", response.status);
      console.error("Server response:", error);

      return;
    }

    await fetchSchedule();
  } catch (err) {
    console.error("Add exercise error:", err);
  }
};


  const deleteDay = async (dayPlanId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/workout-schedule/day/${dayPlanId}`, {
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
          pr: exercise.pr,
        }),
      });

      if (!response.ok) return;

      await fetchSchedule();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExercise = async (exerciseId: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/workout-schedule/${exerciseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
        fetchSchedule,
        deleteDay,
        updateExercise,
        deleteExercise,
      }}
    >
      {children}
    </scheduleContext.Provider>
  );
};

export default ScheduleProvider;
