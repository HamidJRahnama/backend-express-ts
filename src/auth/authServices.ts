import type { Request, Response } from "express"
import type RegisterDto from "./dtos/registerDto.ts"
import type LoginDtios from "./dtos/loginDto.ts"
import usersModel from "../models/usersModel.ts"
import bcrypt from "bcrypt"

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


export const loginUser =(req:Request , res:Response ) => {
  // Logic to get all users from the database or data source
  const body:LoginDtios = req.body
  usersModel.findOne({email:body.email}).then(data=>{
    if(!data){
      return res.status(400).send({message:"User email does not exists. Please register"})
    }
    if(data.password !== body.password){
      return res.status(400).send({message:"Invalid credentials"})
    }
    return res.status(200).send({message:"Login successful" , data})
    // console.log(data)
  }).catch(err=>{
      console.log(err)
      return res.status(500).send({message:"Internal server error" , error:err})
    })
    // res.send({message:"you are logged in" , body})
}