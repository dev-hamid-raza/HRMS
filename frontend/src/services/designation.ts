import { DESIGNATION_API } from "@/lib/constants/api/designation"
import { getApi, postApi } from "./apiClient"
import { axiosInstance } from "./axiosInstance"
import type { ApiResponse } from "@/types/api.types"
import type { DesignationResponse } from "@/types/designation.types"

export const fetchDesignations = async (params?: {search: string}) => {
    const res = await getApi<DesignationResponse>({
        url: DESIGNATION_API.LIST,
        data: {
            ...params
        }
    })
    return res.data
}

export const createDesignation = async (body: { designationName: string }) => {
    const res = await postApi<DesignationResponse>({
        url: DESIGNATION_API.CREATE,
        body
    })
    return res.data
}

export const updateDesignation = async (designationName: string, id: number) => {
    const res = await postApi<DesignationResponse>({
        url: DESIGNATION_API.UPDATE(id),
        body: { designationName }
    })
    return res.data
}

export const deleDesignation = async (id: number) => {
    const res = await axiosInstance.delete<ApiResponse<unknown>>(DESIGNATION_API.DELETE(id))
    return res.data
}