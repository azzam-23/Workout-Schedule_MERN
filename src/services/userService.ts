import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export const register = async ({ name, email, password }: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    statusCode: 201,
    data: generateJwt({name,email})
  };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return  { data: "incorect email or password!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return {data :generateJwt({name:findUser,email}), statusCode:200};
  }

  return  { data: "incorect email or password!", statusCode: 400 };

};


const generateJwt = (data: any) => {
  return jwt.sign(data,"e126d8cff3823cdbd3cfb61b25f47fbd")
}