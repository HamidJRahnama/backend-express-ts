import type { Request, Response } from "express"
import type RegisterDto from "./dtos/registerDto.ts"
import usersModel from "../models/usersModel.ts"
import bcrypt from "bcrypt"
import type LoginDtos from "./dtos/loginDto.ts"
import { decodeToken, encodeToken } from "../utils/index.ts"

export const registerUser = async (req: Request, res: Response) => {
  try {
    const body: RegisterDto = req.body;

    // Check if user already exists
    const existingUser = await usersModel.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).send({
        message: "User email already exists. Please login",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Save the new user
    const newUser = await usersModel.create({
      ...body,
      password: hashedPassword, // حواست باشه password درست باشه، نه passsword
    });

    return res.status(201).send({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Internal server error",
      error: err,
    });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const body: LoginDtos = req.body;

    // پیدا کردن کاربر
    const user = await usersModel.findOne({ email: body.email });
    if (!user) {
      return res.status(400).send({
        message: "User email does not exist. Please register",
      });
    }

    // مقایسه پسورد
    if (!body.password) {
      return res.status(400).send({ message: "Password is required" });
    }

    if (!user.password) {
      return res.status(500).send({ message: "User has no password stored" });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    }
    
    // اگر همه‌چیز درست بود
    const token = encodeToken( {id:user.id} )
    return res.status(200).send({
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Internal server error",
      error: err,
    });
  }
};

