import "../style/workoutCard.css"


interface Exercise {
  _id: string;
  name: string;
  type: string;
  sets: number;
}

interface DayPlan {
    _id: string;
    day: string;
    exercises: Exercise[];
  
}

const WorkoutCard =({ dayPlan }: { dayPlan: DayPlan }) => {
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutCard;
