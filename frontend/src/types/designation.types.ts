import type { ApiResponse } from "./api.types"

export type Designation = {
    designationName: string
    _id: number
}

export type DesignationResponse = ApiResponse<Designation[]>