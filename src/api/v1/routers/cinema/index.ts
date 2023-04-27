import express from "express"
import { asyncHandlerHelper as asyncHandler } from "../../utils/asyncHandler.util"
import { CinemaController } from "../../controllers/cinema.controller"
import { authenticate } from "../../utils/middleware.util"

export const router = express.Router()

// router.get("/index")
router.post('/', authenticate, asyncHandler(CinemaController.store))
router.get('/:id', asyncHandler(CinemaController.show))
router.put("/:id", asyncHandler(CinemaController.put))

