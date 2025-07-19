import { cn } from '@/utils/cn';
import React, { useState } from 'react';

interface InputProps extends React.ComponentProps<'input'> {
	hasError?: boolean;
	inputClassName?: string;
    labelClassName?: string
	label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({
		type,
		hasError = false,
		className,
		placeholder,
		inputClassName,
        labelClassName,
        id,
		label,
		...props
	}) => {
		const [value, setValue] = useState('');
		return (
			<div className={cn('w-full', className)}>
                <label 
                htmlFor={id}
                className={cn(
                    'text-text-700 body-primary-sm-medium',
                    labelClassName
                )}
                >{label}</label>
				<input
                    id={id}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
						props.onChange?.(e);
					}}
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
