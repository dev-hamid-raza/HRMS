import type { ApiResponse } from "./api.types"

export type Shift = {
    _id: number 
    shiftName: string
    startTime: string
    endTime: string
    lateInRelaxation: string
    earlyOutRelaxation: string
    brakeStart: string
    brakeEnd: string
    totalShiftHours: number
}

export type ShiftBody = {
    shiftName: string
    startTime: string
    endTime: string
    lateInRelaxation: string
    earlyOutRelaxation: string
    brakeStart: string
    brakeEnd: string
}

export type ShiftResponse = ApiResponse<Shift[]>