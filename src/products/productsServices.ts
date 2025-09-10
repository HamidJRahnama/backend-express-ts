import type { Request, Response } from "express";

export const getAllProducts =(req:Request , res:Response) => {
  // Logic to get all Products from the database or data source
  return res.send([])
}

export const getProduct =(req:Request , res:Response) => {
  // Logic to get all Products from the database or data source
  return res.send({ id: req.params.id })
}

export const postProduct =(req:Request , res:Response) => {
  // Logic to get all Products from the database or data source
  return res.send({ message: "Product created successfully" })
}

export const putProduct =(req:Request , res:Response) => {
  // Logic to get all Products from the database or data source
  return res.send({ message: "Product updated successfully" })
}
export const deleteProduct =(req:Request , res:Response) => {
  // Logic to get all Products from the database or data source
  return res.send({ message: "Product deleted successfully" })
}