import { getApi, postApi } from "./apiClient"
import type { EmployeeBody, EmployeeResponse } from "@/types/employees.types"
import { EMPLOYEE_API } from "@/lib/constants/api/employee"

export const fetchEmployees = async (params?: {search: string}) => {
    const res = await getApi<EmployeeResponse>({
        url: EMPLOYEE_API.LIST,
        data: {
            ...params
        }
    })
    return res.data
}

export const createEmployee = async (body: EmployeeBody) => {
    const res = await postApi<EmployeeResponse>({
        url: EMPLOYEE_API.CREATE,
        body,
        options: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    })
    return res.data
}

export const updateEmployee = async (body: EmployeeBody, id: number) => {
    const res = await postApi<EmployeeResponse>({
        url: EMPLOYEE_API.UPDATE(id),
        body,
        options: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    })
    return res.data
}
