import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { IRegisterRequestBody } from "../types/user.types.js"
import { generateUniqueUsername } from "../utils/username.js"

export const registerUser = asyncHandler(async (
    req: Request<{}, {}, IRegisterRequestBody>, res: Response
) => {

    const { firstName, lastName, email, password } = req.body

    if (
        [firstName, lastName, password, email].some((field) => typeof field !== 'string' || field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(400, "This email already taken")
    }

    const username = await generateUniqueUsername(firstName, lastName)
    console.log(username,"username")

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        username
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User registered successfully")
        )
})