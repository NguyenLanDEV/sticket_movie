import mongoose from "mongoose";
const COLLETION_NAME = "blacklists"

var blackListSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    refreshToken: mongoose.Schema.Types.String
}, { versionKey: false });


export const blackListModel = mongoose.model(COLLETION_NAME, blackListSchema);