import { producerCollection } from "../models/producer.model";


export class ProducerService {

    static async getDataByIds(ids: Array<string>): Promise<any> {

    }

    static async getDatas(payload: any): Promise<any> {

    }

    static async getById(id: string) {
        return await producerCollection.findById(id).lean()
    }

    static async create(payload: any): Promise<any> {
        return await producerCollection.create({ ...payload })
    }

    static async deleteById(id: string): Promise<any> {
        let res = await Promise.all([
            producerCollection.deleteOne({ _id: id }),
            // cinemaCollection.deleteMany({clusterId: id})
        ])

        return res[0];
    }

    static async update(id: string, payload: any): Promise<any> {
        return await producerCollection.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                ...payload,
                updatedAt: "$$NOW"
            }
        }, { new: true })
    }
}