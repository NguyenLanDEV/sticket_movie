import express from "express"
import { asyncHandler } from "../../utils/util"
import { authenticate } from "../../utils/middleware.util"
import { CastController } from "../../controllers/cast.controller"

export const router = express.Router()

router.post('/', authenticate, asyncHandler(CastController.store))
router.get('/:id', asyncHandler(CastController.show))
router.put("/:id", authenticate, asyncHandler(CastController.put))
router.delete("/:id", authenticate, asyncHandler(CastController.destroy))


