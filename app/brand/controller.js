//api level end point
//json input validation
import express from "express"
import { listBrands } from "./service.js"
const brandRouter = express.Router()

//routers
brandRouter.get('/',async(req,res)=>{
    const brands = await listBrands()
    res.send(brands)
})

export{
    brandRouter
}