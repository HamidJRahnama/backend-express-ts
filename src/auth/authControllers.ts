import { Router, type NextFunction, type Request, type Response } from "express";
import { loginUser, registerUser } from "./authServices.ts";
import RegisterDto from "./dtos/registerDto.ts";
import validationMiddleware from "../middlewares/validateMiddleware.ts";
import type User from "../users/dtos/userDto.ts";
import LoginDtios from "./dtos/loginDto.ts";

const router = Router()

router.post(`/register` , validationMiddleware(RegisterDto), (req:Request , res:Response)=>{
    
    registerUser(req, res );
    console.log("/register POST")
})


router.post('/login', validationMiddleware(LoginDtios),(req:Request , res:Response , next:NextFunction)=>{
    console.log("/login POST")
    loginUser(req, res );
})

export default router