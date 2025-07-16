import mongoose, { Document, Types } from "mongoose";
import { IShift } from "./shift.types.js";

export interface IEmployee extends Document {
    empCode: number,
    name: string,
    onDuty: boolean,
    shift: Types.ObjectId | IShift
    restDay: number
    restQuota: number
    restUsed: number
    restMonth: string
    isRandom: boolean
}

export interface IEmployeeBody {
    employeeName: string
    shiftId: number
    restDay: number
    isRandom: boolean
}