import mongoose, { Schema } from "mongoose";
import { ICounter } from "../types/common.types.js";



const counterSchema = new Schema<ICounter>({
    modelName: {
        type: String,
        required: true,
        unique: true
    },
    seq: {
        type: Number,
        default: 0
    }
});

export const Counter = mongoose.model<ICounter>("Counter", counterSchema);
