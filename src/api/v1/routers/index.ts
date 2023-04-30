import express from "express"
import { router as accessRouter } from "./access/index"
import { router as cinemaRouter } from "./cinema"
import { router as clusterCinemaRouter } from "./clusterCinema"
import { router as roomRouter } from "./room"
import { router as seatRouter } from "./seat"
import { router as movieRouter } from "./movie"
import { router as scheduleRouter } from "./schedule"
const router = express.Router()

router.use("/v1/api", accessRouter)
router.use("/v1/api/cinema", cinemaRouter)
router.use("/v1/api/cluster_cinema", clusterCinemaRouter)
router.use("/v1/api/room", roomRouter)
router.use("/v1/api/room", seatRouter)
router.use("/v1/api/movie", movieRouter)
router.use("/v1/api/schedule", scheduleRouter)

module.exports = router