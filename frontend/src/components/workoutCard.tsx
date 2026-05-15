import "../style/workoutCard.css";
import type { Exercise } from "../types/Exercises";
import type { DayPlan } from "../types/DayPlan";
import { useState } from "react";
import AddExercise from "./AddExercise";

type Props = {
  dayPlan: DayPlan;
};

const WorkoutCard = ({ dayPlan }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] =  useState(false);
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
            <button className="edit-button" >
              Edit
            </button>
            
          </div>
        ))}
        <button className="AddExerciseButton " onClick={() => setIsOpen(true)}>
          Add Exercise
        </button>
       { isOpen && (
          <AddExercise
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            day={dayPlan.day}
          />
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
