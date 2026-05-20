"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async ({ name, email, password, }) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await userModel_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
    return {
        statusCode: 201,
        data: {
            token,
            name: user.name,
        },
    };
};
exports.register = register;
const login = async ({ email, password }) => {
    const findUser = await userModel_1.default.findOne({ email });
    if (!findUser) {
        return {
            statusCode: 400,
            data: {
                message: "Incorrect email or password",
            },
        };
    }
    const passwordMatch = await bcrypt_1.default.compare(password, findUser.password);
    if (!passwordMatch) {
        return {
            statusCode: 400,
            data: {
                message: "Incorrect email or password",
            },
        };
    }
    const token = jsonwebtoken_1.default.sign({ userId: findUser._id }, process.env.JWT_SECRET);
    return {
        statusCode: 200,
        data: {
            token,
            name: findUser.name,
        },
    };
};
exports.login = login;
const generateJwt = (userId) => {
    return jsonwebtoken_1.default.sign({ userId: userId.toString() }, process.env.JWT_SECRET || "");
};
exports.generateJwt = generateJwt;
