import mongoose, { Document, Types } from "mongoose";
import { IShift } from "./shift.types.js";

export interface IEmployee extends Document {
    empCode: number,
    name: string,
    onDuty: boolean,
    shift: Types.ObjectId | IShift
}

export interface IEmployeeBody {
    employeeName: string
    shiftId: number
}