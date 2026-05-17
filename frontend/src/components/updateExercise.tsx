import { useState } from "react";
import "../style/addExercise.css";
import { useSchedule } from "../context/WorkoutSecudule/SchduleContext";
import type { Exercise } from "../types/Exercises";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise;
};

const UpdateExercise = ({ isOpen, onClose, exercise }: Props) => {
  const [name, setName] = useState(exercise.name);

  const [type, setType] = useState(exercise.type);

  const [sets, setSets] = useState(exercise.sets);

  const { updateExercise } = useSchedule();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateExercise({
      _id: exercise._id,
      name,
      type,
      sets,
      day: exercise.day,
    });

    onClose();
  };

  return (
    <div className="add-exercise-container">
      <h2 className="add-exercise-title">Update Exercise</h2>

      <form className="add-exercise-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Exercise Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Exercise Type</label>

          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Number of Sets</label>

          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">
            Update Exercise
          </button>

          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateExercise;
