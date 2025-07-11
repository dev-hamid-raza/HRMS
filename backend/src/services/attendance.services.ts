import { getMinutesFromDate, toPKTDate } from "../lib/time";

import { IAttendance } from "../types/attendance.types.js";
import { IEmployee } from "../types/employee.types";
import { IShift } from "../types/shift.types";

export const updateAttendanceSummary = (att: IAttendance): void => {
    const punches = att.punches.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    const emp = att.employee as IEmployee
    const shift = emp.shift as IShift

    const { lateInRelaxation, totalShiftHours, startTime } = shift

    if (!punches.length) {
        att.status = 'A'
        return
    }

    const firstCheckIn = punches[0].time
    //* Calculate the total hours
    const lastCheckIn = punches[punches.length - 2].time
    const lastCheckOut = punches[punches.length - 1].time

    const totalMs = lastCheckOut.getTime() - lastCheckIn.getTime()
    const hoursWorked = +(totalMs / 1000 / 60 / 60).toFixed(2)
    const totalHours = att.totalHoursWorked + hoursWorked

    att.totalHoursWorked = totalHours

    //* Check is late or not
    const checkIn = getMinutesFromDate(firstCheckIn)
    att.isLate = checkIn > (lateInRelaxation + startTime)

    //* Set attendance status
    if (totalHours > (totalShiftHours - 1) && att.isLate) {
        att.status = "LIP"
    }

    if (totalHours > (totalShiftHours - 1) && !att.isLate) {
        att.status = "P"
    }

    if (totalHours > (totalShiftHours / 2 - 0.5) && totalHours < (totalShiftHours - 1) && att.isLate) {
        att.status = "LIH"
    }

    if (totalHours > (totalShiftHours / 2 - 0.5) && totalHours < (totalShiftHours - 1) && !att.isLate) {
        att.status = "H"
    }
}