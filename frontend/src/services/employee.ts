import { DEPARTMENT_API } from "@/lib/constants/api/department"
import { getApi, postApi } from "./apiClient"
import type { EmployeeResponse } from "@/types/employees.types"
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

export const createEmployee = async (body: { departmentName: string }) => {
    const res = await postApi<EmployeeResponse>({
        url: DEPARTMENT_API.CREATE,
        body
    })
    return res.data
}

export const updateEmployee = async (departmentName: string, id: number) => {
    const res = await postApi<EmployeeResponse>({
        url: DEPARTMENT_API.UPDATE(id),
        body: { departmentName }
    })
    return res.data
}
