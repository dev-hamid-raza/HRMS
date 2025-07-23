import type { ApiResponse } from "./api.types"

export type Department = {
    departmentName: string
    _id: number
}

export type DepartmentResponse = ApiResponse<Department[]>