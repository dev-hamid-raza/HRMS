import Header from '@/components/common/Header';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Table } from '@/components/common/PrimaryTable';
import type { Column } from '@/types/table.types';
import useFetchFn from '@/hooks/useFetch';
import { toast } from 'sonner';
import usePostFn from '@/hooks/usePostFn';
import Loader from '@/components/common/Loader';
import { PenBoxIcon, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ShiftInputDialog from '@/components/shifts/ShiftInputDialog';
import {
	createShift,
	deleteShift,
	fetchShifts,
	updateShift,
} from '@/services/shift';
import type { Shift, ShiftBody } from '@/types/shift.types';
import { timeStringToAmPm } from '@/utils/timeDate';

const PrimaryDeleteDialog = lazy(
	() => import('@/components/common/PrimaryDeleteDialog ')
);

function Shifts() {
	const defaultShiftTimes = {
		startTime: '',
		endTime: '',
		brakeStart: '',
		brakeEnd: '',
		lateInRelaxation: '',
		earlyOutRelaxation: '',
		shiftName: '',
	};
	const [open, setOpen] = useState(false);
	const [shiftTimes, setShiftTimes] = useState<ShiftBody>(defaultShiftTimes);

	const [searchParams, setSearchParams] = useSearchParams();

	const initialQuery = searchParams.get('search') || '';

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const {
		data,
		error,
		loading: fetchLoading,
		refetch,
	} = useFetchFn(fetchShifts, { search: searchQuery }, [searchQuery]);
	const { postData, loading: postLoading } = usePostFn(createShift);
	const [loading, setLoading] = useState(false);
	const [shiftData, setShiftData] = useState<Shift | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);

	const { postData: updatePostData, loading: updateLoading } = usePostFn(
		(id: number) => updateShift(shiftTimes, id)
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

	const shifts: Shift[] = data?.data || [];

	const columns: Column<Shift>[] = [
		{ header: 'Name', accessor: 'shiftName' },
		{ header: 'Start', accessor: (row) => timeStringToAmPm(row.startTime) },
		{ header: 'End', accessor: (row) => timeStringToAmPm(row.endTime) },
		{ header: 'Rest start', accessor: (row) => timeStringToAmPm(row.brakeStart) },
		{ header: 'Rest end', accessor: (row) => timeStringToAmPm(row.brakeEnd) },
		{ header: 'Late in', accessor: (row) => timeStringToAmPm(row.lateInRelaxation) },
		{ header: 'Early out', accessor: (row) => timeStringToAmPm(row.earlyOutRelaxation) },
		{ header: 'Hours', accessor: 'totalShiftHours' },
		{
			header: 'Actions',
			accessor: (row: Shift) => (
				<div className='flex gap-2'>
					<button
						className='bg-secondary-200 p-1 rounded-md w-8 h-8 flex justify-center items-center text-secondary-600'
						onClick={() => {
							setUpdateOpen(true);
							setShiftData(row);
							setShiftTimes(row);
						}}
					>
						<PenBoxIcon />
					</button>
					<button
						className='bg-danger-200 w-8 h-8 flex justify-center items-center rounded-md text-danger-700 hover:cursor-pointer'
						onClick={() => {
							setDeleteOpen(true);
							setShiftData(row);
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
			const res = await postData({ ...shiftTimes });
			if (res.success) {
				refetch();
				toast.success('Shift created successfully');
				setOpen(false);
			}
		} catch (error) {
			toast.error(error as string);
		}
	};

	const handleDelete = async () => {
		if (!shiftData) return;
		try {
			setLoading(true);
			const res = await deleteShift(shiftData._id);
			if (res.success) {
				toast.success('Shift deleted successfully');
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
		if (!shiftData) return;
		try {
			const res = await updatePostData(shiftData._id);
			if (res.success) {
				toast.success('Shift update successfully');
				refetch();
				setUpdateOpen(false);
			}
		} catch (error) {
			toast.error(error as string);
		}
	};

	const handleTimeChange = (key: keyof typeof shiftTimes, value: string) => {
		setShiftTimes((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	return (
		<div className='w-ful flex h-screen flex-col space-y-6'>
			<Header
				title='Shifts'
				buttonText='Create'
				onChange={() => {
					setShiftTimes(defaultShiftTimes);
					setOpen(true);
				}}
			/>
			<div className='px-8 w-85'>
				<Input
					placeholder='Search the shift'
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
					<Table className='h-full' columns={columns} data={shifts} />
				)}
			</div>

			<Suspense>
				<ShiftInputDialog
					title='Create a shift'
					open={open}
					isDisabled={postLoading}
					onClose={() => setOpen(false)}
					onAction={handleSubmit}
					handleTimeChange={handleTimeChange}
					shiftTimes={shiftTimes}
				/>
			</Suspense>
			<Suspense>
				<ShiftInputDialog
					title='Update a shift'
					open={updateOpen}
					isDisabled={updateLoading}
					onClose={() => setUpdateOpen(false)}
					onAction={handleUpdate}
					handleTimeChange={handleTimeChange}
					shiftTimes={shiftTimes}
				/>
			</Suspense>
			<Suspense>
				<PrimaryDeleteDialog
					title='Are you sure?'
					description='Before deleting a shift make sure to update the shift assignments for all associated employees.'
					open={deleteOpen}
					isDisabled={loading}
					onClose={() => setDeleteOpen(false)}
					onAction={handleDelete}
				/>
			</Suspense>
		</div>
	);
}

export default Shifts;
