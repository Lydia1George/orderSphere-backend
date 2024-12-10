import express from "express"
import {brandRouter} from "./brand/controller.js"
import { productCategoryRouter } from "./product-category/controller.js";

const app = express()
const port = 3000;

app.use(express.json())

app.use('/brands',brandRouter)
app.use('/productCategories',productCategoryRouter)

app.listen(port)

