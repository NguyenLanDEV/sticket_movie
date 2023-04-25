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
}, { versionKey: false });

type TokenTypes = 'accessToken'|'refreshToken';

export class BlackListModel {
    userId: string;
    type: TokenTypes = 'accessToken';
    token: string;
    expiresAt: Date;

    constructor(userId: string, type: TokenTypes, token: string, expiresAt: number) {
        this.userId = userId;
        this.type = type;
        this.token = token;
        this.expiresAt = new Date(expiresAt * 1000);
    }

}
export const blackListCollection = mongoose.model(COLLECTION_NAME, blackListSchema);