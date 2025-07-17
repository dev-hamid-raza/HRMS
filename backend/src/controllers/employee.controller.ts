//! Create employee

import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { IEmployeeBody } from "../types/employee.types.js";
import { Shift } from "../models/shift.model.js";
import { EmployeeType } from "../models/employeeType.model.js";
import { Designation } from "../models/designation.model.js";
import { Department } from "../models/department.model.js";
import { calculateRestData } from "../services/calculateRest.services.js";

export const createEmployee = asyncHandler(async (req: Request<{}, {}, IEmployeeBody>, res: Response) => {
    const {
        fatherName,
        lastName,
        firstName,
        shift,
        restDay,
        isRandom,
        BloodGroup,
        cnic,
        dateOfBirthday,
        dateOfConfirmation,
        dateOfJoining,
        department,
        designation,
        emgPhoneNumber,
        empType,
        gender,
        martialStatus,
        overTimeAllowed,
        permanentAddress,
        phoneNumber,
        qualification,
        religion,
        salary,
        salaryType,
        tempAddress,
        reference,
        replace
    } = req.body

    const requiredFields = {
        firstName,
        lastName,
        fatherName,
        shift,
        restDay,
        isRandom,
        BloodGroup,
        cnic,
        dateOfBirthday,
        dateOfConfirmation,
        dateOfJoining,
        department,
        designation,
        emgPhoneNumber,
        empType,
        gender,
        martialStatus,
        overTimeAllowed,
        permanentAddress,
        phoneNumber,
        qualification,
        religion,
        salary,
        salaryType,
        tempAddress,
    };
    const { restQuota, restUsed, restMonth } = calculateRestData(restDay,dateOfJoining)
    for (const [key, value] of Object.entries(requiredFields)) {
        if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
            throw new ApiError(400, `Missing or empty field: ${key}`)
        }
    }

    const existingEmp = await Employee.findOne({cnic}).select('empCode')

    if(existingEmp) {
        throw new ApiError(400,`This employee already exits at employee code ${existingEmp.empCode}`)
    }
    
    const empTypeDoc = await EmployeeType.findById(empType)

    if(!empTypeDoc) {
        throw new ApiError(400,"Invalid employee type id")
    }
    
    const designationDoc = await Designation.findById(designation)

    if(!designationDoc) {
        throw new ApiError(400, 'Invalid designation id')
    }

    const departmentDoc = await Department.findById(department)

    if(!departmentDoc) {
        throw new ApiError(400, 'Invalid department id')
    }

    const shiftDoc = await Shift.findById(shift)

    if(!shiftDoc) {
        throw new ApiError(400, 'Invalid shift id')
    }

    

    const employee = await Employee.create({
        ...requiredFields,
        reference,
        replace,
        restQuota,
        restUsed,
        restMonth
    })
    if(!employee) {
        throw new ApiError(500, 'Something went wring while creating employee')
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, employee, "Employee created successfully")
        )

})