import express from "express"
import { asyncHandler } from "../../utils/util"
import { authenticate } from "../../utils/middleware.util"
import { SeatController } from "../../controllers/seat.controller"
export const router = express.Router()

router.get('/:roomId/seats', asyncHandler(SeatController.index))

router.post('/:roomId/seats', authenticate, asyncHandler(SeatController.store))
router.put("/seats/:id", authenticate, asyncHandler(SeatController.put))
router.delete("/seats/:id", authenticate, asyncHandler(SeatController.destroy))
