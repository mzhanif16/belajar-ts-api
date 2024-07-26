import express from "express"
import {router} from "../route/public-api";
import {errorMiddleware} from "../middleware/error-middleware";
import {apiRouter} from "../route/private-api";

export const web= express()
web.use(express.json())
web.use(router)
web.use(apiRouter)
web.use(errorMiddleware)