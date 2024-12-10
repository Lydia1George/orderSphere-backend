//api level end point
//json input validation
import express from "express"
import { listProductCategory } from "./service.js"
const productCategoryRouter = express.Router()

//routers
productCategoryRouter.get('/',async(req,res)=>{
    const productCategories = await listProductCategory()
    res.send(productCategories)
})

export{
    productCategoryRouter
}