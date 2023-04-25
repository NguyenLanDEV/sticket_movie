import { NextFunction, Response } from "express";
import { BadRequestError, UnauthorizedRequestError } from "./exception.util";
import {  userCollection } from "../models/user.model";
import AccessService from "../services/access.service";
import { TokenPayload } from "./interface.util";
import { handleError } from "./jwt.util";
import { blackListCollection } from "../models/blackListToken.model";

export async function authenticate(req: any, res: Response, next: NextFunction) {
    try {
        const accessToken = req.headers.authorization ?? ''
        const refreshToken = req.headers['x-refresh-token'] ?? ''
        
        if(!accessToken && !refreshToken) {
            throw new BadRequestError("required authenticate")
        }
        const foundBlackListToken = await blackListCollection.find({
            token:{ "$in": [accessToken, refreshToken]}
        }).lean()

        if(foundBlackListToken.length > 0 ){
            throw new BadRequestError("MW:::You cant use token in blacklist")
        }

        const payload: TokenPayload = accessToken  ? 
                                        await AccessService.authStrategy.verifyToken(accessToken) :
                                        await AccessService.authStrategy.verifyRefreshToken(refreshToken)
        
        req.user = await userCollection.findById({
            _id: payload.userId
        })

        next()
    } catch (error: any) {
        next(error)
    }
}