import { cn } from '@/utils/cn';
import React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
	hasError?: boolean;
	inputClassName?: string;
    labelClassName?: string
	label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(props, ref) => {
		const {
			type,
			hasError = false,
			className,
			placeholder,
			inputClassName,
			labelClassName,
			id,
			label,
			...rest
		} = props;

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
				<input
					id={id}
					ref={ref}
					type={type}
					placeholder={placeholder}
					{...rest}
					className={cn(
						'flex items-center h-10 rounded-md py-1 px-3 border w-full',
						'body-primary-lg-regular text-text-700',
						'transition-all ease-in-out duration-200',
						'focus-visible:outline-none',
						hasError
							? 'border-danger hover:border-danger-700 focus:border-danger-700 focus:ring-3 focus:ring-danger-100'
							: 'border-border hover:border-border-500 focus:border-border-600 focus:ring-3 focus:ring-border-200',
						inputClassName
					)}
				/>
			</div>
		);
	}
);


Input.displayName = 'Input';

export { Input };
