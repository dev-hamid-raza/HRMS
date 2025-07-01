import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"
import { User } from "../models/user.model"
import { ApiResponse } from "../utils/ApiResponse"

export const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body

    if (
        [firstName, lastName, password, email].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.find(email)

    if (existingUser) {
        throw new ApiError(400, "This email already taken")
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )
})