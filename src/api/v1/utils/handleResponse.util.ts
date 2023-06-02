import { Response } from "express"
import { stat } from "fs";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type {
    AuthType,
    ErrorType
} from "../type/common.type"
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
        type: [
            client-001: error from client
            backend-001: error from backend
        ]
    }
*/
class ErrorResponse extends SuccessResponse{
    public error: AuthType | ErrorType;
    
    constructor({ status = StatusCodes.BAD_REQUEST, message = "", metadata = {} }, error: AuthType | ErrorType) {
        super({message: message, status: status, metadata: metadata})
        this.error = error
    }
}
/*
    @params: {
        errors: Object validation errors
        message: "message from server backend",
    }
*/
class ValidationResponse extends ErrorResponse{
    constructor({ message = ReasonStatusCode.FORBIDDEN, errors = {}, status= StatusCodes.BAD_REQUEST }) {
       super({message: message, metadata: errors, status: status}, 'validation-001')
    }
}

/*
    @params: {
        type: [
            auth-001: user haven't login
            auth-002: token expired
            auth-003: token not valid
        ]
            
    }
*/
class AuthErrorResponse extends ErrorResponse{
    constructor({ message = ReasonStatusCode.FORBIDDEN, metadata = {}, status= StatusCodes.BAD_REQUEST},
                 type: ErrorType | AuthType) {
       super({message: message, metadata: metadata, status: status}, type)
    }
}


export { OK, CREATED , ValidationResponse, AuthErrorResponse, ErrorResponse}


