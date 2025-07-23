import Header from '@/components/common/Header';
import { lazy, Suspense, useState } from 'react';
import { Table } from '@/components/common/PrimaryTable';
import type { Department } from '@/types/department.types';
import type { Column } from '@/types/table.types';
import useFetchFn from '@/hooks/useFetch';
import { createDepartment, fetchDepartments } from '@/services/deparment';
import { toast } from 'sonner';
import usePostFn from '@/hooks/usePostFn';
import Loader from '@/components/common/Loader';
import { Pen, PenBox, PenBoxIcon, Trash, Trash2, Trash2Icon } from 'lucide-react';

const PrimaryInputDialog = lazy(
	() => import('@/components/common/PrimaryInputDialog')
);

function Departments() {
	const [open, setOpen] = useState(false);
	const { data, error, loading, refetch } = useFetchFn(fetchDepartments);
	const { postData, loading: postLoading } = usePostFn(createDepartment);
	const [departmentName, setDepartmentName] = useState('');

	if (error) {
		toast.error(error);
	}

	const departments: Department[] = data?.data || [];

	const columns: Column<Department>[] = [
		{ header: 'Name', accessor: 'departmentName' },
		{
			header: 'Actions',
			accessor: (row: Department) => (
				<div className='flex gap-2'>
					<button
						className='bg-secondary-200 p-1 rounded-md w-8 h-8 flex justify-center items-center text-secondary-600'
						onClick={() => alert('Edit ' + row._id)}
					>
						<PenBoxIcon />
					</button>
					<button
						className='bg-danger-200 w-8 h-8 flex justify-center items-center rounded-md text-danger-700'
						onClick={() => alert('Delete ' + row._id)}
					>
						<Trash2 />
					</button>
				</div>
			),
		},
	];

	const handleSubmit = async () => {
		console.log(departmentName);
		try {
			const res = await postData({ departmentName });
			if(res.success) {
				refetch()
				toast.success("Department created successfully")
				setOpen(false)
			}
		} catch (error) {
			toast.error(error as string);
		}
	};

	return (
		<div className='w-ful flex h-screen flex-col space-y-6'>
			<Header
				title='Departments'
				buttonText='Create'
				onChange={() => setOpen(true)}
			/>
			<div className='flex-1 overflow-hidden'>
				{loading ? <Loader /> : <Table className='h-full' columns={columns} data={departments} />}
			</div>
			<Suspense>
				<PrimaryInputDialog
					title='Department'
					description='The department name must be unique'
					label='Department name'
					placeholder='Enter new department name'
					open={open}
					isDisabled={postLoading}
					onClose={() => setOpen(false)}
					onAction={handleSubmit}
					inputValue={departmentName}
					setInputValue={(e) => setDepartmentName(e)}
				/>
			</Suspense>
		</div>
	);
}

export default Departments;
