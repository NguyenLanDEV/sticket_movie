import express from "express"
import {router as accessRouter} from "./access/index"
const router = express.Router()

router.use("/v1/api", accessRouter)

module.exports = router