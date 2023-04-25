'use strict'
import { userCollection } from "../models/user.model";
import { blackListCollection, BlackListModel } from "../models/blackListToken.model"
import * as authenticate from "../helpers/token.helper";
import { BadRequestError, ConflictRequestError, UnauthorizedRequestError } from "../utils/exception.util";
import * as jwtUtil from "../utils/jwt.util";
import { TokenPayload } from "../utils/interface.util";
import BlackListService from "./blackList.service";
require("dotenv").config()

const Role = {
    USER: "USER",
    OWNER: "OWNER",
    BOOKER: "BOOKER",
    MANAGER: 'MANAGER',
    ADMIN: "ADMIN"
}

const authType: string = process.env.AUTH_TYPE || 'jwt'

export default class AccessService {
    static authStrategy = authenticate.createAuthStrategy(authType, {})

    static async signUp(userForm: any) {
        const foundUser = await userCollection.findOne({
            email: userForm.email
        }).lean()

        if (foundUser) {
            throw new ConflictRequestError("email already exists!")
        }

        const userInstance = await userCollection.create({
            ...userForm, roles: [Role.USER]
        })
        const { accessToken, refreshToken } = await AccessService.authStrategy.createTokenPair({ userId: userInstance._id.toString() })

        return {
            user: userInstance,
            accessToken,
            refreshToken
        }
    }

    static async login(loginForm: any) {
        const foundUser = await userCollection.findOne({
            email: loginForm.email
        }).lean()

        if (!foundUser) {
            throw new ConflictRequestError("not found user!")
        }

        const isValidPassword = await AccessService.passwordIsValid(loginForm.password, foundUser.password)

        if (isValidPassword == false) {
            throw new UnauthorizedRequestError("Please check your password!")
        }
        const { accessToken, refreshToken } = await AccessService.authStrategy.createTokenPair({ userId: foundUser._id.toString() })

        return {
            accessToken,
            refreshToken
        }

    }

    static async passwordIsValid(password: string, hashPassword: string): Promise<boolean> {
        const bcrypt = require("bcrypt");
        return await bcrypt.compare(password, hashPassword)
    }

    static async refreshToken(token: string): Promise<any> {
        try {
            const payload: TokenPayload = await AccessService.authStrategy.verifyRefreshToken(token)
            const foundBlackList = await blackListCollection.findOne({
                userId: payload.userId,
                token: token
            }).lean()

            if (foundBlackList) {
                throw new BadRequestError("Token in blacklist: we will tracking you")
            }

            const blackListModel = new BlackListModel(
                payload.userId, 'refreshToken', token, +payload.exp
            )
            BlackListService.create(blackListModel)

            const { accessToken, refreshToken } = await AccessService.authStrategy.createTokenPair({ userId: payload.userId })

            return { accessToken, refreshToken }
        } catch (error: any) {
            jwtUtil.handleError(error)
        }
    }

    static async logOut(accessToken: string, refreshToken: string) {
        await AccessService.authStrategy.verifyRefreshToken(refreshToken)
        const payload: TokenPayload = await AccessService.authStrategy.verifyToken(accessToken)
        const result = await Promise.all([
            BlackListService.create(new BlackListModel(payload.userId, 'refreshToken', refreshToken, +payload.exp)),
            BlackListService.create(new BlackListModel(payload.userId, 'accessToken', accessToken, +payload.exp))
        ])

        return result;
    }

}