"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDay = exports.deleteExercise = exports.updateExercise = exports.addExercise = exports.getActiveScheduleForUser = void 0;
const workoutScheduleModel_1 = require("../models/workoutScheduleModel");
const createScheduleForUser = async ({ userId, }) => {
    const existing = await workoutScheduleModel_1.workoutScheduleModel.findOne({ userId });
    if (existing)
        return existing;
    const newSchedule = new workoutScheduleModel_1.workoutScheduleModel({
        userId,
        workoutSchedule: [],
    });
    await newSchedule.save();
    return newSchedule;
};
const getActiveScheduleForUser = async ({ userId, }) => {
    let schedule = await workoutScheduleModel_1.workoutScheduleModel.findOne({ userId });
    if (!schedule) {
        schedule = await createScheduleForUser({ userId });
    }
    return schedule;
};
exports.getActiveScheduleForUser = getActiveScheduleForUser;
const addExercise = async ({ userId, name, type, sets, day, }) => {
    const schedule = await (0, exports.getActiveScheduleForUser)({ userId });
    let dayPlan = schedule.workoutSchedule.find((d) => d.day === day);
    if (!dayPlan) {
        dayPlan = { day, exercises: [] };
        schedule.workoutSchedule.push(dayPlan);
    }
    dayPlan.exercises.push({ name, type, sets });
    await schedule.save();
    return schedule;
};
exports.addExercise = addExercise;
const updateExercise = async ({ userId, exerciseId, name, type, sets, }) => {
    const schedule = await (0, exports.getActiveScheduleForUser)({ userId });
    for (const day of schedule.workoutSchedule) {
        const exercise = day.exercises.find((e) => e._id?.toString() === exerciseId);
        if (exercise) {
            if (name)
                exercise.name = name;
            if (type)
                exercise.type = type;
            if (sets !== undefined)
                exercise.sets = sets;
        }
    }
    await schedule.save();
    return schedule;
};
exports.updateExercise = updateExercise;
const deleteExercise = async ({ userId, exerciseId, }) => {
    const schedule = await (0, exports.getActiveScheduleForUser)({ userId });
    schedule.workoutSchedule.forEach((day) => {
        day.exercises = day.exercises.filter((e) => e._id?.toString() !== exerciseId);
    });
    await schedule.save();
    return schedule;
};
exports.deleteExercise = deleteExercise;
const deleteDay = async ({ userId, day, }) => {
    const schedule = await (0, exports.getActiveScheduleForUser)({ userId });
    schedule.workoutSchedule = schedule.workoutSchedule.filter((dayPlan) => dayPlan.day !== day);
    await schedule.save();
    return schedule;
};
exports.deleteDay = deleteDay;
