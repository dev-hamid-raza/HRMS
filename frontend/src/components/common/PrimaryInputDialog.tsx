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
import type { PrimaryInoutDialogProps } from '@/types/primaryDialog.types';
import Loader from '@/components/common/Loader';

export default function PrimaryInputDialog({
	title,
	description,
	open,
	onClose,
	isDisabled,
	label,
	onAction,
	placeholder,
	inputValue,
	setInputValue,
}: PrimaryInoutDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<form
					className='space-y-4'
					onSubmit={(e) => {
						e.preventDefault();
						onAction();
					}}
				>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4'>
						<div className='grid gap-3'>
							<Input
								label={label}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								placeholder={placeholder}
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary'>Cancel</Button>
						</DialogClose>
						<Button
							type='submit'
							disabled={isDisabled}
							// onClick={onAction}
						>
							{isDisabled ? <Loader /> : 'Save Changes'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
