import mongoose from "mongoose";
const COLLETION_NAME = "Shops"
import * as bcrypt from "bcrypt"
var shopSchema = new mongoose.Schema({
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
}, { versionKey: false });

shopSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
        
    } catch (error: any) {
        next(error)
    }
})
export const shopModel = mongoose.model(COLLETION_NAME, shopSchema);