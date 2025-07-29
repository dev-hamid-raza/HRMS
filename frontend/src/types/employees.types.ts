import type { ApiResponse } from "./api.types"
import type { Department } from "./department.types"
import type { Designation } from "./designation.types"
import type { EmpType } from "./employeeType.types"
import type { Shift } from "./shift.types"

export type Employee = {
    _id :  number
    firstName: string
    lastName: string
    fatherName: string
    dateOfBirthday: string
    dateOfJoining: string
    dateOfConfirmation: string
    cnic: string
    religion: string
    martialStatus: string
    gender: string
    phoneNumber: string
    emgPhoneNumber: string
    permanentAddress: string
    tempAddress: string
    BloodGroup: string
    onDuty: boolean
    salary: number
    qualification: string
    overTimeAllowed: boolean
    status: string
    salaryType: string
    empType: EmpType
    designation: Designation
    department: Department
    shift: Shift
    restDay: number
    restQuota: number,
    restUsed: number,
    restMonth: number
    isRandom: boolean,
    empCode: number
}

export type EmployeeResponse = ApiResponse<Employee[]>

