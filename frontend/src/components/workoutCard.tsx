import "../style/workoutCard.css";
import type { Exercise } from "../types/Exercises";
import type { DayPlan } from "../types/DayPlan";
import { useState } from "react";
import AddExercise from "./AddExercise";
import { useSchedule } from "../context/WorkoutSecudule/SchduleContext";
import UpdateExercise from "./updateExercise";

type Props = {
  dayPlan: DayPlan;
};

const WorkoutCard = ({ dayPlan }: Props) => {
  const [addOpen, setAddOpen] = useState(false);

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  const { deleteDay } = useSchedule();

  return (
    <div className="workout-card">
      <h2 className="day-title">{dayPlan.day}</h2>

      <div className="exercise-list">
        {dayPlan.exercises.map((ex: Exercise) => (
          <div key={ex._id} className="exercise-item">
            <div className="exercise-info">
              <h4 className="ex-name">{ex.name}</h4>

              <span className="ex-type">{ex.type}</span>
            </div>

            <div className="sets-display">
              <span className="sets-count">{ex.sets}</span>

              <span className="sets-label"> Sets</span>
            </div>

            <button
              className="edit-button"
              onClick={() => setSelectedExercise(ex)}
            >
              Edit
            </button>
          </div>
        ))}

        <button className="AddExerciseButton" onClick={() => setAddOpen(true)}>
          Add Exercise
        </button>

        <button
          className="delete-day-button"
          onClick={() => deleteDay(dayPlan.day)}
        >
          Delete Day
        </button>

        <AddExercise
          isOpen={addOpen}
          onClose={() => setAddOpen(false)}
          day={dayPlan.day}
        />
        {selectedExercise && (
          <UpdateExercise
            isOpen={true}
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
          />
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
