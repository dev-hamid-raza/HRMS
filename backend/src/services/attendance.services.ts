import { toPKTDate } from "../lib/time";
import { IAttendance } from "../types/attendance.types";

export const updateAttendanceSummary = (att: IAttendance): void => {
    const punches = att.punches.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

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
    console.log(firstCheckIn,"ias")
    const dutyStart = new Date("2025-07-08T09:15:00")
    att.isLate = dutyStart < firstCheckIn

    if(totalHours > 8) {
        att.status = "P"
    }
}