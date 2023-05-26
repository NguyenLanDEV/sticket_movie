import { NextFunction, Request, Response } from "express";
import {MetadataService} from "../services/metadata.service"
import {OK} from "../utils/handleResponse.util"

export class MetadataController {
    static async index(req: Request, res: Response, next: NextFunction) {
        let metadata = await MetadataService.get()

        new OK({
            message: "Success",
            metadata: metadata
        }).send(res);
    }
}