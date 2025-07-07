//! Create employee

import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { Employee } from "../models/employee.model";
import { ApiResponse } from "../utils/ApiResponse";

export const createEmployee = asyncHandler(async (req: Request<{}, {}, { employeeName: string }>, res: Response) => {
    const { employeeName } = req.body

    if(!employeeName) {
        throw new ApiError(400, 'Employee name is required')
    }

    const employee = await Employee.create({
        name: employeeName
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