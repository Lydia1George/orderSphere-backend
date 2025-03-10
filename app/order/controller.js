import { getUserOrders } from './service.js';
import { userIdSchema } from './validation.js';

import express from "express"

const userOrdersSearchRouter = express.Router()
userOrdersSearchRouter.get('/:userId',async(req,res)=>{
    try {
        // Validate userId
        const { userId } = userIdSchema.parse(req.params);
        // Get user orders from service
        const userOrders = await getUserOrders(userId);
    
        res.send(userOrders)
      } catch (err) {
        if (err.name === 'ZodError') {
          return res.status(400).json({ error: err.errors });
        }
        res.status(404).json({ error: err.message });
      }
    });

export{
    userOrdersSearchRouter
}