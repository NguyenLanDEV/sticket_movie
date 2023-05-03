import express from "express"
import { asyncHandler } from "../../utils/util"
import { authenticate } from "../../utils/middleware.util"
import { ProducerController } from "../../controllers/producer.controller"

export const router = express.Router()

router.post('/', authenticate, asyncHandler(ProducerController.store))
router.get('/:id', asyncHandler(ProducerController.show))
router.put("/:id", authenticate, asyncHandler(ProducerController.put))
router.delete("/:id", authenticate, asyncHandler(ProducerController.destroy))


