import mongoose, { Model, Schema } from "mongoose";
import { IDepartment } from "../types/department.types.js";

const departmentSchema = new Schema<IDepartment>({
    departmentName : {
        type: String,
        unique: true
    }
}, {timestamps:true})

export const Department: Model<IDepartment> = mongoose.model<IDepartment>("Department", departmentSchema)