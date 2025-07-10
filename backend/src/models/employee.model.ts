import mongoose, { Model, Schema } from "mongoose";

import { IEmployee } from "../types/employee.types.js";
import { Counter } from "./counter.model.js";

const employeeSchema = new Schema<IEmployee>({
    empCode: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    onDuty: {
        type: Boolean,
        default: false
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift'
    }
})


employeeSchema.pre('save', async function (next) {
    if(!this.isNew || this.empCode ) return next()

    try {
        const counter = await Counter.findOneAndUpdate(
            {modelName: 'Employee'},
            {$inc: {seq: 1}},
            {new: true, upsert: true}
        )

        this.empCode = counter.seq
        next()
    } catch (error) {
        next(error as Error)
    }
})

export const Employee: Model<IEmployee> = mongoose.model<IEmployee>('Employee', employeeSchema)