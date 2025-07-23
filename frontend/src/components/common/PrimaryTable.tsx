import React from 'react';

interface Column<T> {
	header: string;
	accessor: keyof T | ((row: T) => React.ReactNode);
	className?: string;
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	emptyText?: string;
	className?: string;
	onRowClick?: (row: T) => void; // 👈 new prop
}

export function Table<T>({
	columns,
	data,
	emptyText = 'No data available',
	className = '',
	onRowClick,
}: TableProps<T>) {
	return (
		<div
			className={`overflow-x-auto w-full border-y  border-border-300 ${className}`}
		>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-surface-100 sticky top-0'>
					<tr>
						{columns.map((col, idx) => (
							<th
								key={idx}
								className={`px-8 py-3 text-left text-sm font-medium text-gray-700 ${
									col.className || ''
								}`}
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-100'>
					{data.length > 0 ? (
						data.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								onClick={() => onRowClick?.(row)}
								className={`cursor-pointer hover:bg-gray-100 transition`}
							>
								{columns.map((col, colIndex) => {
									const value =
										typeof col.accessor === 'function'
											? col.accessor(row)
											: row[col.accessor as keyof T];
									return (
										<td
											key={colIndex}
											className='px-8 py-4 text-sm text-gray-800'
										>
											{React.isValidElement(value) ||
											typeof value === 'string' ||
											typeof value === 'number'
												? value
												: String(value ?? '')}
										</td>
									);
								})}
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={columns.length}
								className='px-6 py-4 text-center text-gray-500'
							>
								{emptyText}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
