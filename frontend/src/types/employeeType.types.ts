import type { ApiResponse } from "./api.types"

export type EmpType = {
    empType: string
    _id: number
}

export type EmpTypeResponse = ApiResponse<EmpType[]>