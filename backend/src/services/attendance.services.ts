import { getMinutesFromDate, toPKTDate } from "../lib/time";

import { IAttendance } from "../types/attendance.types.js";
import { IEmployee } from "../types/employee.types";
import { IShift } from "../types/shift.types";

export const updateAttendanceSummary = (att: IAttendance): void => {
    const punches = att.punches.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    const emp = att.employee as IEmployee
    const shift = emp.shift as IShift
    
    const {lateInRelaxation, earlyOutRelaxation , totalShiftHours, startTime} = shift

    if(!punches.length) {
        att.status = 'A'
        return
    }
    
    const firstCheckIn = toPKTDate(punches[0].time)
    //* Calculate the total hours
    const lastCheckIn = punches[punches.length - 2].time
    const lastCheckOut = punches[punches.length -1].time

    const totalMs = lastCheckOut.getTime() - lastCheckIn.getTime()
    const hoursWorked = +(totalMs / 1000 / 60 / 60).toFixed(2)
    const totalHours = att.totalHoursWorked + hoursWorked
    
    att.totalHoursWorked = totalHours

    //* Check is late or not
    console.log(firstCheckIn.getHours())
    const checkIn = getMinutesFromDate(firstCheckIn)
    att.isLate = checkIn > (lateInRelaxation + startTime)
    console.log(checkIn,"adssa",lateInRelaxation + startTime)

    if(totalHours > 7) {
        att.status = "P"
    }

    if(totalHours > 3.5 && totalHours < 7) {
        att.status = "H"
    }
}