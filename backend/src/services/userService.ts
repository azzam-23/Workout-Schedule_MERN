import userModel from "../models/userModel";
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

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!
  );

  return {
    statusCode: 201,
    data: {
      token,
      name: user.name,
    },
  };
};
interface LoginParams {
  email: string;
  password: string;
}
export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return {
      statusCode: 400,
      data: {
        message: "Incorrect email or password",
      },
    };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (!passwordMatch) {
    return {
      statusCode: 400,
      data: {
        message: "Incorrect email or password",
      },
    };
  }

  const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET!);

  return {
    statusCode: 200,
    data: {
      token,
      name: findUser.name,
    },
  };
};

export const generateJwt = (userId: Types.ObjectId | string) => {
  return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET || "");
};
