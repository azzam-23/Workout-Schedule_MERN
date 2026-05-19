export interface Exercise {
    _id: string;
    name: string;
    type: string;
    sets: number;
    day: string;
}

export type NewExercise = {
  name: string;
  type: string;
  sets: number;
  day: string;
};