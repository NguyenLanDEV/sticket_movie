import mongoose from "mongoose"

const  COLLECTION_NAME = "clusterCinemas"

export interface ClusterCinemas{
    _id: string;
    name: string;
    image: string;
    email: string;
}
const clusterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    email: {
        type: String
    }
}, {collection: COLLECTION_NAME})

export const clusterCinemaCollection = mongoose.model(COLLECTION_NAME, clusterSchema)