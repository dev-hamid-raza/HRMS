import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { EmployeeType } from "../models/employeeType.model";
import { ApiResponse } from "../utils/ApiResponse";

export const createEmpType = asyncHandler(async (req:Request<{}, {}, {empType: string}>, res: Response) => {
    const { empType } = req.body

    if(!empType) {
        throw new ApiError(400, 'Employee Type is required')
    }

    const existingEmpType = EmployeeType.findOne({empType})

    if(!existingEmpType) {
        throw new ApiError(400,'This employee type is already exits')
    }

    const createdEmpType = EmployeeType.create({empType})

    if(!createdEmpType) {
        throw new ApiError(500,'Something went wrong while creating employee type')
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201,{createdEmpType}, 'Employee type created successfully')
        )
})