import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/utils/cn';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';


interface ComboBoxOption {
	value: string;
	label: string;
}

interface ComboboxProps {
	options: ComboBoxOption[];
	onChange?: (value: string) => void;
	label: string;
	hasError?: boolean
	value: string
	setValue: (val: string) => void
	name: string
}

export function Combobox({ options, onChange, label, hasError, value, setValue, name }: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	// const [value, setValue] = React.useState('');
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger className='w-full' asChild>
				<div className='flex flex-col items-start'>
					<label htmlFor='' className='text-text-700 body-primary-sm-medium'>
						{label}
					</label>
					<button
						type='button'
						role='combobox'
						onClick={() => setOpen((prev) => !prev)}
						// aria-expanded={open}
						className={cn(
							'flex justify-between items-center h-10 rounded-md py-1 px-3 border w-full hover:cursor-pointer',
							'body-primary-lg-regular text-text-700',
							'transition-all ease-in-out duration-200',
							'focus-visible:outline-none',
							value ? 'text-text-700' : 'text-text-400',
							hasError
								? 'border-danger hover:border-danger-700 focus:border-danger-700 focus:ring-3 focus:ring-danger-100'
								: 'border-border hover:border-border-500 focus:border-border-600 focus:ring-3 focus:ring-border-200'
						)}
					>
						{value
							? options.find((option) => option.value === value)?.label
							: 'Please select'}
						<ChevronsUpDown className='opacity-50' />
					</button>
				</div>
			</PopoverTrigger>
			<PopoverContent
				className='p-0'
				sideOffset={4}
				align='start'
				style={{ width: 'var(--radix-popover-trigger-width)' }} // magic here
			>
				<Command>
					<CommandInput placeholder='Search framework...' className='h-9' />
					<CommandList>
						<CommandEmpty>No {name} found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									className={cn(
										'cursor-pointer hover:bg-surface-300 my-0.5',
										'transition-all ease-in-out duration-100',
										value === option.value ? 'bg-surface-300' : ''
									)}
									key={option.value}
									value={option.label}
									onSelect={(selectedLabel) => {
										const selectedOption = options.find(
											(opt) => opt.label === selectedLabel
										);
										const newValue =
											selectedOption?.value === value
												? ''
												: selectedOption?.value ?? '';
										setValue(newValue);
										onChange?.(newValue); // if you want to notify parent
										setOpen(false);
									}}
								>
									{option.label}
									<Check
										className={cn(
											'ml-auto',
											value === option.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
