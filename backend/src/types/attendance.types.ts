import mongoose, { Document } from "mongoose"

export interface IPunch {
    time: Date
    type: 'IN' | 'OUT'
}

enum AStatus {
    P = 'P',
    A = 'A'
}

export interface IAttendance extends Document {
    employee: mongoose.Schema.Types.ObjectId
    date: string
    punches: IPunch[]
    checkInTime?: Date
    checkOutTime?: Date
    isLate: boolean
    totalHoursWorked: number
    status: 'P' | 'A' | 'H'
}