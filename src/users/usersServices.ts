import type User from "./dtos/userDto.ts";
import usersModel from "../models/usersModel.ts";

// دریافت همه کاربران
export const getAllUsers = async () => {
    return usersModel.find();
};

// دریافت کاربر با id
export const getUserById = async (id: string) => {
    const user = await usersModel.findById(id);
    if (!user) throw new Error("UserNotFound");
    return user;
};

// ایجاد کاربر جدید
export const createUser = async (user: User) => {
    return usersModel.create(user);
};

// آپدیت کاربر
export const updateUser = async (id: string, data: Partial<User>) => {
    const user = await usersModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw new Error("UserNotFound");
    return user;
};

// حذف کاربر
export const deleteUserById = async (id: string) => {
    const user = await usersModel.findByIdAndDelete(id);
    if (!user) throw new Error("UserNotFound");
    return user;
};
















// import type { Request, Response } from "express";
// import type User from "./dtos/userDto.ts";
// import usersModel from "../models/usersModel.ts";
// // import { error } from "console";

// export const getAllUsers =(req:Request , res:Response) => {
//   // Logic to get all users from the database or data source
//   usersModel.find().then(data=>{
//     return res.send(data)
//   }).catch(err=>{
//     return res.status(500).send({message:"Internal server error" , error:err})
//   })
// }

// export const getUser =(req:Request , res:Response) => {
//   // Logic to get users bt id from the database or data source
//   usersModel.findById(req.params.id).then(data=>{
//     if(!data){
//       return res.status(404).send({message:"User not found"})
//     }
//     return res.send(data)
//   }).catch(err=>{
//     return res.status(500).send({message:"Internal server error",erroe:err})
//   })

// }

// export const postUser =(req:Request , res:Response , user:User) => {
//   // Logic to get all users from the database or data source
//   usersModel.create(user).then((data)=>{
//     console.log(data)
//     return res.status(201).send(data)
//   }).catch((err)=>{
//     console.log(err)
//     return res.status(500).send({message:"Internal server error" , error:err})
//   })
// }

// export const putUser =(req:Request , res:Response) => {
//   // Logic to update user by id from the database or data source
//   usersModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(data=>{
//     if(!data){
//       return res.status(404).send({message:"User not found"})
//     }
//     return res.status(200).send(data)
//   }).catch(err=>{
//     return res.status(500).send({message:"Internal server error",error:err})
//   })
//   // return res.send({ message: "User updated successfully" })
// }
// export const deleteUser =(req:Request , res:Response) => {
//   // Logic to delete user by id from the database or data source
//   usersModel.findByIdAndDelete(req.params.id).then(data=>{
//     if(!data){
//       return res.status(404).send({message:"User not found"})
//     }
//     return res.status(200).send(data)
//   }).catch(err=>{
//     return res.status(500).send({message:"Internal server error",error:err})
//   })

//   // return res.send({ message: "User deleted successfully" })
// }