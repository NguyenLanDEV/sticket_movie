import { Types } from "mongoose";
import { movieCollection } from "../models/movie.model";


export class MovieService {

    static async getDataByIds(ids: Array<string>): Promise<any> {

    }

    static async getDatas(payload: any): Promise<any> {

    }

    static async getById(id: string) {
        return await movieCollection.findById(id).lean()
    }

    static async create(payload: any): Promise<any> {
        return await movieCollection.create({ ...payload })
    }

    static async deleteById(id: string): Promise<any> {
        return await movieCollection.deleteOne({
            _id: new Types.ObjectId(id)
        })
    }

    static async update(id: string, payload: any): Promise<any> {
        return await movieCollection.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                ...payload,
                updatedAt: "$$NOW"
            }
        }, { new: true })
    }
}