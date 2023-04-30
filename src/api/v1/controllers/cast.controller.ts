import { Request, Response, NextFunction } from "express"
import { CREATED, OK, ValidationResponse } from "../utils/handleResponse.util"
import { CastService } from "../services/cast.service"
import * as validation from "../routers/schedule/validator"
import { RequestTemporary } from "../utils/interface.util"
import { BadRequestError, NotFoundRequestError } from "../utils/exception.util"
import mongoose from "mongoose"

export class CastController {

    static async store(req: RequestTemporary, res: Response, next: NextFunction) {
        const validate = await validation.schemaCreateForm.validate({...req.body}, { abortEarly: false })

        if (validate.error) {
            return new ValidationResponse({ message: "Validation errors!", errors: validate.error.details }).send(res)
        }
        const metadata = await CastService.create(validate.value)

        new CREATED({
            message: "create schedule success",
            metadata: metadata
        }).send(res);
    }

    static async index(req: Request, res: Response, next: NextFunction) {
        let metadata = await CastService.getDatas(req)

        new OK({
            message: "success",
            metadata: metadata
        }).send(res);
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const metadata = await CastService.getById(id)

        if (!metadata) {
            throw new NotFoundRequestError()
        }

        new OK({
            message: "success",
            metadata: metadata
        }).send(res);
    }

    static async put(req: Request, res: Response, next: NextFunction) {
        const validate = await validation.schemaUpdateForm.validate(req.body, { abortEarly: false })

        if (validate.error) {
            return new ValidationResponse({ message: "Validation errors!", errors: validate.error.details }).send(res)
        }
        const id = req.params.id

        if (mongoose.Types.ObjectId.isValid(id) == false) {
            throw new BadRequestError("id not valid")
        }

        const foundSchedule= await CastService.getById(id)

        if (!foundSchedule) {
            throw new NotFoundRequestError()
        }

        const metadata = await CastService.update(id, req.body)
        new OK({
            message: "success",
            metadata: metadata
        }).send(res);
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        if (mongoose.Types.ObjectId.isValid(id) == false) {
            throw new BadRequestError("id not valid")
        }
        const foundSchedule = await CastService.getById(id)

        if (!foundSchedule) {
            throw new NotFoundRequestError()
        }

        const metadata = await CastService.deleteById(id)

        new OK({
            message: "Delete success",
            metadata: metadata
        }).send(res);
    }



}