import { Request, Response, NextFunction } from "express"
import  { CREATED, OK, ValidationResponse } from "../utils/handleResponse.util"
import { CinemaService } from "../services/cinema.service"
import * as validation from "../routers/cinema/validator"
import { RequestTemporary } from "../utils/interface.util"
import { BadRequestError, NotFoundRequestError } from "../utils/exception.util"
import mongoose from "mongoose"

export class CinemaController {

    static async store(req: RequestTemporary, res: Response, next: NextFunction) {
        const validate = await validation.schemaCreateForm.validate(req.body, {abortEarly: false})
        const user = req.user
        if (validate.error) {
            return new ValidationResponse({ message: "Validation errors!", errors: validate.error.details }).send(res)
        }
        const metadata = await CinemaService.create(user._id, validate.value)

        new CREATED({
            message: "create cinema success",
            metadata: metadata
        }).send(res);
    }

    static async index(req: Request, res: Response, next: NextFunction) {
        let payload = req.query
        let metadata = await CinemaService.getDatas(payload)

        new OK({
            message: "success",
            metadata: metadata
        }).send(res);
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const metadata = await CinemaService.getById(id)
        
        if(!metadata) {
            throw new NotFoundRequestError()
        }

        new OK({
            message: "success",
            metadata: metadata
        }).send(res);
    }

    static async put(req: Request, res: Response, next: NextFunction) {
        const validate = await validation.schemaUpdateForm.validate(req.body, {abortEarly: false})

        if (validate.error) {
            return new ValidationResponse({ message: "Validation errors!", errors: validate.error.details }).send(res)
        }
        const id = req.params.id

        if(mongoose.Types.ObjectId.isValid(id) == false){
            throw new BadRequestError("id not valid")
        }

        const foundCinema = await CinemaService.getById(id)

        if(!foundCinema) {
            throw new NotFoundRequestError()
        }

        const metadata = await CinemaService.update(id, req.body)
        new OK({
            message: "success",
            metadata: metadata
        }).send(res);
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        if(mongoose.Types.ObjectId.isValid(id) == false){
            throw new BadRequestError("id not valid")
        }
        const foundCinema = await CinemaService.getById(id)

        if(!foundCinema) {
            throw new NotFoundRequestError()
        }

        const metadata = await CinemaService.deleteById(id)

        new OK({
            message: "Delete success",
            metadata: metadata
        }).send(res);
    }



}