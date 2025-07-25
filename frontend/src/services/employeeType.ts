import { EMP_TYPE_API } from "@/lib/constants/api/employeeType"
import { getApi, postApi } from "./apiClient"
import { axiosInstance } from "./axiosInstance"
import type { ApiResponse } from "@/types/api.types"
import type { EmpTypeResponse } from "@/types/employeeType.types"

export const fetchEmpTypes = async (params?: {search: string}) => {
    const res = await getApi<EmpTypeResponse>({
        url: EMP_TYPE_API.LIST,
        data: {
            ...params
        }
    })
    return res.data
}

export const createEmpType = async (body: { empType: string }) => {
    const res = await postApi<EmpTypeResponse>({
        url: EMP_TYPE_API.CREATE,
        body
    })
    return res.data
}

export const updateEmpType = async (empType: string, id: number) => {
    const res = await postApi<EmpTypeResponse>({
        url: EMP_TYPE_API.UPDATE(id),
        body: { empType }
    })
    return res.data
}

export const deleteEmpType = async (id: number) => {
    const res = await axiosInstance.delete<ApiResponse<unknown>>(EMP_TYPE_API.DELETE(id))
    return res.data
}