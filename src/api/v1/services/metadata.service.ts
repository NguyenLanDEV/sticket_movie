import  SuccessResponse  from "../utils/handleResponse.util"
import { ProducerService } from "./producer.service"
import { cityCollection } from "../models/city.model"
import { clusterCinemaCollection } from "../models/clusterCinema.model"
export class MetadataService {
    static async get(): Promise<any> {
        const [
            producers,
            directors,
            casts,
            cities,
            clusterCinemas
         ] = await Promise.all([
            ProducerService.getAll(),
            [],
            [],
            cityCollection.find({},{_id: 1, name: 1}),
            clusterCinemaCollection.find({}, {_id: 1, name: 1})
        ])

        const metadata = {
            producers,
            directors,
            casts,
            cities,
            clusterCinemas
        }

        return metadata
    }

}