import mongoose from "mongoose"

const  COLLECTION_NAME = "producers"

export interface Producer{
    _id: string;
    name: string;
    avatar: string;
    description: string;
    createBy: string;
}
const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    description: {
        type: String
    },
    createBy: {
        type: mongoose.Types.ObjectId
    }
}, {collection: COLLECTION_NAME, versionKey: false, timestamps: true})

export const producerCollection = mongoose.model(COLLECTION_NAME, producerSchema)