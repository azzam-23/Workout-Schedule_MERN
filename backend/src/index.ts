import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import workoutScheduleRoute from "./routes/workoutScheduleRoute.ts";
import  cors from "cors";

dotenv.config();

console.log(process.env.MONGO_URI);
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("mongo connected!"))
  .catch((err) => console.log("Failed to connect!", err));
  





  app.use("/user", userRoute);
  app.use("/workout-schedule", workoutScheduleRoute);
  app.listen(port, () => {
    console.log(`"Server is running at: http://localhost:${port}`)
  });
