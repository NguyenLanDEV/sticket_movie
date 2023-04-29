import * as _ from "lodash"
import mongoose from "mongoose";


export function hasProperties(obj: any, keys: Array<any>) {
    const length = keys.length
    const object = _.pick(obj, keys)
    
    return _.size(object) == length ? true : false 
}


export function checkObjectId(field: string){
    return (value: any, helper: any) => {
        if(mongoose.Types.ObjectId.isValid(value) == false) {
            return helper.message(`${field}: not objectid`)
        }
        
        return value
    }
}

import { NextFunction, Request, Response } from "express"

export function asyncHandler(fn: Function){
   return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((err: any )=> next(err))
   }
}

