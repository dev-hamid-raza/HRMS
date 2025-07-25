import { DEPARTMENT_API } from "@/lib/constants/api/deparment"
import { getApi, postApi } from "./apiClient"
import type { DepartmentResponse } from "@/types/department.types"
import { axiosInstance } from "./axiosInstance"
import type { ApiResponse } from "@/types/api.types"

export const fetchDepartments = async (params?: {search: string}) => {
    const res = await getApi<DepartmentResponse>({
        url: DEPARTMENT_API.LIST,
        data: {
            ...params
        }
    })
    return res.data
}

export const createDepartment = async (body: { departmentName: string }) => {
    const res = await postApi<DepartmentResponse>({
        url: DEPARTMENT_API.CREATE,
        body
    })
    return res.data
}

export const updateDepartment = async (departmentName: string, id: number) => {
    const res = await postApi<DepartmentResponse>({
        url: DEPARTMENT_API.UPDATE(id),
        body: { departmentName }
    })
    return res.data
}

export const deleDepartment = async (id: number) => {
    const res = await axiosInstance.delete<ApiResponse<unknown>>(DEPARTMENT_API.DELETE(id))
    return res.data
}