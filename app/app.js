import express from "express"
import {brandRouter} from "./brand/controller.js"
const app = express()

app.use(express.json())

app.use('/brands',brandRouter)

app.listen(3000)

