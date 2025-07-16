//! Create employee

import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { IEmployeeBody } from "../types/employee.types.js";
import { Shift } from "../models/shift.model.js";

export const createEmployee = asyncHandler(async (req: Request<{}, {}, IEmployeeBody>, res: Response) => {
    const { employeeName, shiftId, restDay, isRandom } = req.body

    if(!shiftId) {
        throw new ApiError(400,'Shift is required')
    }

    const shift = await Shift.findById(shiftId)

    if(!shift) {
        throw new ApiError(400, "shift not found")
    }

    if(!employeeName) {
        throw new ApiError(400, 'Employee name is required')
    }

    if(!restDay) {
        throw new ApiError(400,"Rest day is required")
    }
    const employee = await Employee.create({
        name: employeeName,
        shift: shift._id,
        restDay,
        isRandom
    })

    if(!employee) {
        throw new ApiError(500, 'Something went wrong while creating the employee')
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201,employee,'Employee created successfully')
        )
})