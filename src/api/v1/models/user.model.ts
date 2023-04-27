import mongoose from "mongoose";
const COLLECTION_NAME = "users"
import * as bcrypt from "bcrypt"
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    roles: {
        type: Array,
        default: []
    }
}, { versionKey: false, timestamps: true });

userSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
        
    } catch (error: any) {
        next(error)
    }
})

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    status: string;
    roles: Array<any>;
}

export const userModel = mongoose.model(COLLECTION_NAME, userSchema);
