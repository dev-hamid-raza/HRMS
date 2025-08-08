import Header from '@/components/common/Header';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Table } from '@/components/common/PrimaryTable';
import type { Column } from '@/types/table.types';
import useFetchFn from '@/hooks/useFetch';
import { toast } from 'sonner';
import usePostFn from '@/hooks/usePostFn';
import Loader from '@/components/common/Loader';
import { CheckCircle2, CircleX, PenBoxIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'react-router-dom';
import { createEmployee, fetchEmployees, updateEmployee } from '@/services/employee';
import type { Employee, EmployeeBody } from '@/types/employees.types';
import { formatDateToDDMMYYYY } from '@/utils/timeDate';
import { StatusBadge } from '@/components/common/StatusBadge';
import EmployeeDrawer from '@/components/employee/EmployeeDrawer';

const EmployeeFormDialog = lazy(
	() => import('@/components/employee/EmployeeFormDialog')
);

function Employees() {
	const [open, setOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();



	const initialQuery = searchParams.get('search') || '';

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const {
		data,
		error,
		loading: fetchLoading,
		refetch,
	} = useFetchFn(fetchEmployees, { search: searchQuery }, [searchQuery]);
	const { postData, loading: postLoading } = usePostFn(createEmployee);
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [updateOpen, setUpdateOpen] = useState(false);
	const { postData: updatePostData, loading: updateLoading } = usePostFn(
		(empData: EmployeeBody) => updateEmployee(empData, employee?._id ?? 1)
	);

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (searchQuery) {
				setSearchParams({ search: searchQuery });
			} else {
				setSearchParams({});
			}
		}, 300);

		return () => clearTimeout(debounce);
	}, [searchQuery]);

	if (error) {
		toast.error(error);
	}

	const employees: Employee[] = data?.data || [];

	const columns: Column<Employee>[] = [
		{ header: 'Code', accessor: 'empCode' },
		{
			header: 'Full Name',
			accessor: (row) => `${row.firstName} ${row.lastName}`,
		},
		{ header: 'Department', accessor: (row) => row.department.departmentName },
		{
			header: 'Designation',
			accessor: (row) => row.designation.designationName,
		},
		{
			header: 'Joining Date',
			accessor: (row) => formatDateToDDMMYYYY(row.dateOfJoining),
		},
		{ header: 'Employee type', accessor: (row) => row.empType.empType },
		{ header: 'Shift', accessor: (row) => row.shift.shiftName },
		{
			header: 'Status',
			accessor: (row) => <StatusBadge status={row.status} />,
		},
		{
			header: 'Present',
			accessor: (row) =>
				row.onDuty ? (
					<div className='bg-success-100 p-1 rounded-md w-8 h-8 flex justify-center items-center text-success-800'>
						<CheckCircle2 />
					</div>
				) : (
					<div className='bg-warning-100 p-1 rounded-md w-8 h-8 flex justify-center items-center text-warning-700'>
						<CircleX />
					</div>
				),
		},
		{
			header: 'Actions',
			accessor: (row: Employee) => (
				<div className='flex gap-2'>
					<button
						className='bg-secondary-200 p-1 rounded-md w-8 h-8 flex justify-center items-center text-secondary-600'
						onClick={() => {
							setUpdateOpen(true);
							setEmployee(row);
						}}
					>
						<PenBoxIcon />
					</button>
				</div>
			),
		},
	];

	const handleSubmit = async (formData: EmployeeBody) => {
		try {
			const res = await postData(formData);
			if (res.success) {
				refetch();
				toast.success('Employee added new successfully');
				setOpen(false);
			}
		} catch (error) {
			toast.error(error as string);
		}
	};

	const handleUpdate = async (formData: EmployeeBody) => {
		try {
			const res = await updatePostData(formData);
			if (res.success) {
				refetch();
				toast.success('Employee Updated successfully');
				setUpdateOpen(false);
			}
		} catch (error) {
			toast.error(error as string);
		}
	};


	return (
		<div className='w-ful flex h-screen flex-col gap-6'>
			<Header
				title='Employees'
				buttonText='New'
				onChange={() => {
					setOpen(true);
				}}
			/>
			<div className='px-8 w-85'>
				<Input
					placeholder='Search the employee'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<div className='flex-1 overflow-hidden'>
				{fetchLoading ? (
					<div className='h-full flex justify-center items-center'>
						<Loader className='border-primary-800' />
					</div>
				) : (
					<Table className='h-full' columns={columns} data={employees} />
				)}
			</div>
			<EmployeeDrawer />
			<Suspense>
				<EmployeeFormDialog
					title='Add a new employee'
					open={open}
					isDisabled={postLoading}
					onClose={() => setOpen(false)}
					onAction={handleSubmit}
				/>
			</Suspense>
			<Suspense>
				<EmployeeFormDialog
					title='Update employee'
					open={updateOpen}
					isDisabled={updateLoading}
					onClose={() => setUpdateOpen(false)}
					onAction={handleUpdate}
					data={employee}
				/>
			</Suspense>
		</div>
	);
}

export default Employees;
