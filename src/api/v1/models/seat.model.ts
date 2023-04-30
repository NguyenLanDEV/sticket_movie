import mongoose, { Schema } from "mongoose"
import * as Const from "../utils/const.util"
const COLLECTION_NAME = "seats"

type TypeSeats = "standard" | "couple" | "bed" | "sweet_box"

export interface Seat {
    _id: string;
    roomId: string;
    type: TypeSeats;
    row: Number;
    seatNumber: string;
    isAvailable: string;
}

const seatSchema = new mongoose.Schema({
    roomId: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    type: {
        type: String,
        enum: Const.TypeSeat,
    },

    row: {
        type: Number,
        min: 0,
        default: 0
    },

    seatNumber: {
        type: Number,
        min: 0,
        default: 0
    },

    isAvailable: {
        type: Schema.Types.Boolean,
        default: true
    }
}, { collection: COLLECTION_NAME, versionKey: false })

export const seatCollection = mongoose.model(COLLECTION_NAME, seatSchema)