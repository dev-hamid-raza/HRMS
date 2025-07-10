import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ShiftRequestBody } from "../types/shift.types.js";
import { ApiError } from "../utils/ApiError.js";
import { calculateHours, timeStringToMinutes } from "../lib/time.js";
import { Shift } from "../models/shift.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const shiftCreate = asyncHandler(async (req: Request<{}, {}, ShiftRequestBody>, res: Response) => {
    const { startTime, endTime, lateInRelaxation, earlyOutRelaxation, brakeEnd, brakeStart, shiftName} = req.body

    if(
        [startTime, endTime, lateInRelaxation, earlyOutRelaxation, brakeStart, brakeEnd, shiftName].some((field) => typeof field !== 'string' || field?.trim() === "")
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    const existingShift = await Shift.findOne({shiftName})

    if(existingShift) {
        throw new ApiError(400, 'This name is already exits')
    }

    const startTimeInMinutes = timeStringToMinutes(startTime)
    const endTimeInMinutes = timeStringToMinutes(endTime)
    const lateInRelaxationInMinutes = timeStringToMinutes(lateInRelaxation)
    const earlyOutRelaxationInMinutes = timeStringToMinutes(earlyOutRelaxation)
    const brakeStartInMinutes = timeStringToMinutes(brakeStart)
    const brakeEndInMinutes = timeStringToMinutes(brakeEnd)

    const brakeHours = calculateHours(brakeStartInMinutes, brakeEndInMinutes)
    const shiftHours = calculateHours(startTimeInMinutes,endTimeInMinutes)

    const totalShiftHours = shiftHours - brakeHours
    
    const shift = await Shift.create({
        startTime: startTimeInMinutes,
        endTime: endTimeInMinutes,
        lateInRelaxation: lateInRelaxationInMinutes,
        earlyOutRelaxation: earlyOutRelaxationInMinutes,
        brakeStart: brakeStartInMinutes,
        brakeEnd: brakeEndInMinutes,
        shiftName,
        totalShiftHours
    })


    if(!shift) {
        throw new ApiError(500,'Something went wrong while creating shift')
    }


    return res
        .status(201)
        .json(
            new ApiResponse(201, {}, "Shift created successfully")
        )
})