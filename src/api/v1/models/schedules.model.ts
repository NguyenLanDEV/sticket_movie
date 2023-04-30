import mongoose, {Schema} from "mongoose"

const  COLLECTION_NAME = "schedules"

const cinemaSchema = new mongoose.Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    roomId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    cinemaId: { 
        type: Schema.Types.ObjectId,
        required: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    startTime: {
        type: Schema.Types.Date,
        required: true,
    },
    endTime: {
        type: Schema.Types.Date
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId
    },
    seats: {
        type: mongoose.Schema.Types.Array,
        default: [Schema.Types.Mixed]
    }
}, {
    versionKey: false, timestamps: true
})

export interface Schedule{
    _id: string;
    movieId: string;
    roomId: string;
    cinemaId: string;
    price: number;
    startTime: Date;
    endTime: Date;
    createBy: string;
    seats: Array<any>
}

export const scheduleCollection = mongoose.model(COLLECTION_NAME, cinemaSchema)