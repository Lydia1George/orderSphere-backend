import express from "express"
import { brandRouter } from "./brand/controller.js"
import { productCategoryRouter } from "./product-category/controller.js";
import { productsRouter } from "./product/controller.js";
import { productSearchRouter } from "./product-search/controller.js";
import { userRouter } from "./user/controller.js";
import { userOrdersSearchRouter } from "./order/controller.js";
import jwt from 'jsonwebtoken'; 

const app = express()
const port = 3000;

app.use(express.json())

app.use((req, res, next) => {
    console.log("Req path",req.path)
    if (req.path == '/users/login' || req.path == '/users/register') {
        next()
        return 
    }
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Authentication required. Please provide a Bearer token.'
            });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Token expired' });
                }
                return res.status(403).json({ error: 'Invalid token' });
            }

            req.user = decoded;
            next();
        });
    } catch (err) {
        console.error('Authentication error:', err);
        res.status(500).json({ error: 'Internal authentication error' });
    }
    
})
app.use('/brands', brandRouter)
app.use('/productCategories', productCategoryRouter)
app.use('/products', productsRouter)
app.use('/productSearch', productSearchRouter)
app.use('/users/', userRouter)
app.use('/orders', userOrdersSearchRouter)



app.listen(port)


