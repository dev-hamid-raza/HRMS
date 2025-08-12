import { Request, Response } from "express";
import { Types } from "mongoose";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Attendance } from "../models/attendance.model.js";
import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { updateAttendanceSummary } from "../services/attendance.services.js";

//! Record punch time
export const punchTime = asyncHandler(async (req: Request<{}, {}, { empCode: number, timeStamp: string }>, res: Response) => {
    const { empCode, timeStamp } = req.body

    let today = new Date(timeStamp)
    if (!empCode) {
        throw new ApiError(400, 'Employee code is required for punch time')
    }
    const employee = await Employee.findOne({ empCode })

    if (!employee) {
        throw new ApiError(4004, 'This employee does not exits')
    }

    const employeeId = employee._id
    
    if (employee.onDuty) {
        const attendance = await Attendance.find({ employee: employeeId })
        today = attendance[attendance.length - 1].date
    }


    let attendance = await Attendance.findOne({ employee: employeeId, date: today }).populate({
        path: 'employee',
        populate: {
            path: 'shift'
        }
    })

    if (!attendance) {
        attendance = new Attendance({
            employee: employeeId,
            date: today,
            punches: []
        })
    }

    attendance.punches.push({ time: new Date(timeStamp), type: employee.onDuty ? "OUT" : 'IN' })
    employee.onDuty = !employee.onDuty

    if (!employee.onDuty) {
        updateAttendanceSummary(attendance)
    }

    await attendance.save()
    await employee.save()

    return res
        .status(201)
        .json(
            new ApiResponse(201, { onDuty: employee.onDuty }, "Successfully punch recorded")
        )
})


export const getPunches = asyncHandler(async (
    req: Request<{}, {}, {}, {
        startDate: string;
        endDate: string;
        empCode?: string;
        department?: string;
        empType?: string;
    }>,
    res: Response
) => {
    const { startDate, endDate, empCode, department, empType } = req.query;

    if (!startDate || !endDate) {
        throw new ApiError(400, 'Start and ending date is required');
    }

    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);

    // Base filter
    const attendanceFilter: any = {
        date: {
            $gte: fromDate,
            $lte: toDate
        }
    };

    // If any employee-related filters are provided
    if (empCode || department || empType) {
        const employeeFilter: any = {};

        if (empCode) {
            employeeFilter.empCode = empCode;
        }
        if (department) {
            employeeFilter.department = department;
        }
        if (empType) {
            employeeFilter.empType = empType;
        }
        console.log(employeeFilter,"Filter ")
        const matchingUsers = await Employee.find(employeeFilter).select("_id");
        const userIds = matchingUsers.map(user => user._id);

        if (userIds.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, [], "No matching records found"));
        }

        attendanceFilter.employee = { $in: userIds };
    }

    // Query attendance
    const results = await Attendance.find(attendanceFilter)
        .populate({
            path: 'employee',
            select: 'firstName lastName',
            populate: [{
                path: 'department', select: 'departmentName'
            }]
        }).select('-createdAt -updatedAt -__v')
            
    if (!results) {
        throw new ApiError(500, 'Something went wrong while fetching punch report');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, results, "Here is data"));
});