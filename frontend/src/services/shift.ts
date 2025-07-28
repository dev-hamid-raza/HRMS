import { getApi, postApi } from "./apiClient"
import { axiosInstance } from "./axiosInstance"
import type { ApiResponse } from "@/types/api.types"
import type { ShiftBody, ShiftResponse } from "@/types/shift.types"
import { SHIFT_API } from "@/lib/constants/api/shift"

export const fetchShifts = async (params?: {search: string}) => {
    const res = await getApi<ShiftResponse>({
        url: SHIFT_API.LIST,
        data: {
            ...params
        }
    })
    return res.data
}

export const createShift = async (body: ShiftBody) => {
    const res = await postApi<ShiftResponse>({
        url: SHIFT_API.CREATE,
        body
    })
    return res.data
}

export const updateShift = async (designationName: ShiftBody, id: number) => {
    const res = await postApi<ShiftResponse>({
        url: SHIFT_API.UPDATE(id),
        body: { ...designationName }
    })
    return res.data
}

export const deleteShift= async (id: number) => {
    const res = await axiosInstance.delete<ApiResponse<unknown>>(SHIFT_API.DELETE(id))
    return res.data
}