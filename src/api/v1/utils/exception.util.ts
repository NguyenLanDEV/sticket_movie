import { StatusCodes, ReasonPhrases } from "http-status-codes";

const ReasonStatusCode = {
    FORBIDDEN: "Not authenticate",
    BAD_REQUEST: "Bad request error",
    CONFLICT: "Conflict error",
    NOT_FOUND: "Not found data exception",
    UNAUTHORIZED: "Unauthorized!"
}

class ErrorResponse extends Error {
    public status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {

    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCodes.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {

    constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST) {
        super(message, statusCode)
    }
}

class UnauthorizedRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

class ForbiddenRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message, statusCode)
    }
}

class NotFoundRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
        super(message, statusCode)
    }
} 
export { ConflictRequestError, BadRequestError, UnauthorizedRequestError, ForbiddenRequestError, NotFoundRequestError }