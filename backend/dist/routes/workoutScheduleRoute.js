"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const workoutScheduleService_1 = require("../services/workoutScheduleService");
const router = express_1.default.Router();
router.get("/", validateJWT_1.default, async (req, res) => {
    try {
        const userId = req.user.userId;
        const schedule = await (0, workoutScheduleService_1.getActiveScheduleForUser)({
            userId,
        });
        res.status(200).json({
            workoutSchedule: schedule.workoutSchedule,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});
router.post("/add", validateJWT_1.default, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, type, sets, day } = req.body;
        const result = await (0, workoutScheduleService_1.addExercise)({
            userId,
            name,
            type,
            sets,
            day,
        });
        res.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});
router.put("/update", validateJWT_1.default, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { exerciseId, name, type, sets } = req.body;
        const result = await (0, workoutScheduleService_1.updateExercise)({
            userId,
            exerciseId,
            name,
            type,
            sets,
        });
        res.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});
router.delete("/:exerciseId", validateJWT_1.default, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { exerciseId } = req.params;
        const result = await (0, workoutScheduleService_1.deleteExercise)({
            userId,
            exerciseId,
        });
        res.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});
router.delete("/day/:day", validateJWT_1.default, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { day } = req.params;
        const result = await (0, workoutScheduleService_1.deleteDay)({
            userId,
            day,
        });
        res.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error deleting day");
    }
});
exports.default = router;
