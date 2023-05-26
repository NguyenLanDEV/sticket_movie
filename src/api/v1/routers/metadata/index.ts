import express from "express"
import { asyncHandler } from "../../utils/util"
import { MetadataController } from "../../controllers/metadata.controller"

export const router = express.Router()

router.get('/', asyncHandler(MetadataController.index))


