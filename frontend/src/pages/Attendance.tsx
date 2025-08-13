import { data } from "@/lib/data/attendance";
import React from "react";

const AttendanceTables = () => {
  return (
    <div className="space-y-8">
      {data.map((dept) => {
        // Extract all dates for this department
        const allDates = Array.from(
          new Set(
            dept.employees.flatMap((emp) =>
              emp.punches.map(
                (p: any) => new Date(p.date).toISOString().split("T")[0]
              )
            )
          )
        ).sort();

        return (
          <div className="px-1">
          <div key={dept.departmentName}>
            <h2 className="text-lg font-bold mb-2">{dept.departmentName}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Employee</th>
                    {allDates.map((date) => (
                      <th key={date} className="border p-2 vertical-text text-center">
                        {date}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dept.employees.map((emp) => (
                    <tr key={emp.empCode}>
                      <td className="border p-2">{emp.empCode} - {emp.employeeName}</td>
                      {allDates.map((date) => {
                        const punch = emp.punches.find(
                          (p: any) =>
                            new Date(p.date).toISOString().split("T")[0] === date
                        );
                        return (
                          <td key={date} className="border p-2 text-center">
                            {punch ? (
                              <div>
                                {/* <div>
                                  IN:{" "}
                                  {new Date(
                                    punch.punches.find(
                                      (x: any) => x.type === "IN"
                                    )?.time
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                                <div>
                                  OUT:{" "}
                                  {new Date(
                                    punch.punches.find(
                                      (x: any) => x.type === "OUT"
                                    )?.time
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div> */}
                                <div>{punch.status}</div>
                                <div>{Number(punch.totalHoursWorked).toFixed(2)}</div>
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceTables;
