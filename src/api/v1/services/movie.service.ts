import { Types } from "mongoose";
import { movieCollection } from "../models/movie.model";
import type {MovieQueryType} from "../type/movie.type"

export class MovieService {

    static async getDataByIds(ids: Array<string>): Promise<any> {

    }

    static async getDatas(payload: any): Promise<any> {
        let {name} = payload
        let {limit=15, skip=0} = payload
        let queries: MovieQueryType = {}
        
        if(name){
            queries.name = `/${name}/`
        }

        return await movieCollection.find( queries ).limit(limit).skip(skip).lean()
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