import { Employee } from "../models/employee.model.js";
import { countDayInMonth } from "../utils/countDays.js";

export const updateMonthlyRestQuota = async () => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-based
        const monthKey = `${year}-${(month + 1).toString().padStart(2, '0')}`; // e.g. "2025-07"

        const employees = await Employee.find({}, "_id restDay");

        for (const emp of employees) {
            const restDay = emp.restDay

            if (restDay === -1) {
                continue
            }
            const quota = countDayInMonth(year, month, restDay);

            await Employee.updateOne(
                { _id: emp._id },
                {
                    restQuota: quota,
                    restUsed: 0,
                    restMonth: monthKey,
                }
            );
        }

        console.log(`✅ Updated rest quota for ${employees.length} employees for ${monthKey}`);
    } catch (error) {
        console.log("Unable to update the employee rest quota with error", error)
    }
}

interface RestData {
    restQuota: number;
    restUsed: number;
}

export const calculateRestData = (restDay: number, joiningDateStr: Date): RestData => {
    const joiningDate = new Date(joiningDateStr)
    const year = joiningDate.getFullYear();
    const month = joiningDate.getMonth(); // 0-based
    const totalRestDays = countDayInMonth(year, month, restDay);

    let usedRest = 0;
    const date = new Date(year, month, 1);

    while (date < joiningDate && date.getMonth() === month) {
        if (usedRest <= totalRestDays) {
            usedRest++;
        }
        date.setDate(date.getDate() + 1);
    }

    return {
        restQuota: totalRestDays,
        restUsed: usedRest
    };
};
