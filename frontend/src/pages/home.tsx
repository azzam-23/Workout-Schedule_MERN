

import {useEffect, useState } from "react";
import WorkoutCard from "../components/workoutCard"; 
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";


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
const HomePage = () => {
  const [schedule, setSchedule] = useState<DayPlan[]>([]);
  const {token} = useAuth();
  const [error, setError] = useState("");

    
   
  useEffect(() => {
    if(!token) return;
    
    const fetchSchedule = async () => {
      const response = await fetch(`${BASE_URL}/workout-schedule`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if(!response.ok) {    
        setError("Failed to fetch workout schedule. Please try again.");
      }
   
    const data = await response.json();
    console.log(data);
    setSchedule(data.workoutSchedule || []);
    };
    fetchSchedule();
  }, []);

return (
    <div className="home-container">
      
      
      <div className="workout-grid">
        {schedule.length > 0 ? (
          schedule.map((dayPlan: DayPlan) => (
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