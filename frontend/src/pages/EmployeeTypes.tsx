import Header from '@/components/common/Header';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Table } from '@/components/common/PrimaryTable';
import type { Column } from '@/types/table.types';
import useFetchFn from '@/hooks/useFetch';
import {
	createEmpType,
	deleteEmpType,
	fetchEmpTypes,
	updateEmpType,
} from '@/services/employeeType';
import { toast } from 'sonner';
import usePostFn from '@/hooks/usePostFn';
import Loader from '@/components/common/Loader';
import { PenBoxIcon, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import type { EmpType } from '@/types/employeeType.types';
import PrimaryTooltip from '@/components/common/PrimaryTooltip';

const PrimaryInputDialog = lazy(
	() => import('@/components/common/PrimaryInputDialog')
);
const PrimaryDeleteDialog = lazy(
	() => import('@/components/common/PrimaryDeleteDialog ')
);

function EmployeeTypes() {
	const [open, setOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const initialQuery = searchParams.get('search') || '';

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const {
		data,
		error,
		loading: fetchLoading,
		refetch,
	} = useFetchFn(fetchEmpTypes, { search: searchQuery }, [searchQuery]);
	const { postData, loading: postLoading } = usePostFn(createEmpType);
	const [empType, setEmpType] = useState('');
	const [loading, setLoading] = useState(false);
	const [empTypeData, setEmpTypeData] = useState<EmpType | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const { postData: updatePostData, loading: updateLoading } = usePostFn(
		(id: number) => updateEmpType(empType, id)
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

	const empTypes: EmpType[] = data?.data || [];

	const columns: Column<EmpType>[] = [
		{ header: 'Name', accessor: 'empType' },
		{
			header: 'Actions',
			accessor: (row: EmpType) => (
				<div className='flex gap-2'>
					<PrimaryTooltip tip='Edit'>
						<button
							className='bg-secondary-200 p-1 rounded-md w-8 h-8 flex justify-center items-center text-secondary-600 hover:cursor-pointer'
							onClick={() => {
								setUpdateOpen(true);
								setEmpTypeData(row);
								setEmpType(row.empType);
							}}
						>
							<PenBoxIcon />
						</button>
					</PrimaryTooltip>
					<PrimaryTooltip tip='Delete'>
						<button
							className='bg-danger-200 w-8 h-8 flex justify-center items-center rounded-md text-danger-700 hover:cursor-pointer'
							onClick={() => {
								setDeleteOpen(true);
								setEmpTypeData(row);
							}}
						>
							<Trash2 />
						</button>
					</PrimaryTooltip>
				</div>
			),
		},
	];

	const handleSubmit = async () => {
		try {
			const res = await postData({ empType });
			if (res.success) {
				refetch();
				toast.success('Employee type created successfully');
				setOpen(false);
			}
		} catch (error) {
			toast.error(error as string);
		}
	};

	const handleDelete = async () => {
		if (!empTypeData) return;
		try {
			setLoading(true);
			const res = await deleteEmpType(empTypeData._id);
			if (res.success) {
				toast.success('Employee type deleted successfully');
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
		if (!empTypeData) return;
		try {
			const res = await updatePostData(empTypeData._id);
			if (res.success) {
				toast.success('Employee type name change successfully');
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
				title='Employee Types'
				buttonText='Create'
				onChange={() => {
					setEmpType('');
					setOpen(true);
				}}
			/>
			<div className='px-8 w-85'>
				<Input
					placeholder='Search the employee type'
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
					<Table className='h-full' columns={columns} data={empTypes} />
				)}
			</div>
			<Suspense>
				<PrimaryInputDialog
					title='Create a employee type'
					description='The employee type name must be unique'
					label='Employee type name'
					placeholder='Enter new employee type name'
					open={open}
					isDisabled={postLoading}
					onClose={() => setOpen(false)}
					onAction={handleSubmit}
					inputValue={empType}
					setInputValue={(e) => setEmpType(e)}
				/>
			</Suspense>
			<Suspense>
				<PrimaryInputDialog
					title='Update employee type name'
					description='The employee type name must be unique'
					label='Employee type name'
					placeholder='Enter new employee type name'
					open={updateOpen}
					isDisabled={updateLoading}
					onClose={() => setUpdateOpen(false)}
					onAction={handleUpdate}
					inputValue={empType}
					setInputValue={(e) => setEmpType(e)}
				/>
			</Suspense>
			<Suspense>
				<PrimaryDeleteDialog
					title='Are you sure?'
					description='Before deleting a employee type, make sure to update the employee type assignments for all associated employees.'
					open={deleteOpen}
					isDisabled={loading}
					onClose={() => setDeleteOpen(false)}
					onAction={handleDelete}
				/>
			</Suspense>
		</div>
	);
}

export default EmployeeTypes;
