import { data } from "@/lib/data/attendance";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import React from "react";
import Header from "@/components/common/Header";
import { Input } from "@/components/ui/input";

const AttendanceTables = () => {
  return (
      <div className='w-ful flex h-screen flex-col space-y-6'>
        <Header
				title='Attendance'
			/>
      <div className='px-8 w-85'>
				<Input
					placeholder='Search the employee'
				/>
			</div>
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
                      <th className="border p-2">Code</th>
                      <th className="border p-2">Employee</th>
                      <th className="border p-2">Designation</th>
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
                        <td className="border p-2 text-center">{emp.empCode}</td>
                        <td className="border p-2">{emp.employeeName}</td>
                        <td className="border p-2">{emp.designationName}</td>
                        {allDates.map((date) => {
                          const punch = emp.punches.find(
                            (p: any) =>
                              new Date(p.date).toISOString().split("T")[0] === date
                          );
                          return (
                            <td key={date} className="border p-2 text-center">
                              {punch ? (
                                <HoverCard>
                                  <HoverCardTrigger>

                                <div>
                                  <div>{punch.status}</div>
                                  <div>{Number(punch.totalHoursWorked).toFixed(2)}</div>
                                </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent>
                                    <div className="flex justify-center gap-2">
                                        {/* Left Column (IN) */}
                                        <div className="flex-1">
                                          <h2 className="text-lg text-center font-bold mb-2">IN</h2>
                                          <div className="space-y-2">
                                            {punch.punches
                                              .filter((p) => p.type === "IN")
                                              .map((p) => (
                                                <div
                                                  key={p._id}
                                                  className="bg-success-100 text-success-800 p-2 rounded-md text-center shadow"
                                                >
                                                  {new Date(p.time).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                  })}
                                                </div>
                                              ))}
                                          </div>
                                        </div>

                                        {/* Right Column (OUT) */}
                                        <div className="flex-1">
                                          <h2 className="text-lg font-bold text-center mb-2">OUT</h2>
                                          <div className="space-y-2">
                                            {punch.punches
                                              .filter((p) => p.type === "OUT")
                                              .map((p) => (
                                                <div
                                                  key={p._id}
                                                  className="bg-warning-100 text-warning-700 p-2 rounded-md text-center shadow"
                                                >
                                                  {new Date(p.time).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                  })}
                                                </div>
                                              ))}
                                          </div>
                                        </div>
                                      </div>
                                  </HoverCardContent>
                                </HoverCard>
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
          </div>
  );
};

export default AttendanceTables;
