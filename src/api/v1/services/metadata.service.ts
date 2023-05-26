import  SuccessResponse  from "../utils/handleResponse.util"
import { ProducerService } from "./producer.service"
export class MetadataService {
    static async get(): Promise<any> {
        const result = await Promise.all([
            ProducerService.getAll(),
            [],
            []
        ])
        
        const metadata = {
            producers: result[0],
            directors: result[1],
            casts: result[2]
        }

        return metadata
    }

}