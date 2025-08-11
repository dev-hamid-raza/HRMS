import type { Employee } from '@/types/employees.types';

type EmpProfileProps = {
	employee: Employee
}

export default function EmployeeProfile({employee}: EmpProfileProps ) {
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday']
	return (
		<div className='flex items-center justify-center p-6'>
			<div className='bg-surface-50 shadow-xl rounded-2xl w-full max-w-3xl overflow-hidden'>
				{/* Top Section */}
				<div className='flex flex-col sm:flex-row'>
					{/* Image */}
					<div className='p-3 flex items-center justify-center'>
						<img
							src={employee.image}
							alt={`${employee.firstName} ${employee.lastName}`}
							className='rounded-lg object-cover h-40 w-40 shadow'
						/>
					</div>

					{/* Name & Designation */}
					<div className='sm:w-2/3 p-4'>
						<div className='flex'>
							<p className='text-gray-500 w-50 text-xl'>Employee Code</p>
							<h1 className='text-xl font-bold text-gray-800'>
								{employee.empCode}
							</h1>
						</div>
						<div className='flex'>
							<p className='text-gray-500 w-50 text-xl'>Full Name</p>
							<h1 className='text-xl font-bold text-gray-800'>
								{employee.firstName} {employee.lastName}
							</h1>
						</div>
						<div className='flex'>
							<p className='text-gray-500 w-50 text-xl'>Designation</p>
							<h1 className='text-xl font-bold text-gray-800'>
								{employee.designation.designationName}
							</h1>
						</div>
						<div className='flex'>
							<p className='text-gray-500 w-50 text-xl'>Department</p>
							<h1 className='text-xl font-bold text-gray-800'>
								{employee.department.departmentName}
							</h1>
						</div>
						<div className='flex'>
							<p className='text-gray-500 w-50 text-xl'>Father's Name</p>
							<h1 className='text-xl font-bold text-gray-800'>
								{employee.fatherName}
							</h1>
						</div>
						<div className='flex'>
							<p className='text-gray-500 w-50 text-xl'>CNIC</p>
							<h1 className='text-xl font-bold text-gray-800'>
								{employee.cnic}
							</h1>
						</div>
					</div>
				</div>

				{/* All Fields in 2 Columns */}
				<div className='p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
					{/* <Info label='Employee Code' value={employee.empCode} /> */}
					<Info label='Date of Birth' value={employee.dateOfBirthday} />
					<Info label='Date of Joining' value={employee.dateOfJoining} />
					<Info
						label='Date of Confirmation'
						value={employee.dateOfConfirmation}
					/>
					<Info label='Religion' value={employee.religion} />
					<Info label='Marital Status' value={employee.martialStatus} />
					<Info label='Gender' value={employee.gender} />
					<Info label='Phone' value={employee.phoneNumber} />
					<Info label='Emergency Phone' value={employee.emgPhoneNumber} />
					<Info label='Permanent Address' value={employee.permanentAddress} />
					<Info label='Temporary Address' value={employee.tempAddress} />
					<Info label='Blood Group' value={employee.bloodGroup} />
					<Info label='On Duty' value={employee.onDuty ? 'Yes' : 'No'} />
					<Info
						label='Salary'
						value={`Rs. ${employee.salary.toLocaleString()}`}
					/>
					<Info label='Qualification' value={employee.qualification} />
					<Info
						label='Overtime Allowed'
						value={employee.overTimeAllowed ? 'Yes' : 'No'}
					/>
					<Info label='Status' value={employee.status} />
					<Info label='Salary Type' value={employee.salaryType} />
					<Info label='Employment Type' value={employee.empType.empType} />
					<Info label='Shift' value={employee.shift.shiftName} />
					<Info label='Rest Day' value={dayName[employee.restDay]} />
					<Info label='Rest Quota' value={employee.restQuota} />
					<Info label='Rest Used' value={employee.restUsed} />
					<Info label='Rest Month' value={employee.restMonth} />
					<Info label='Random' value={employee.isRandom ? 'Yes' : 'No'} />
				</div>
			</div>
		</div>
	);
}

function Info({ label, value }: {label:string, value: string | number}) {
	return (
		<div className='flex gap-2 border-b'>
			<span className='text-gray-500'>{label} :</span>
			<span className='font-medium text-gray-800'>{value || '—'}</span>
		</div>
	);
}
