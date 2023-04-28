import mongoose from "mongoose"

const  COLLECTION_NAME = "rooms"

export interface ClusterCinemas{
    _id: string;
    cinemaId: string;
    name: string;
    seats: Number;
}
const clusterSchema = new mongoose.Schema({
    cinemaId: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    seats: {
        type: Number
    }
}, {collection: COLLECTION_NAME, versionKey: false})

export const clusterCinemaCollection = mongoose.model(COLLECTION_NAME, clusterSchema)