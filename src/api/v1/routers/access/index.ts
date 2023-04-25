import express from "express"
import { asyncHandlerHelper as asyncHandler } from "../../utils/asyncHandler.util"
import AccessController from "../../controllers/access.controller"
import { authenticate } from "../../utils/middleware.util"


export const router = express.Router()

router.post("/sign_up", asyncHandler(AccessController.signUp))
router.post("/login", asyncHandler(AccessController.login))

router.use(authenticate)

router.post("/refresh", asyncHandler(AccessController.refreshToken))
router.post("/logout", asyncHandler(AccessController.logOut))
