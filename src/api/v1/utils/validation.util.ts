import mongoose from "mongoose";

export function checkObjectId(field: string){
    return (value: any, helper: any) => {
        if(mongoose.Types.ObjectId.isValid(value) == false) {
            return helper.message(`${field}: not objectid`)
        }
        
        return value
    }
}