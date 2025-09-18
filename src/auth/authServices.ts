import type { Request, Response } from "express"
import type RegisterDto from "./dtos/registerDto.ts"
import usersModel from "../models/usersModel.ts"
import bcrypt from "bcrypt"
import type LoginDtos from "./dtos/loginDto.ts"
import { decodeToken, encodeToken } from "../utils/index.ts"

// Register a new user
export const registerUser = async (body: RegisterDto) => {
  // Check if user already exists
  const existingUser = await usersModel.findOne({ email: body.email });
  if (existingUser) {
    throw new Error("UserExists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Save the new user
  const newUser = await usersModel.create({
    ...body,
    password: hashedPassword,
  });

  return newUser;
};

// Login user and return token
export const loginUser = async (body: LoginDtos) => {
  // Find the user by email
  const user = await usersModel.findOne({ email: body.email });
  if (!user) throw new Error("UserNotFound");

  // Check if password exists
  if (!user.password) throw new Error("NoPasswordStored");

  // Compare password
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) throw new Error("InvalidCredentials");

  // Generate JWT token
  const token = encodeToken({ id: user.id });

  return { user, token };
};
