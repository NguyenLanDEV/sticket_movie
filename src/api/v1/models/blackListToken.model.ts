import mongoose from "mongoose";
const COLLECTION_NAME = "blacklists"

var blackListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    type: {
        type: mongoose.Schema.Types.String,
        enum: ['accessToken', 'refreshToken'],
        default: 'accessToken'
    },
    token: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
        require: true
    }
}, { versionKey: false, timestamps: true });

type TokenTypes = 'accessToken'|'refreshToken';

export interface BlackList {
    _id?: string;
    userId: string;
    type: TokenTypes ;
    token: string;
    expiresAt: Date;
}


export const blackListModel = mongoose.model(COLLECTION_NAME, blackListSchema);