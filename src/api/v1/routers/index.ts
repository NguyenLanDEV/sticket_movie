import express from "express"
import {router as accessRouter} from "./access/index"
import {router as cinemaRouter } from "./cinema"
const router = express.Router()

router.use("/v1/api", accessRouter)
router.use("/v1/api/cinema", cinemaRouter)

module.exports = router