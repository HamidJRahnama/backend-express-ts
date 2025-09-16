import type { Request, Response } from "express";
import { Router } from "express";
import { authMiddleware } from "../middlewares/index.ts";
import { deleteProduct, getAllProducts, getProduct, postProduct, putProduct } from "./productsServices.ts";

const router = Router()
router.use(authMiddleware);


router.get(`/` , (req:Request , res:Response)=>{
    console.log("/Products GET")
    getAllProducts(req, res);
})


router.get(`/:id` , (req:Request , res:Response)=>{
    console.log("/Products/{id} GET")
    getProduct(req, res);
})


router.post(`/` , (req:Request , res:Response)=>{
    console.log("/Products POST")
    postProduct(req, res);
})


router.put(`/:id` , (req:Request , res:Response)=>{
    console.log("/Products/{id} GET")
    putProduct(req, res);
})


router.delete(`/:id` , (req:Request , res:Response)=>{
    console.log("/Products/id DELETE")
    deleteProduct(req, res);
})

export default router