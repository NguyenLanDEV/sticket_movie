import * as JWT from "jsonwebtoken"
import { BadRequestError, ConflictRequestError, UnauthorizedRequestError } from "./exception.util";

export function handleError(error: JWT.JsonWebTokenError) {
    switch (error.name) {
        case "TokenExpiredError":
            throw new UnauthorizedRequestError("token is expired")
        case "JsonWebTokenError":
            throw new BadRequestError(error.message)
    
        default:
            throw error
    }
}