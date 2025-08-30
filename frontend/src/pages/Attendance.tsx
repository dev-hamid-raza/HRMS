import { data } from "@/lib/data/attendance";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Header from "@/components/common/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDateToDDMMYYYY, getDatesInRange } from "@/utils/timeDate";
import { useEffect, useState } from "react";
import { ClockFading } from "lucide-react";
import Loader from '@/components/common/Loader'

const AttendanceTables = () => {
  const [queryData, setQueryData] = useState({
    startDate: '',
    endDate: '',
    empCode: '',
    department: '',
    empType: ''
  })
  const [showTable, setShowTable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [conponentLoading, setComponentLoading] = useState(false)
  const startDate = "2025-07-01";
  const endDate = "2025-07-31";

  const dates = getDatesInRange(startDate, endDate);

  const allDates = dates.map(date => (new Date(date).toISOString().split("T")[0]))


  useEffect(() => {
    const timer = setTimeout(() => {
      setComponentLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [])

  return (
    <div className='w-ful flex h-screen flex-col space-y-6'>
      <Header
        title='Attendance'
        showButton={false}
      />
      <div className='px-8 flex gap-2 items-center justify-between'>
        <div className="flex gap-2">
          <Input
            mask="99-99-9999"
            className="w-35"
            placeholder='DD-MM-YYYY'
            value={queryData.startDate}
            onChange={(e) => setQueryData(prev => ({ ...prev, startDate: e.target.value }))}
          />
          <Input
            mask="99-99-9999"
            className="w-35"
            placeholder='DD-MM-YYYY'
            value={queryData.endDate}
            onChange={(e) => setQueryData(prev => ({ ...prev, endDate: e.target.value }))}
          />
          <Input
            className="w-35"
            placeholder='Employee type'
            value={queryData.empType}
            onChange={(e) => setQueryData(prev => ({ ...prev, empType: e.target.value }))}
          />
          <Input
            className="w-35"
            placeholder='Department'
            value={queryData.department}
            onChange={(e) => setQueryData(prev => ({ ...prev, department: e.target.value }))}
          />
          <Input
            className="w-35"
            placeholder='Employee code'
            value={queryData.empCode}
            onChange={(e) => setQueryData(prev => ({ ...prev, empCode: e.target.value }))}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => {
            setLoading(!loading)
            setShowTable(!showTable)
          }}>{loading ? <Loader /> : "In Out Report"}</Button>
          <Button>Attendance Summary</Button>
        </div>
      </div>
      
      <div className="bg-surface-100 border border-gray-200 text-lg font-medium text-gray-700 -mb-0 px-8 py-2">
        {
          loading
            ? <Loader className="!w-[28px] !h-[28px]" />
            : showTable
              ? `Date: ${formatDateToDDMMYYYY(startDate)} to ${formatDateToDDMMYYYY(endDate)}`
              : "Choose a start and end date to view attendance records."
        }
      </div>
      {
        loading
          ? <div className="flex justify-center h-full items-center">
            <Loader className="text-primary-100 w-[275px] h-[275px] border-25" />
          </div>
          : showTable
            ? <div className="space-y-6 flex-1 overflow-auto pb-4 pt-6">
              {data.map((dept) => {
                return (
                  <div className="px-8">
                    <div key={dept.departmentName}>
                      <h2 className="text-lg font-bold text-text-700 mb-2">{dept.departmentName}</h2>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border divide-y divide-gray-200 text-sm">
                          <thead className="bg-surface-100">
                            <tr className="">
                              <th className="border border-gray-200 p-2 font-medium text-gray-700">Code</th>
                              <th className="border border-gray-200 p-2 font-medium text-gray-700">Employee</th>
                              <th className="border border-gray-200 p-2 font-medium text-gray-700">Designation</th>
                              {allDates.map((date) => (
                                <th key={date} className="border border-gray-200 font-medium text-gray-700 p-2 vertical-text text-center">
                                  {date}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {dept.employees.map((emp) => (
                              <tr key={emp.empCode}>
                                <td className="border border-gray-200 text-center text-sm text-gray-800">{emp.empCode}</td>
                                <td className="border border-gray-200 p-1 text-sm text-gray-800">{emp.employeeName}</td>
                                <td className="border border-gray-200 p-1 text-sm text-gray-800">{emp.designationName}</td>
                                {allDates.map((date) => {
                                  const punch = emp.punches.find(
                                    (p: any) =>
                                      new Date(p.date).toISOString().split("T")[0] === date
                                  );
                                  return (
                                    <td key={date} className="border border-gray-200 text-sm text-gray-800 p-1 cursor-pointer hover:bg-gray-100 transition text-center">
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
                                                <h2 className="text-center font-bold mb-2 text-sm">IN</h2>
                                                <div className="space-y-2">
                                                  {punch.punches
                                                    .filter((p) => p.type === "IN")
                                                    .map((p) => (
                                                      <div
                                                        key={p._id}
                                                        className="bg-success-100 text-sm text-success-800 p-1 rounded-md text-center shadow"
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
                                                <h2 className="font-bold text-center text-sm mb-2">OUT</h2>
                                                <div className="space-y-2">
                                                  {punch.punches
                                                    .filter((p) => p.type === "OUT")
                                                    .map((p) => (
                                                      <div
                                                        key={p._id}
                                                        className="bg-warning-100 text-warning-700 text-sm p-1 rounded-md text-center shadow"
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
            : <div className="flex justify-center h-full items-center">
              <ClockFading className="text-primary-100 w-[300px] h-[300px]" />
            </div>}
    </div>
  );
};

export default AttendanceTables;
