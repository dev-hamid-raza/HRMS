import React from 'react';
import { toTitleCase } from '@/utils/string';
import { cn } from '@/utils/cn';

interface StatusBadgeProps {
	status: string;
}

const statusColorMap: Record<string, string> = {
	'on duty': 'bg-success-100 text-success-700',
	quit: 'bg-warning-100 text-warning-700',
	terminated: 'bg-danger-100 text-danger-600',
};


export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const normalizedStatus = status.toLowerCase();
	const badgeClass = cn(
		'px-3 py-1 rounded-full font-bold',
		statusColorMap[normalizedStatus] || 'bg-gray-400 text-white'
	);

	return <span className={badgeClass}>{toTitleCase(status)}</span>;
};
