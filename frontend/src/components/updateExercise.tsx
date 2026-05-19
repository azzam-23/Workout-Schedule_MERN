import { useState } from "react";
import "../style/updateExercise.css";
import "../style/deleteExercise.css"
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

  const { updateExercise, deleteExercise } = useSchedule();

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

  const handleDelete = async () => {
    await deleteExercise(exercise._id);

    onClose();
  };

  return (
    <div className="update-exercise-container">
      <h2 className="update-exercise-title">Update Exercise</h2>

      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>

          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Type</label>

          <input value={type} onChange={(e) => setType(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Sets</label>

          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
        </div>

        <div className="update-button-group">
          <button type="submit" className="update-button">
            Update
          </button>

          <button type="button" className="update-cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            type="button"
            className="delete-exercise-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateExercise;
