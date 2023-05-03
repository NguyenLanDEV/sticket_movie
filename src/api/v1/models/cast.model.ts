import mongoose from "mongoose"

const  COLLECTION_NAME = "casts"

export interface Cast{
    _id: string;
    name: string;
    avatar: string;
    description: string;
    birthDay: Date;
    createBy: string;
}
const castSchema = new mongoose.Schema({
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
    birthDay: {
        type: mongoose.Schema.Types.Date
    },
    createBy: {
        type: mongoose.Types.ObjectId
    }
}, {collection: COLLECTION_NAME, versionKey: false, timestamps: true})

export const castCollection = mongoose.model(COLLECTION_NAME, castSchema)