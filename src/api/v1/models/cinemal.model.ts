import mongoose from "mongoose"

const  COLLECTION_NAME = "cinemas"

export interface ClusterCinemas{
    _id: string;
    name: string;
}
const clusterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
})

export const clusterCinemaCollection = mongoose.model("clusterCinemas", clusterSchema)


const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    phone: { 
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId
    },
    clusterId: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: false, timestamps: true
})
export interface CinemaModel{
    _id: string;
    name: string;
    avatar: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    createBy:string;
    clusterId: string;
}
export const cinemaCollection = mongoose.model(COLLECTION_NAME, cinemaSchema)