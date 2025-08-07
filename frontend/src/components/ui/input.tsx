import { cn } from '@/utils/cn';
import React from 'react';
import { InputMask } from 'primereact/inputmask';
import type { InputMaskProps } from 'primereact/inputmask';

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'>,
		Pick<InputMaskProps, 'mask' | 'slotChar' | 'autoClear'> {
	hasError?: boolean;
	inputClassName?: string;
	labelClassName?: string;
	label?: string;
	id?: string;
}

/**
 * Reusable Input component — supports normal <input> or PrimeReact InputMask
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		type = 'text',
		hasError = false,
		className,
		placeholder,
		inputClassName,
		labelClassName,
		label,
		id,
		mask,
		slotChar = '_',
		autoClear = false,
		...rest
	} = props;

	const inputStyles = cn(
		'flex items-center h-10 rounded-md py-1 px-3 border w-full',
		'body-primary-lg-regular text-text-700',
		'transition-all ease-in-out duration-200',
		'focus-visible:outline-none',
		hasError
			? 'border-danger hover:border-danger-700 focus:border-danger-700 focus:ring-3 focus:ring-danger-100'
			: 'border-border hover:border-border-500 focus:border-border-600 focus:ring-3 focus:ring-border-200',
		inputClassName
	);

	return (
		<div className={cn('w-full', className)}>
			{label && (
				<label
					htmlFor={id}
					className={cn(
						'text-text-700 body-primary-sm-medium',
						labelClassName
					)}
				>
					{label}
				</label>
			)}

			{mask ? (
				<InputMask
					id={id}
					// ref={ref}
					mask={mask}
					slotChar={slotChar}
					autoClear={autoClear}
					className={inputStyles}
					placeholder={placeholder}
					{...(rest as InputMaskProps)}
				/>
			) : (
				<input
					id={id}
					ref={ref}
					type={type}
					placeholder={placeholder}
					className={inputStyles}
					{...rest}
				/>
			)}
		</div>
	);
});

Input.displayName = 'Input';

export { Input };
