import { useState } from "react";
import "../style/addExercise.css";
import { useSchedule } from "../context/WorkoutSecudule/SchduleContext";



type Props = {
  isOpen: boolean;
  onClose: () => void;
  day: string;
};

const AddExercise = ({ isOpen, onClose, day }: Props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [sets, setSets] = useState(0);
 const { addExercise } = useSchedule();
  if (!isOpen) return null;


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  addExercise({
    name,
    type,
    sets,
    day,
  });

  onClose();
  
};

  return (
    <div className="add-exercise-container">
      <h2 className="add-exercise-title">Add Exercise - {day}</h2>

      <form className="add-exercise-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exercise-name">Exercise Name</label>

          <input
            type="text"
            id="exercise-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="exercise-type">Exercise Type</label>

          <input
            type="text"
            id="exercise-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="exercise-sets">Number of Sets</label>

          <input
            type="number"
            id="exercise-sets"
            min="1"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            required
          />
        </div>

        <div className="add-button-group">
          <button type="submit" className="submit-button">
            Add Exercise
          </button>

          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExercise;
