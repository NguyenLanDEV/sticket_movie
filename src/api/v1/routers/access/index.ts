import express from "express"
import { asyncHandler  } from "../../utils/util"
import AccessController from "../../controllers/access.controller"
import { authenticate } from "../../utils/middleware.util"


export const router = express.Router()

router.post("/sign_up", asyncHandler(AccessController.signUp))
router.post("/login", asyncHandler(AccessController.login))


router.post("/refresh", authenticate, asyncHandler(AccessController.refreshToken))
router.post("/logout", authenticate, asyncHandler(AccessController.logOut))
