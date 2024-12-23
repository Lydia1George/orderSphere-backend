import { searchProduct } from './service.js';
import { productSearchSchema } from './validation.js';
import express from "express"

const productSearchRouter = express.Router()
productSearchRouter.post('/',async(req,res)=>{
    //extract parameters from the body, then send to service, then model.
    //add validation using zod
    const { filters,pageNumber } = req.body; 
    try{
    const validatedData = productSearchSchema.parse(filters,pageNumber);
    const productSearch = await searchProduct(filters,pageNumber);
    
    res.send(productSearch)
}catch (error) {
    if (error.name === 'ZodError') {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

});

export{
    productSearchRouter
}