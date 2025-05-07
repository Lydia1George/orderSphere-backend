import { getUserOrders, getOrderById, createOrder } from './service.js';

import express from "express"

const userOrdersSearchRouter = express.Router()
userOrdersSearchRouter.get('/',async(req,res)=>{
    
        // Validate userId
        const  userId  = req.user.id;
        // Get user orders from service
        const userOrders = await getUserOrders(userId);
    
        res.send(userOrders)
     //check if user id is the expected user id.
    });

// Route to get order by ID
userOrdersSearchRouter.get('/:orderId', async(req, res) => {
    try {
        const orderId = req.params.orderId;
        const userId = req.user.id; // Get current user's ID from the authenticated request

        const order = await getOrderById(orderId, userId);
        
        if (!order) {
            return res.status(404).json({ 
                message: 'Order not found or you are not authorized to view this order' 
            });
        }
        
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to create a new order
userOrdersSearchRouter.post('/', async(req, res) => {
    try {
        const userId = req.user.id; // Get current user's ID from the authenticated request
        const orderData = {
            ...req.body,
            user_Id: userId
        };

        const order_ItemData = req.body.product_id;

        const newOrder = await createOrder(orderData, order_ItemData);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            message: error.message || 'Internal server error' 
        });
    }
});

export{
    userOrdersSearchRouter
}