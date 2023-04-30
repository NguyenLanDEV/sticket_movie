import mongoose from "mongoose"

const  COLLECTION_NAME = "cinemas"

const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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

export interface Cinema{
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    createBy:string;
    clusterId: string;
}
export const cinemaCollection = mongoose.model(COLLECTION_NAME, cinemaSchema)