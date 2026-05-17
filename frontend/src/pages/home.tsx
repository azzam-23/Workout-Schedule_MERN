import { useEffect } from "react";
import WorkoutCard from "../components/workoutCard";
import { useSchedule } from "../context/WorkoutSecudule/SchduleContext";
import { useAuth } from "../context/Auth/AuthContext";

const HomePage = () => {
  const { schedule, fetchSchedule } = useSchedule();
  const { token } = useAuth();
  useEffect(() => {
    fetchSchedule();
  }, [token]);
  
  return (
    <div className="home-container">
      <div className="workout-grid">
        {schedule.length > 0 ? (
          schedule.map((dayPlan) => (
            <WorkoutCard
              key={dayPlan.day}
              dayPlan={dayPlan}
            />
          ))
        ) : (
          <p>No plans found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;