import { NextFunction, Response } from "express";
import { BadRequestError, UnauthorizedRequestError } from "./exception.util";
import {  userModel } from "../models/user.model";
import AccessService from "../services/access.service";
import { TokenPayload } from "./interface.util";
import { blackListModel } from "../models/blackListToken.model";

async function getBlackLists(tokens: Array<string>){
    const foundBlackListToken = await blackListModel.find({
        token:{ "$in": tokens}
    }).lean()

    return foundBlackListToken.length
}

export async function authenticate(req: any, res: Response, next: NextFunction) {
    try {
        const accessToken = req.headers.authorization ?? ''
        const refreshToken = req.headers['x-refresh-token'] ?? ''
        
        if(!accessToken && !refreshToken) {
            throw new UnauthorizedRequestError("required authenticate")
        }

        const lengthFound = await getBlackLists([accessToken, refreshToken])

        if(lengthFound > 0 ){
            throw new BadRequestError("You cant use token in blacklist")
        }

        const payload: TokenPayload = accessToken  ? 
                                        await AccessService.authStrategy.verifyToken(accessToken) :
                                        await AccessService.authStrategy.verifyRefreshToken(refreshToken)
        
        req.user = await userModel.findById({
            _id: payload.userId
        })

        next();
    } catch (error: any) {
        next(error)
    }
}

export function trimExtraSpaces(req: any, res: Response, next: NextFunction) {
    if(req.method == "POST") {
        for (const [key, value] of Object.entries(req.body) ) {
            if (typeof value == "string"){
                req.body[key] = value.replace(/\s+/g, ' ').trim()
            }
        }
    }

    next()
}