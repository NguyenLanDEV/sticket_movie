
import {BlackListModel, blackListCollection} from "../models/blackListToken.model"
import {createAuthStrategy}   from "../helpers/token.helper"

export default class BlackListService {
    constructor() { }

    static async create(payload: BlackListModel){
        const result = await blackListCollection.create(payload)
        return result
    }

    static async find(token: string) {
        const foundToken = await blackListCollection.findOne({
            token: token
        })

        return foundToken
    }

}