export interface Exercise {
    _id: string;
    name: string;
    type: string;
    sets: number;
    pr?: number;
    day: string;
}

export type NewExercise = {
  name: string;
  type: string;
  sets: number;
  pr?: number;
  day: string;
};