import mongoose, { Document } from "mongoose"

export interface IPunch {
    time: Date
    type: 'IN' | 'OUT'
}

export interface IAttendance extends Document {
    employee: mongoose.Schema.Types.ObjectId
    date: string
    punches: IPunch[]
    checkInTime?: Date
    checkOutTime?: Date
    isLate: boolean
    totalHoursWorked: number
}