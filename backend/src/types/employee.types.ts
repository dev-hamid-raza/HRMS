import { Document } from "mongoose";

export interface IEmployee extends Document {
    empCode: number,
    name: string,
    onDuty: boolean
}

