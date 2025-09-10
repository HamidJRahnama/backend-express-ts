import type { Request, Response } from "express";

export const getAllUsers =(req:Request , res:Response) => {
  // Logic to get all users from the database or data source
  return res.send([])
}

export const getUser =(req:Request , res:Response) => {
  // Logic to get all users from the database or data source
  return res.send({ id: req.params.id })
}

export const postUser =(req:Request , res:Response) => {
  // Logic to get all users from the database or data source
  return res.send({ message: "User created successfully" })
}

export const putUser =(req:Request , res:Response) => {
  // Logic to get all users from the database or data source
  return res.send({ message: "User updated successfully" })
}
export const deleteUser =(req:Request , res:Response) => {
  // Logic to get all users from the database or data source
  return res.send({ message: "User deleted successfully" })
}