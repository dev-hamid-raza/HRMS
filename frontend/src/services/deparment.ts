import { DEPARTMENT_API } from "@/lib/constants/api/deparment"
import { getApi, postApi } from "./apiClient"
import type { DepartmentResponse } from "@/types/department.types"

export const fetchDepartments = async () => {
    const res = await getApi<DepartmentResponse>({
        url: DEPARTMENT_API.LIST
    })
    return res.data
}

export const createDepartment = async (body: {departmentName: string}) => {
    const res = await postApi<DepartmentResponse>({
        url: DEPARTMENT_API.CREATE,
        body
    })
    return res.data
}