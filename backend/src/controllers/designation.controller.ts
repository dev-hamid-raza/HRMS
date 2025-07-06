import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { Designation } from "../models/designation.mode";
import { ApiResponse } from "../utils/ApiResponse";

//! Create designation
export const createDesignation = asyncHandler(async (req: Request<{}, {}, { designationName: string }>, res: Response) => {
    const { designationName } = req.body

    if (!designationName) {
        throw new ApiError(400, 'Designation name is required')
    }

    const exitingDesignationName = await Designation.findOne({ designationName })
    if (exitingDesignationName) {
        throw new ApiError(400, 'Designation is already exits')
    }

    const designation = await Designation.create({ designationName })
    if (!designation) {
        throw new ApiError(500, 'Something went wrong')
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, designation, 'Designation successfully created')
        )
})

//! Delete designation
export const deleteDesignation = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    if (!id) {
        throw new ApiError(400, 'Designation id is required')
    }

    const designation = await Designation.findById(id)

    if (!designation) {
        throw new ApiError(404, 'Designation not found')
    }

    await designation.deleteOne()

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, 'Designation successfully deleted')
        )
})

//! Update designation

export const updateDesignation = asyncHandler(async (req: Request<{ id: string }, {}, { designationName: string }>, res: Response) => {
    const { designationName } = req.body
    const { id } = req.params

    if(!id) {
        throw new ApiError(400,'invalid  designation id')
    }

    if(!designationName) {
        throw new ApiError(400, 'Designation name is required')
    }

    const designation = await Designation.findById(id)

    if(!designation) {
        throw new ApiError(404, 'Designation is not found')
    }

    designation.designationName = designationName

    await designation.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200,designation,'Designation update successfully')
        )
})

//! Designation list

export const designationList = asyncHandler(async(req: Request, res: Response) => {
    const designations = await Designation.find()

    if(!designations) {
        throw new ApiError(500, 'something went wrong')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200,designations, 'Designation list')
        )
})