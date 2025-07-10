import mongoose, { Document, Types } from "mongoose"
import { IEmployee } from "./employee.types"

export interface IPunch {
    time: Date
    type: 'IN' | 'OUT'
}

enum AStatus {
    P = 'P',
    A = 'A'
}

export interface IAttendance extends Document {
    employee: Types.ObjectId | IEmployee
    date: string
    punches: IPunch[]
    checkInTime?: Date
    checkOutTime?: Date
    isLate: boolean
    totalHoursWorked: number
    status: 'P' | 'A' | 'H'
}