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
    bloodGroup: string
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
    image: string
}

export type EmployeeBody = {
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
    bloodGroup: string
    salary: number | null
    qualification: string
    overTimeAllowed: boolean
    salaryType: string
    empType: string | null
    designation: string | null
    department: string | null
    shift: string | null
    isRandom: boolean,
    image: File | null
    restDay: string
}

export type EmpError = {
    firstNameError: boolean
    lastNameError: boolean
    fatherNameError: boolean
    dateOfBirthdayError: boolean
    dateOfJoiningError: boolean
    dateOfConfirmationError: boolean
    cnicError: boolean
    religionError: boolean
    martialStatusError: boolean
    genderError: boolean
    phoneNumberError: boolean
    emgPhoneNumberError: boolean
    permanentAddressError: boolean
    tempAddressError: boolean
    BloodGroupError: boolean
    salaryError: boolean
    qualificationError: boolean
    salaryTypeError: boolean
    empTypeError: boolean
    designationError: boolean
    departmentError: boolean
    shiftError: boolean
    imageError: boolean
    restDayError: boolean
}

export type EmployeeResponse = ApiResponse<Employee[]>

