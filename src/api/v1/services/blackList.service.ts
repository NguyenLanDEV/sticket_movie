
import { BlackList, blackListModel } from "../models/blackListToken.model"
import { createAuthStrategy } from "../helpers/token.helper"

export default class BlackListService {
    constructor() { }

    static async create(payload: BlackList) {
        const result = await blackListModel.create(payload)
        return result
    }

    static async find(token: string) {
        const foundToken = await blackListModel.findOne({
            token: token
        })

        return foundToken
    }

}