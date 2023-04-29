import { Request, Response, NextFunction } from "express"
import { CREATED, OK, ValidationResponse } from "../utils/handleResponse.util"
import { MovieService } from "../services/movie.service"
import * as validation from "../routers/movie/validator"
import { RequestTemporary } from "../utils/interface.util"
import { NotFoundRequestError } from "../utils/exception.util"

export class MovieController {

    static async store(req: RequestTemporary, res: Response, next: NextFunction) {
        const validate = await validation.schemaCreateForm.validate(req.body, { abortEarly: false })
        const user = req.user
        if (validate.error) {
            return new ValidationResponse({ message: "Validation errors!", errors: validate.error.details }).send(res)
        }
        const payload = {
            createBy: user._id,
            ...validate.value
        }
        const metadata = await MovieService.create(payload)

        new CREATED({
            message: "Create movie success",
            metadata: metadata
        }).send(res);
    }

    static async index(req: Request, res: Response, next: NextFunction) {
        let payload = req.query
        let metadata = await MovieService.getDatas(payload)

        new OK({
            message: "Success",
            metadata: metadata
        }).send(res);
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const metadata = await MovieService.getById(id)

        if (!metadata) {
            throw new NotFoundRequestError()
        }

        new OK({
            message: "Success",
            metadata: metadata
        }).send(res);
    }

    static async put(req: Request, res: Response, next: NextFunction) {
        const validate = await validation.schemaUpdateForm.validate(req.body, { abortEarly: false })

        if (validate.error) {
            return new ValidationResponse({ message: "Validation errors!", errors: validate.error.details }).send(res)
        }
        const id = req.params.id

        const foundCinema = await MovieService.getById(id)

        if (!foundCinema) {
            throw new NotFoundRequestError()
        }

        const metadata = await MovieService.update(id, req.body)
        new OK({
            message: "Success",
            metadata: metadata
        }).send(res);
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

        const foundCinema = await MovieService.getById(id)

        if (!foundCinema) {
            throw new NotFoundRequestError()
        }

        const metadata = await MovieService.deleteById(id)

        new OK({
            message: "Delete success",
            metadata: metadata
        }).send(res);
    }



}