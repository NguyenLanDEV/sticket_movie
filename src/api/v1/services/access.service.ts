'use strict'
import { shopModel } from "../models/user.model";
import { blackListModel } from "../models/blackListToken.model"
import * as authenticate from "../helpers/token.helper";
import { BadRequestError, ConflictRequestError, UnauthorizedRequestError } from "../utils/exception.util";
import * as jwtUtil from "../utils/jwt.util";

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN"
}

interface DefinePayload {
    userId: string;
    exp: string;
    iat: string;
}

export default class AccessService {
    static authStrategy = authenticate.createAuthStrategy('jwt', {})

    static async signUp(userForm: any) {
        const foundUser = await shopModel.findOne({
            email: userForm.email
        }).lean()

        if (foundUser) {
            throw new ConflictRequestError("email already exists!")
        }

        const shopInstance = await shopModel.create({
            ...userForm, roles: [RoleShop.SHOP]
        })
        const { accessToken, refreshToken } = await AccessService.authStrategy.createTokenPair({ userId: shopInstance._id.toString() })

        return {
            shop: shopInstance,
            accessToken,
            refreshToken
        }
    }

    static async login(loginForm: any) {
        const foundUser = await shopModel.findOne({
            email: loginForm.email
        }).lean()

        if (!foundUser) {
            throw new ConflictRequestError("Email has register!")
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
            const payload: DefinePayload = await AccessService.authStrategy.verifyToken(token, { signRefresh: true })
            const foundBlackList = await blackListModel.findOne({
                userId: payload.userId,
                refreshToken: token
            }).lean()

            if (foundBlackList) {
                throw new BadRequestError("Token can't be used: we will tracking you")
            }

            blackListModel.create({
                userId: payload.userId,
                refreshToken: token
            })

            const { accessToken, refreshToken } = await AccessService.authStrategy.createTokenPair({ userId: payload.userId })

            return { accessToken, refreshToken }
        } catch (error) {
            jwtUtil.handleError(error)
        }

    }

}