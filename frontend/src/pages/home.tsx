

import { useEffect, useState } from "react";
import WorkoutCard from "../components/workoutCard"; // Import your new component

const HomePage = () => {
  const [schedule, setSchedule] = useState([]);
  


    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWNjOTIyY2M1NzdlMWU2Y2JmZDk2NmUiLCJpYXQiOjE3NzUwMTQ4NTF9.J5UCqOsBN1tTRwlkpBjI6zCmGFnWvSveaM_NEX036-o";

   
  useEffect(() => {
    fetch("http://localhost:3001/workout-schedule", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const data = await response.json();
    console.log(data);
      setSchedule(data.workoutSchedule);
    });
  }, []);
return (
    <div className="home-container">
      <h1 className="home-title">🏋️ Workout Tracker</h1>
      
      <div className="workout-grid">
        {schedule.length > 0 ? (
          schedule.map((dayPlan: any) => (
            <WorkoutCard key={dayPlan._id} dayPlan={dayPlan} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No plans found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;