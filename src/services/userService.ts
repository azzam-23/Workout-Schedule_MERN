import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Types } from "mongoose";



interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export const register = async ({
  name,
  email,
  password,
}: RegisterParams) => {
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return { data: "User already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateJwt(newUser._id);

  return {
    statusCode: 201,
    data: token,
  };
};



interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    return { data: "incorrect email or password!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { data: "incorrect email or password!", statusCode: 400 };
  }

  const token = generateJwt(user._id);

  return {
    statusCode: 200,
    data: token,
  };
};



export const generateJwt = (userId: Types.ObjectId | string) => {
  return jwt.sign(
    { userId: userId.toString() },
    "e126d8cff3823cdbd3cfb61b25f47fbd"
  );
};