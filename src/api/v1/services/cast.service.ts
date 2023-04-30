import { castCollection } from "../models/cast.model";


export class CastService {

    static async getDataByIds(ids: Array<string>): Promise<any> {

    }

    static async getDatas(payload: any): Promise<any> {

    }

    static async getById(id: string) {
        return await castCollection.findById(id).lean()
    }

    static async create(payload: any): Promise<any> {
        return await castCollection.create({ ...payload })
    }

    static async deleteById(id: string): Promise<any> {
        let res = await Promise.all([
            castCollection.deleteOne({ _id: id }),
            // cinemaCollection.deleteMany({clusterId: id})
        ])

        return res[0];
    }

    static async update(id: string, payload: any): Promise<any> {
        return await castCollection.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                ...payload,
                updatedAt: "$$NOW"
            }
        }, { new: true })
    }
}