import express from "express"
import { asyncHandler } from "../../utils/util"
import { authenticate } from "../../utils/middleware.util"
import { ScheduleController } from "../../controllers/schedule.controller"

export const router = express.Router()

router.post('/', authenticate, asyncHandler(ScheduleController.store))
router.get('/:id', asyncHandler(ScheduleController.show))
router.put("/:id", authenticate, asyncHandler(ScheduleController.put))
router.delete("/:id", authenticate, asyncHandler(ScheduleController.destroy))


