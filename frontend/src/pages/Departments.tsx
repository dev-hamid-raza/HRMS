import Header from '@/components/common/Header';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Table } from '@/components/common/PrimaryTable';
import type { Department } from '@/types/department.types';
import type { Column } from '@/types/table.types';
import useFetchFn from '@/hooks/useFetch';
import {
	createDepartment,
	deleDepartment,
	fetchDepartments,
	updateDepartment,
} from '@/services/department';
import { toast } from 'sonner';
import usePostFn from '@/hooks/usePostFn';
import Loader from '@/components/common/Loader';
import { PenBoxIcon, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const PrimaryInputDialog = lazy(
	() => import('@/components/common/PrimaryInputDialog')
);
const PrimaryDeleteDialog = lazy(
	() => import('@/components/common/PrimaryDeleteDialog ')
);

function Departments() {
	const [open, setOpen] = useState(false);
	const [ searchParams, setSearchParams] = useSearchParams()
	
	const initialQuery = searchParams.get("search") || ''

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const {
		data,
		error,
		loading: fetchLoading,
		refetch,
	} = useFetchFn(fetchDepartments, {search: searchQuery});
	const { postData, loading: postLoading } = usePostFn(createDepartment);
	const [departmentName, setDepartmentName] = useState('');
	const [loading, setLoading] = useState(false);
	const [department, setDepartment] = useState<Department | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const { postData: updatePostData, loading: updateLoading } = usePostFn(
		(id: number) => updateDepartment(departmentName, id)
	);

	useEffect(() => {
		const debounce = setTimeout(() => {

			if (searchQuery) {
				setSearchParams({ search: searchQuery });
			} else {
				setSearchParams({});
			}
	
			refetch({ search: searchQuery });
		}, 300);
	
		return () => clearTimeout(debounce);
	}, [searchQuery]);

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
						onClick={() => {
							setUpdateOpen(true);
							setDepartment(row);
							setDepartmentName(row.departmentName);
						}}
					>
						<PenBoxIcon />
					</button>
					<button
						className='bg-danger-200 w-8 h-8 flex justify-center items-center rounded-md text-danger-700 hover:cursor-pointer'
						onClick={() => {
							setDeleteOpen(true);
							setDepartment(row);
						}}
					>
						<Trash2 />
					</button>
				</div>
			),
		},
	];

	const handleSubmit = async () => {
		try {
			const res = await postData({ departmentName });
			if (res.success) {
				refetch();
				toast.success('Department created successfully');
				setOpen(false);
			}
		} catch (error) {
			toast.error(error as string);
		}
	};

	const handleDelete = async () => {
		if (!department) return;
		try {
			setLoading(true);
			const res = await deleDepartment(department._id);
			if (res.success) {
				toast.success('Department deleted successfully');
				refetch();
				setDeleteOpen(false);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			let errorMsg = 'Something went wrong';

			if (axios.isAxiosError(error)) {
				errorMsg = error.response?.data?.message || errorMsg;
			}

			toast.error(errorMsg);
		}
	};

	const handleUpdate = async () => {
		if (!department) return;
		try {
			const res = await updatePostData(department._id);
			if (res.success) {
				toast.success('Department name change successfully');
				refetch();
				setUpdateOpen(false);
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
				onChange={() => {
					setDepartmentName('');
					setOpen(true);
				}}
			/>
			<div className='px-8 w-85'>
				<Input placeholder='Search the department'
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
					<Table className='h-full' columns={columns} data={departments} />
				)}
			</div>
			<Suspense>
				<PrimaryInputDialog
					title='Create a department'
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
			<Suspense>
				<PrimaryInputDialog
					title='Update department name'
					description='The department name must be unique'
					label='Department name'
					placeholder='Enter new department name'
					open={updateOpen}
					isDisabled={updateLoading}
					onClose={() => setUpdateOpen(false)}
					onAction={handleUpdate}
					inputValue={departmentName}
					setInputValue={(e) => setDepartmentName(e)}
				/>
			</Suspense>
			<Suspense>
				<PrimaryDeleteDialog
					title='Are you sure?'
					description='Before deleting a department, make sure to update the department assignments for all associated employees.'
					open={deleteOpen}
					isDisabled={loading}
					onClose={() => setDeleteOpen(false)}
					onAction={handleDelete}
				/>
			</Suspense>
		</div>
	);
}

export default Departments;
