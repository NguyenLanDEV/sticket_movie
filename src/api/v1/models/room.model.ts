import mongoose from "mongoose"

const  COLLECTION_NAME = "rooms"

export interface Room{
    _id: string;
    cinemaId: string;
    name: string;
    seats: Number;
    createBy: string;
}
const roomSchema = new mongoose.Schema({
    cinemaId: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    seats: {
        type: Number
    },
    createBy: {
        type: mongoose.Types.ObjectId
    }
}, {collection: COLLECTION_NAME, versionKey: false})

export const roomCollection = mongoose.model(COLLECTION_NAME, roomSchema)