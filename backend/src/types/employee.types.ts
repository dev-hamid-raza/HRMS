import mongoose, { Document } from "mongoose";

export interface IEmployee extends Document {
    empCode: number,
    name: string,
    onDuty: boolean,
    shift: mongoose.Schema.Types.ObjectId
}

export interface IEmployeeBody {
    employeeName: string
    shiftId: number
}