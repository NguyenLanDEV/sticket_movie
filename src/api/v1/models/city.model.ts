import mongoose from "mongoose"

const  COLLECTION_NAME = "cities"

export interface Cities{
    name: string;
    districts: Array<any>
}
const citySchema = new mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    districts: {
        type: Array
    },
}, {collection: COLLECTION_NAME, versionKey: false, timestamps: true})

export const cityCollection = mongoose.model(COLLECTION_NAME, citySchema)