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
import type { PrimaryDeleteDialogProps } from '@/types/primaryDialog.types';
import { Loader } from 'lucide-react';

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
	setInputValue
}: PrimaryDeleteDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<form>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>
							{description}
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4'>
						<div className='grid gap-3'>
							<Input 
							label={label}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)} 
							placeholder={placeholder} />
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary'>Cancel</Button>
						</DialogClose>
						<Button 
						disabled={isDisabled}
						onClick={onAction}
						>
							{isDisabled ? <Loader /> : "Save Changes"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
