import type { Request, Response } from "express";
import type User from "./dtos/userDto.ts";
import usersModel from "../models/usersModel.ts";
// import { error } from "console";

export const getAllUsers =(req:Request , res:Response) => {
  // Logic to get all users from the database or data source
  usersModel.find().then(data=>{
    return res.send(data)
  }).catch(err=>{
    return res.status(500).send({message:"Internal server error" , error:err})
  })
}

export const getUser =(req:Request , res:Response) => {
  // Logic to get users bt id from the database or data source
  usersModel.findById(req.params.id).then(data=>{
    if(!data){
      return res.status(404).send({message:"User not found"})
    }
    return res.send(data)
  }).catch(err=>{
    return res.status(500).send({message:"Internal server error",erroe:err})
  })

}

export const postUser =(req:Request , res:Response , user:User) => {
  // Logic to get all users from the database or data source
  usersModel.create(user).then((data)=>{
    console.log(data)
    return res.status(201).send(data)
  }).catch((err)=>{
    console.log(err)
    return res.status(500).send({message:"Internal server error" , error:err})
  })
}

export const putUser =(req:Request , res:Response) => {
  // Logic to update user by id from the database or data source
  usersModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(data=>{
    if(!data){
      return res.status(404).send({message:"User not found"})
    }
    return res.status(200).send(data)
  }).catch(err=>{
    return res.status(500).send({message:"Internal server error",error:err})
  })
  // return res.send({ message: "User updated successfully" })
}
export const deleteUser =(req:Request , res:Response) => {
  // Logic to delete user by id from the database or data source
  usersModel.findByIdAndDelete(req.params.id).then(data=>{
    if(!data){
      return res.status(404).send({message:"User not found"})
    }
    return res.status(200).send(data)
  }).catch(err=>{
    return res.status(500).send({message:"Internal server error",error:err})
  })

  // return res.send({ message: "User deleted successfully" })
}