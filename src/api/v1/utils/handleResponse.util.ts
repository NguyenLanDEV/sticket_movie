import { Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const ReasonStatusCode = {
    OK: "Success",
    CREATED: "Created!",
    FORBIDDEN: "Forbidden!"
}

export default class SuccessResponse {
    public message: string ;
    public status: number;
    public metadata: object;

    constructor({ status = StatusCodes.OK, message = "", metadata = {} }) {
        this.status = status
        this.message = message,
            this.metadata = metadata
    }

    public send(res: Response, headers = {}) {
        return res.status(this.status).json(this)
    }

}

class OK extends SuccessResponse {
    constructor({ message = ReasonStatusCode.OK, metadata = {} }) {
        super({ message, metadata })
    }
}

class CREATED extends SuccessResponse {
    constructor({ message = ReasonStatusCode.CREATED , metadata = {}, status = StatusCodes.CREATED }) {
        super({ message, metadata, status })
    }
}

/*
    @params: {
        errors: Object validation errors
        message: "message from server backend",
    }
*/
class ValidationResponse {
    public message: string;
    public errors: object; //object validation  errors
    public status: number = StatusCodes.BAD_REQUEST

    constructor({ message = ReasonStatusCode.FORBIDDEN, errors = {} }) {
        this.message = message,
        this.errors = errors
    }

    public send(res: Response) {
        return res.status(this.status).json(this)
    }
}


export { OK, CREATED , ValidationResponse}


