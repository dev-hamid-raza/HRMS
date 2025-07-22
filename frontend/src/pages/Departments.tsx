import Header from '@/components/common/Header';
import React from 'react';
import { Table } from '@/components/common/PrimaryTable';

function Departments() {
	type Employee = {
		name: string;
		// designation: string;
		// department: string;
	};

	interface Column<T> {
		header: string;
		accessor: keyof T | ((row: T) => React.ReactNode); // ✅ Accepts string key or function
		className?: string;
	}

	const employees: Employee[] = [
		{ name: 'Hamid Raza',  },
		{ name: 'Aisha Khan',  },

		
	];

	const columns: Column<Employee>[] = [
		{ header: 'Name', accessor: 'name' },
		// { header: 'Designation', accessor: 'designation' },
		{
			header: 'Actions',
			accessor: (row: Employee) => (
				<div className='flex gap-2'>
					<button
						className='text-blue-500'
						onClick={() => alert('Edit ' + row.name)}
					>
						Edit
					</button>
					<button
						className='text-red-500'
						onClick={() => alert('Delete ' + row.name)}
					>
						Delete
					</button>
				</div>
			),
		},
	];
	return (
		<div className='w-ful space-y-6'>
			<Header title='Departments' buttonText='Create' />
			<div className='px-4'>
			<Table columns={columns} data={employees} />
			</div>
		</div>
	);
}

export default Departments;
