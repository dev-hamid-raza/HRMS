import Header from '@/components/common/Header';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Table } from '@/components/common/PrimaryTable';
import type { Column } from '@/types/table.types';
import useFetchFn from '@/hooks/useFetch';
import {
	createDesignation,
	deleDesignation,
	fetchDesignations,
	updateDesignation
} from '@/services/designation';
import { toast } from 'sonner';
import usePostFn from '@/hooks/usePostFn';
import Loader from '@/components/common/Loader';
import { PenBoxIcon, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import type { Designation } from '@/types/designation.types';

const PrimaryInputDialog = lazy(
	() => import('@/components/common/PrimaryInputDialog')
);
const PrimaryDeleteDialog = lazy(
	() => import('@/components/common/PrimaryDeleteDialog ')
);

function Designations() {
	const [open, setOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const initialQuery = searchParams.get('search') || '';

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const {
		data,
		error,
		loading: fetchLoading,
		refetch,
	} = useFetchFn(fetchDesignations, { search: searchQuery });
	const { postData, loading: postLoading } = usePostFn(createDesignation);
	const [designationName, setDesignationName] = useState('');
	const [loading, setLoading] = useState(false);
	const [designation, setDesignation] = useState<Designation | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const { postData: updatePostData, loading: updateLoading } = usePostFn(
		(id: number) => updateDesignation(designationName, id)
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

	const designations: Designation[] = data?.data || [];

	const columns: Column<Designation>[] = [
		{ header: 'Name', accessor: 'designationName' },
		{
			header: 'Actions',
			accessor: (row: Designation) => (
				<div className='flex gap-2'>
					<button
						className='bg-secondary-200 p-1 rounded-md w-8 h-8 flex justify-center items-center text-secondary-600'
						onClick={() => {
							setUpdateOpen(true);
							setDesignation(row);
							setDesignationName(row.designationName);
						}}
					>
						<PenBoxIcon />
					</button>
					<button
						className='bg-danger-200 w-8 h-8 flex justify-center items-center rounded-md text-danger-700 hover:cursor-pointer'
						onClick={() => {
							setDeleteOpen(true);
							setDesignation(row);
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
			const res = await postData({ designationName });
			if (res.success) {
				refetch();
				toast.success('Designation created successfully');
				setOpen(false);
			}
		} catch (error) {
			toast.error(error as string);
		}
	};

	const handleDelete = async () => {
		if (!designation) return;
		try {
			setLoading(true);
			const res = await deleDesignation(designation._id);
			if (res.success) {
				toast.success('Designation deleted successfully');
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
		if (!designation) return;
		try {
			const res = await updatePostData(designation._id);
			if (res.success) {
				toast.success('Designation name change successfully');
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
				title='Designations'
				buttonText='Create'
				onChange={() => {
					setDesignationName('');
					setOpen(true);
				}}
			/>
			<div className='px-8 w-85'>
				<Input
					placeholder='Search the designations'
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
					<Table className='h-full' columns={columns} data={designations} />
				)}
			</div>
			<Suspense>
				<PrimaryInputDialog
					title='Create a designation'
					description='The designation name must be unique'
					label='Designation name'
					placeholder='Enter new designation name'
					open={open}
					isDisabled={postLoading}
					onClose={() => setOpen(false)}
					onAction={handleSubmit}
					inputValue={designationName}
					setInputValue={(e) => setDesignationName(e)}
				/>
			</Suspense>
			<Suspense>
				<PrimaryInputDialog
					title='Update designation name'
					description='The designation name must be unique'
					label='Designation name'
					placeholder='Enter new designation name'
					open={updateOpen}
					isDisabled={updateLoading}
					onClose={() => setUpdateOpen(false)}
					onAction={handleUpdate}
					inputValue={designationName}
					setInputValue={(e) => setDesignationName(e)}
				/>
			</Suspense>
			<Suspense>
				<PrimaryDeleteDialog
					title='Are you sure?'
					description='Before deleting a designation, make sure to update the designation assignments for all associated employees.'
					open={deleteOpen}
					isDisabled={loading}
					onClose={() => setDeleteOpen(false)}
					onAction={handleDelete}
				/>
			</Suspense>
		</div>
	);
}

export default Designations;
