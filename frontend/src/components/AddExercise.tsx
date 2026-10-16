import { useState } from "react";
import "../style/addExercise.css";
import { useSchedule } from "../context/WorkoutSecudule/SchduleContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  day?: string;
  dayPlanId?: string;
};

const AddExercise = ({ isOpen, onClose, day, dayPlanId }: Props) => {
  const [dayName, setDayName] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [sets, setSets] = useState<number | "">("");
  const [pr, setPr] = useState<number | "">("");

  const { addExercise } = useSchedule();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
 const finalDay = day || dayName.trim();


    if (!finalDay || sets === "") {
      return;
    }

    await addExercise({
      day: finalDay,
      name,
      type,
      sets,
      pr: pr === "" ? undefined : pr,
      dayPlanId,
    });

    setDayName("");
    setName("");
    setType("");
    setSets("");
    setPr("");

    onClose();
  };

  return (
    <div className="add-exercise-overlay">
      <div className="add-exercise-container">
        <h2 className="add-exercise-title">
          Add Exercise
        </h2>

        <form
          className="add-exercise-form"
          onSubmit={handleSubmit}
        >
          
          {!day && (
            <div className="form-group">
              <label htmlFor="day-name">
                Day Name
              </label>

              <input
                type="text"
                id="day-name"
                value={dayName}
                onChange={(e) =>
                  setDayName(e.target.value)
                }
                placeholder="Push"
                required
              />
            </div>
          )}

         
          
          <div className="form-group">
            <label htmlFor="exercise-name">
              Exercise Name
            </label>

            <input
              type="text"
              id="exercise-name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Bench Press"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exercise-type">
              Type
            </label>

            <input
              type="text"
              id="exercise-type"
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              placeholder="e.g. Strength"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exercise-sets">
              Sets
            </label>

            <input
              type="number"
              id="exercise-sets"
              min="1"
              value={sets}
              onChange={(e) =>
                setSets(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exercise-pr">
              PR
            </label>

            <input
              type="number"
              id="exercise-pr"
              min="0"
              step="0.1"
              value={pr}
              onChange={(e) =>
                setPr(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }
              placeholder="Optional"
            />
          </div>

          <div className="add-exercise-actions">
            <button
              type="submit"
              className="add-exercise-submit"
            >
              Add Exercise
            </button>

            <button
              type="button"
              className="add-exercise-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExercise;