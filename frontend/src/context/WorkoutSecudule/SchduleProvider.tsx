import {  useState, type FC, type PropsWithChildren } from "react";
import type { DayPlan } from "../../types/DayPlan";
import { scheduleContext } from "./SchduleContext";




const ScheduleProvider: FC<PropsWithChildren> = ({children}) => {
const [schedule, setSchedule] = useState<DayPlan[]>([]);

const addExercise = (exerciseId: object) => {
  console.log( exerciseId);
};




  return(
    <scheduleContext.Provider value={{schedule, addExercise}}>
      {children}
    </scheduleContext.Provider>
  )

}

export default ScheduleProvider;