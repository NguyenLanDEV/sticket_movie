import { Request, Response, NextFunction } from "express"
import { schemaRegisterForm, schemaLoginForm } from "../routers/access/validator"
import AccessService from "../services/access.service"
import { CREATED, OK, ValidationResponse } from "../utils/handleResponse.util"
import { BadRequestError, ConflictRequestError } from "../utils/exception.util"
export default class AccessController {

    static async signUp(req: Request, res: Response, next: NextFunction) {
        const validate = await schemaRegisterForm.validate(req.body, { abortEarly: false })

        if (validate.error) {
            return new ValidationResponse({ message: "Validation errors!", errors: validate.error.details }).send(res)
        }

        const metadata = await AccessService.signUp(req.body)

        new CREATED({
            message: "Sign up success",
            metadata: metadata,
        }).send(res)
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        const validate = await schemaLoginForm.validate(req.body);

        if (validate.error) {
            return new ValidationResponse({ message: "Validation errors!", errors: validate.error.details }).send(res)
        }

        const metadata = await AccessService.login(req.body)

        new OK({
            message: "Login success",
            metadata: metadata
        }).send(res)
    }

    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        const token = req.body.refreshToken

        if (!token) {
            throw new BadRequestError("Required jwt in parameter")
        }
        
        const metadata = await AccessService.refreshToken(token)
        new OK({
            message: "Refresh success",
            metadata: metadata
        }).send(res)

    }

}
