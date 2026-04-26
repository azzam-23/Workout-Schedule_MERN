import express from "express";
import { login, register } from "../services/userService.js";

const router = express.Router();

router.post('/register', async (req, res) => {
const { name, email, password } = req.body;
const {statusCode, data} =  await register({name, email , password});
res.status(statusCode).json(data);

});

router.post('/login', async (req, res) => {
const { email, password } = req.body;
const {statusCode, data} =  await login({email, password});
res.status(statusCode).json(data);

});



export default router;