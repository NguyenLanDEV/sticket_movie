import express from "express"
import { asyncHandler } from "../../utils/util"
import { ClusterCinemaController } from "../../controllers/clusterCinema.controller"
import { authenticate } from "../../utils/middleware.util"

export const router = express.Router()

// router.get("/index")
router.post('/', authenticate, asyncHandler(ClusterCinemaController.store))
router.get('/:id', asyncHandler(ClusterCinemaController.show))
router.put("/:id", authenticate, asyncHandler(ClusterCinemaController.put))
router.delete("/:id", authenticate, asyncHandler(ClusterCinemaController.destroy))


