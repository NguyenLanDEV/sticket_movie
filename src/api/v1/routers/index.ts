import express from "express"
import { router as accessRouter } from "./access/index"
import { router as cinemaRouter } from "./cinema"
import { router as clusterCinemaRouter } from "./clusterCinema"
import { router as room } from "./room"
const router = express.Router()

router.use("/v1/api", accessRouter)
router.use("/v1/api/cinema", cinemaRouter)
router.use("/v1/api/")
router.use("/v1/api/cluster_cinemam", clusterCinemaRouter)
router.use("/v1/api/room", room)
module.exports = router