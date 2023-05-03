import { cinemaCollection } from "../models/cinemal.model";



export class CinemaService {

    static async getDataByIds(ids: Array<string>): Promise<any> {

    }
    
    static async getDatas(payload: any): Promise<any>{

    }

    static async getById(id: string){
        return await cinemaCollection.findById(id).lean()
    }

    static async create(createBy: string, payload: any): Promise<any>{
        return await cinemaCollection.create({...payload, createBy: createBy})
    }

    static async deleteById(id: string): Promise<any> {
        const res = await cinemaCollection.deleteOne({
            _id: id
        })

        return res;
    }

    static async update(id: string, payload: any ): Promise<any> {
        return await cinemaCollection.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                ...payload,
                updatedAt: "$$NOW"
            }
        },{new: true})
    }
}