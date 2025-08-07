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
import type { PrimaryDeleteDialogProps } from '@/types/primaryDialog.types';
import Loader from '@/components/common/Loader';

export default function PrimaryDeleteDialog({
	title,
	description,
	open,
	onClose,
	isDisabled,
	onAction
}: PrimaryDeleteDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
				<DialogContent className='sm:max-w-[425px]'>
			<form className='space-y-4'>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
						<DialogDescription>
							{description}
						</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary'>Cancel</Button>
						</DialogClose>
						<Button 
						disabled={isDisabled}
						onClick={onAction}
						variant='danger'
						>
							{isDisabled ? <Loader /> : "Delete"}
						</Button>
					</DialogFooter>
			</form>
				</DialogContent>
		</Dialog>
	);
}
