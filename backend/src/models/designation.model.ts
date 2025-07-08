import mongoose, {Model, Schema} from "mongoose";

import { IDesignation } from "../types/designation.types.js";

const designationSchema = new Schema<IDesignation>({
    designationName: {
        type: String,
        unique: true
    }
})

export const Designation: Model<IDesignation> = mongoose.model<IDesignation>('Designation', designationSchema)