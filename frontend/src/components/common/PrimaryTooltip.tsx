import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import type React from 'react';

interface PrimaryTooltipProps {
	children: React.ReactNode
	tip: string
}

function PrimaryTooltip({children,tip}:PrimaryTooltipProps) {
	return (
		<div>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent>
					<p>{tip}</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
}

export default PrimaryTooltip;
