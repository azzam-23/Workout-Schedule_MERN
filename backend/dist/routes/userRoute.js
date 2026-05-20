"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }
        const { statusCode, data } = await (0, userService_1.register)({
            name,
            email,
            password,
        });
        return res.status(statusCode).json(data);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { statusCode, data } = await (0, userService_1.login)({
            email,
            password,
        });
        return res.status(statusCode).json(data);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
});
exports.default = router;
