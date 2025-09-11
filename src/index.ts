import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import usersControllers from "./users/usersControllers.ts";
import productsControllers from "./products/productsControllers.ts";
import mongoose from "mongoose";

import { authMiddleware } from "./middlewares/index.ts";

const app = express()

// CORS middleware to allow cross-origin requests from any origin with specific methods and headers
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'multipart/form-data']
}))

// Middleware to parse JSON request bodies
app.use(express.json());




// Middlewares

// Middleware function to log the time of request and path for specific routes
const myMiddleware = ((req:Request , res:Response , next:NextFunction)=>{
  console.log("Time:",Date.now())
  next()
})
app.use(myMiddleware)

// This middleware will be applied only to the /users route
const usersMiddleware = ((req:Request ,res:Response , next:NextFunction)=>{
  console.log("path:",req.path, "---","Time:",Date.now())
  next()
})



// app.use(authMiddleware)



app.get('/', (req: Request, res:Response) => {
  res.send('Hello World!')
})

// users API
app.use(`/users`, usersControllers)
app.use(`/products`,productsControllers)





mongoose.connect('mongodb://localhost:27017/expressdb',{
  autoIndex:true,

}).then(()=>{
  console.log("Connected to MongoDB")
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  })
}).catch((err)=>{
  console.error("Error connecting to MongoDB:", err)
})


