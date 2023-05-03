import {  seatCollection } from "../models/seat.model";
import { Request } from "express"

export class SeatService {

    static async getDataByIds(ids: Array<string>): Promise<any> {

    }

    static async getDatas(req: Request): Promise<any> {
        let roomId = req.params.roomId;
        let {skip=0, limit=15} = req.query

        let filter: any = {}
        
        if (roomId) {
            filter['roomId'] = req.params.roomId
        }
      
        const metadata = await seatCollection.find(filter).skip(+skip ?? 0 ).limit(+limit ?? 15).lean()
        return metadata
    }

    static async getById(id: string) {
        return await seatCollection.findById(id).lean()
    }

    static async create(payload: any): Promise<any> {
        return await seatCollection.create(payload)
    }

    static async deleteById(id: string): Promise<any> {
        let res = await Promise.all([
            seatCollection.deleteOne({ _id: id }),
            // cinemaCollection.deleteMany({clusterId: id})
        ])

        return res[0];
    }

    static async update(id: string, payload: any): Promise<any> {
        return await seatCollection.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                ...payload,
                updatedAt: "$$NOW"
            }
        }, { new: true })
    }
}