import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";

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

    const matchStage: any = {
        date: { $gte: fromDate, $lte: toDate }
    };

    const employeeMatch: any = {};
    if (empCode) employeeMatch["employee.empCode"] = +empCode;
    if (department) employeeMatch["employee.department"] = new mongoose.Types.ObjectId(department);
    if (empType) employeeMatch["employee.empType"] = new mongoose.Types.ObjectId(empType);

    const pipeline: any[] = [
        { $match: matchStage },

        // Join with employee
        {
            $lookup: {
                from: "employees",
                localField: "employee",
                foreignField: "_id",
                as: "employee"
            }
        },
        { $unwind: "$employee" },

        // Filter employees if query params present
        ...(Object.keys(employeeMatch).length > 0 ? [{ $match: employeeMatch }] : []),

        // Join with department
        {
            $lookup: {
                from: "departments",
                localField: "employee.department",
                foreignField: "_id",
                as: "department"
            }
        },
        { $unwind: "$department" },

        // Keep only selected fields
        {
            $project: {
                empCode: "$employee.empCode",
                employeeName: { $concat: ["$employee.firstName", " ", "$employee.lastName"] },
                departmentName: "$department.departmentName",
                punches: "$punches",
                date: 1,
                isLate: 1,
                totalHoursWorked: 1,
                status: 1
            }
        },

        // Group by employee inside department
        {
            $group: {
                _id: {
                    departmentName: "$departmentName",
                    empCode: "$empCode"
                },
                employeeName: { $first: "$employeeName" },
                punches: {
                    $push: {
                        punches: "$punches",
                        date: "$date",
                        isLate: "$isLate",
                        totalHoursWorked: "$totalHoursWorked",
                        status: "$status"
                    }
                }
            }
        },

        // Group by department name
        {
            $group: {
                _id: "$_id.departmentName",
                employees: {
                    $push: {
                        empCode: "$_id.empCode",
                        employeeName: "$employeeName",
                        punches: "$punches"
                    }
                }
            }
        },

        // Rename fields for clean output
        {
            $project: {
                _id: 0,
                departmentName: "$_id",
                employees: 1
            }
        }
    ];

    const results = await Attendance.aggregate(pipeline);

    return res.status(200).json(new ApiResponse(200, results, "Here is grouped data"));
});

