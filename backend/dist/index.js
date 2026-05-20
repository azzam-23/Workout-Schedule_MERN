"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const workoutScheduleRoute_1 = __importDefault(require("./routes/workoutScheduleRoute"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
console.log(process.env.MONGO_URI);
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("mongo connected!"))
    .catch((err) => console.log("Failed to connect!", err));
app.use("/user", userRoute_1.default);
app.use("/workout-schedule", workoutScheduleRoute_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
