import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../types/user.types";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {
    JWT_ACCESS_TOKEN_EXPIRY,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRY,
    JWT_REFRESH_TOKEN_SECRET
} from "../config/env";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (err) {
        next(err as Error)
    }
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (): string {

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)