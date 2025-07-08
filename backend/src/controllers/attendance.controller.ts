import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Attendance } from "../models/attendance.model.js";
import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const punchTime = asyncHandler(async (req: Request<{}, {}, { empCode: number }>, res: Response) => {
    const { empCode } = req.body
    const today = new Date().toISOString().split('T')[0]

    if (!empCode) {
        throw new ApiError(400, 'Employee code is required for punch time')
    }

    const employee = await Employee.findOne({ empCode })

    if (!employee) {
        throw new ApiError(4004, 'This employee does not exits')
    }

    const employeeId = employee._id
    let attendance = await Attendance.findOne({ employee: employeeId, date: today })
    if (!attendance) {
        attendance = new Attendance({
            employee: employeeId,
            date: today,
            punches: []
        })
    }
    console.log(attendance)
    attendance.punches.push({ time: new Date(), type: employee.onDuty ? "OUT" : 'IN' })
    employee.onDuty = !employee.onDuty


    await attendance.save()
    await employee.save()

    return res
        .status(201)
        .json(
            new ApiResponse(201, { onDuty: employee.onDuty }, "Successfully punch recorded")
        )
})