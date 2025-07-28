import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type {PrimaryShiftDialogProps } from '@/types/primaryDialog.types';
import Loader from '@/components/common/Loader';

export default function ShiftInputDialog({
	open,
	onClose,
	isDisabled,
	onAction,
	handleTimeChange,
	shiftTimes,
	title
}: PrimaryShiftDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[325px]'>
				<form
					className='space-y-4'
					onSubmit={(e) => {
						e.preventDefault();
						onAction();
					}}
				>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>The shift name must be unique</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4'>
						<div className='grid gap-3'>
							<Input
								label='Shift Name'
								placeholder='Enter the shift name'
								value={shiftTimes.shiftName}
								onChange={(e) => handleTimeChange('shiftName', e.target.value)}
							/>
							<div className="flex gap-4">
							<Input
								label={"Start time"}
								type='time'
								className='w-fit appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
								value={shiftTimes.startTime}
								onChange={(e) => handleTimeChange('startTime', e.target.value)}
							/>
							<Input
								label={"End Time"}
								type='time'
								className='w-fit'
								value={shiftTimes.endTime}
								onChange={(e) => handleTimeChange('endTime', e.target.value)}
							/>
							</div>
							<div className="flex gap-4">
							<Input
								label={"Late in"}
								type='time'
								className='w-fit'
								value={shiftTimes.lateInRelaxation}
								onChange={(e) => handleTimeChange('lateInRelaxation', e.target.value)}
							/>
							<Input
								label={"Early out"}
								type='time'
								className='w-fit'
								value={shiftTimes.earlyOutRelaxation}
								onChange={(e) => handleTimeChange('earlyOutRelaxation', e.target.value)}
							/>
							</div>
							<div className="flex gap-4">
							<Input
								label={"Rest start"}
								type='time'
								className='w-fit'
								value={shiftTimes.brakeStart}
								onChange={(e) => handleTimeChange('brakeStart', e.target.value)}
							/>
							<Input
								label={"Rest end"}
								type='time'
								className='w-fit'
								value={shiftTimes.brakeEnd}
								onChange={(e) => handleTimeChange('brakeEnd', e.target.value)}
							/>
							</div>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary'>Cancel</Button>
						</DialogClose>
						<Button
							type='submit'
							disabled={isDisabled}
						>
							{isDisabled ? <Loader /> : 'Save Changes'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
