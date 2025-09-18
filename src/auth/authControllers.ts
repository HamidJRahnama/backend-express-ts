import { Router, type NextFunction, type Request, type Response } from "express";
import { loginUser, registerUser } from "./authServices.ts";
import RegisterDto from "./dtos/registerDto.ts";
import validationMiddleware from "../middlewares/validateMiddleware.ts";
import type User from "../users/dtos/userDto.ts";
import LoginDtos from "./dtos/loginDto.ts";

const router = Router()

// POST /register
router.post("/register", validationMiddleware(RegisterDto), async (req: Request, res: Response) => {
  try {
    const body: RegisterDto = req.body;
    const newUser = await registerUser(body);
    res.status(201).send({ message: "User registered successfully", data: newUser });
  } catch (err: any) {
    if (err.message === "UserExists") {
      return res.status(400).send({ message: "User email already exists. Please login" });
    }
    res.status(500).send({ message: "Internal server error", error: err });
  }
});

// POST /login
router.post("/login", validationMiddleware(LoginDtos), async (req: Request, res: Response) => {
  try {
    const body: LoginDtos = req.body;
    const { user, token } = await loginUser(body);
    res.status(200).send({ message: "Login successful", token, user });
  } catch (err: any) {
    if (err.message === "UserNotFound") {
      return res.status(400).send({ message: "User email does not exist. Please register" });
    }
    if (err.message === "NoPasswordStored") {
      return res.status(500).send({ message: "User has no password stored" });
    }
    if (err.message === "InvalidCredentials") {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    res.status(500).send({ message: "Internal server error", error: err });
  }
});


export default router