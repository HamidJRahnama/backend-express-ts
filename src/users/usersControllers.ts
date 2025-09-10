import type { Request, Response } from "express";
import { Router } from "express";
import { authMiddleware } from "../middlewares/index.ts";
import { deleteUser, getAllUsers, getUser, postUser, putUser } from "./usersServices.ts";

const router = Router()
router.use(authMiddleware);


router.get(`/` , (req:Request , res:Response)=>{
    console.log("/Users GET")
    getAllUsers(req, res);
})
router.get(`/:id` , (req:Request , res:Response)=>{
    console.log("/Users/{id} GET")
    getUser(req, res);
})
router.post(`/` , (req:Request , res:Response)=>{
    console.log("/Users POST")
    postUser(req, res);
})
router.put(`/:id` , (req:Request , res:Response)=>{
    console.log("/Users/{id} GET")
    putUser(req, res);
})
router.delete(`/:id` , (req:Request , res:Response)=>{
    console.log("/Users/id DELETE")
    deleteUser(req, res);
})

export default router