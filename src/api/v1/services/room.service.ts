import { cinemaCollection } from "../models/cinemal.model";
import {  roomCollection } from "../models/room.model";


export class ClusterCinemaService {

    static async getDataByIds(ids: Array<string>): Promise<any> {

    }
    
    static async getDatas(payload: any): Promise<any>{

    }

    static async getById(id: string){
        return await roomCollection.findById(id).lean()
    }

    static async create(createBy: string, payload: any): Promise<any>{
        return await roomCollection.create({...payload, createBy: createBy})
    }

    static async deleteById(id: string): Promise<any> {
        let res = await Promise.all([
            roomCollection.deleteOne({_id: id}),
            // cinemaCollection.deleteMany({clusterId: id})
        ])

        return res[0];
    }

    static async update(id: string, payload: any ): Promise<any> {
        return await roomCollection.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                ...payload,
                updatedAt: "$$NOW"
            }
        },{new: true})
    }
}