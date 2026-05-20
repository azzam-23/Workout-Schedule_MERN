"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).send("Access denied");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).send("Token missing");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        console.log(decoded);
        if (!decoded.userId) {
            return res.status(403).send("Invalid token payload");
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).send("Invalid token");
    }
};
exports.default = validateJWT;
