import express from "express"
import {brandRouter} from "./brand/controller.js"
import { productCategoryRouter } from "./product-category/controller.js";
import { productsRouter} from "./product/controller.js";
import { productSearchRouter } from "./product-search/controller.js";
import { userRouter } from "./user/controller.js";
import { userOrdersSearchRouter } from "./order/controller.js";

const app = express()
const port = 3000;

app.use(express.json())

app.use('/brands',brandRouter)
app.use('/productCategories',productCategoryRouter)
app.use('/products',productsRouter)
app.use('/productSearch',productSearchRouter)
app.use('/users/',userRouter)
app.use('/user/orders',userOrdersSearchRouter)

app.listen(port)

