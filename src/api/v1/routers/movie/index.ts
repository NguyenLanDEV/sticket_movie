import express from "express"
import { asyncHandler } from "../../utils/util"
import { authenticate } from "../../utils/middleware.util"
import { MovieController } from "../../controllers/movie.controller"

export const router = express.Router()

router.post('/', authenticate, asyncHandler(MovieController.store))
router.get('/:id', asyncHandler(MovieController.show))
router.put("/:id", authenticate, asyncHandler(MovieController.put))
router.delete("/:id", authenticate, asyncHandler(MovieController.destroy))


