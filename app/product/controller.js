import { productIdSchema } from './validation.js';
import { getProductById } from './service.js';
import express from "express"
const productsRouter = express.Router()


productsRouter.get('/:productId',async(req,res)=>{
  try {
    // Validate productId
    const { productId } = productIdSchema.parse(req.params);
    // Get product from service
    const products = await getProductById(productId);

    res.send(products)
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(404).json({ error: err.message });
  }
});

export{
    productsRouter
}