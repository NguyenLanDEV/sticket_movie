import express from "express"
import { asyncHandler } from "../../utils/util"
import { CinemaController } from "../../controllers/cinema.controller"
import { authenticate } from "../../utils/middleware.util"
export const router = express.Router()

// router.get("/index")
router.post('/', authenticate, asyncHandler(CinemaController.store))
router.get('/:id', asyncHandler(CinemaController.show))
router.put("/:id", authenticate, asyncHandler(CinemaController.put))
router.delete("/:id", authenticate, asyncHandler(CinemaController.destroy))

