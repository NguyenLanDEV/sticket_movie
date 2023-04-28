import mongoose from "mongoose"

const  COLLECTION_NAME = "clusterCinemas"

export interface ClusterCinemas{
    _id: string;
    name: string;
    image: string;
    email: string;
    createBy: string;
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
    },
    createBy: {
        type: mongoose.Types.ObjectId
    }
}, {collection: COLLECTION_NAME, versionKey: false, timestamps: true})

export const clusterCinemaCollection = mongoose.model(COLLECTION_NAME, clusterSchema)