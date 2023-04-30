import { scheduleCollection } from "../models/schedules.model";


export class ScheduleService {

    static async getDataByIds(ids: Array<string>): Promise<any> {

    }

    static async getDatas(payload: any): Promise<any> {

    }

    static async getById(id: string) {
        return await scheduleCollection.findById(id).lean()
    }

    static async create(payload: any): Promise<any> {
        return await scheduleCollection.create({ ...payload })
    }

    static async deleteById(id: string): Promise<any> {
        let res = await Promise.all([
            scheduleCollection.deleteOne({ _id: id }),
            // cinemaCollection.deleteMany({clusterId: id})
        ])

        return res[0];
    }

    static async update(id: string, payload: any): Promise<any> {
        return await scheduleCollection.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                ...payload,
                updatedAt: "$$NOW"
            }
        }, { new: true })
    }
}