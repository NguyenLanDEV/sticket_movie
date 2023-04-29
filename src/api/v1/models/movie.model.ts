import mongoose, {Schema} from "mongoose";

const COLLECTION_NAME = "movies"

export interface Movie {
    _id?: String;
    name: String;
    image: String;
    description: String;
    casts: Array<Schema.Types.ObjectId>;
    director: Array<Schema.Types.ObjectId>;
    producer: Array<Schema.Types.ObjectId>;
    age: Number;
    releaseTime: Date
}
export const movieSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        require: true
    },
    image: {
        type: Schema.Types.String,
    },
    description: {
        type: Schema.Types.String,
        require: true
    },
    casts: [{type: Schema.Types.ObjectId}],
    directors: [{type: Schema.Types.ObjectId}],
    producers: [{type: Schema.Types.ObjectId}],
    age: {
        type: Schema.Types.Number,
        require: true,
        min: 6,
        default: 10
    },
    duration: {
        type: Number,
        require: true,
        default: 1,
        min: 1
    },
    releaseTime: {
        type: Schema.Types.Date,
        require: true
    }

    
}, { versionKey: false, timestamps: true })

export const movieCollection = mongoose.model(COLLECTION_NAME, movieSchema)