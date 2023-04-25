import express from "express"
import { asyncHandlerHelper as asyncHandler } from "../../utils/asyncHandler.util"
import AccessController from "../../controllers/access.controller"


export const router = express.Router()

router.post("/sign_up", asyncHandler(AccessController.signUp))
router.post("/login", asyncHandler(AccessController.login))
router.post("/refresh", asyncHandler(AccessController.refreshToken))
