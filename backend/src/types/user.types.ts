import { Document } from "mongoose";

export interface IUser extends Document {
    username: string
    email: string
    firstName: string
    lastName: string
    avatar: string
    password: string
    refreshToken: string
    createdAt: Date
    updatedAt: Date

    comparePassword(password: string): Promise<boolean>
    generateAccessToken(): string;
    generateRefreshToken(): string;
}