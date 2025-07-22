import { Button } from '@/components/ui/button';
import React from 'react';

import plusIcon from '@/assets/icons/plus.svg';

interface HeaderProps {
	title: string;
	buttonText?: React.ReactNode;
	onChange?: () => void;
	showButton?: boolean;
    showIcon?: boolean
}

const Header: React.FC<HeaderProps> = ({
	title,
	buttonText = 'Create',
	onChange,
	showButton = true,
    showIcon= true
}) => {
	return (
		<div className='w-full'>
			<div className='flex items-center justify-between bg-surface-100 w-full h-25 px-8 border-b border-border-300'>
				<p className='heading-primary-lg-semibold text-text-700 !text-4xl'>
					{title}
				</p>
				{showButton && (
					<Button onClick={onChange}>
						<div className='flex gap-1'>
                            {showIcon && <img className='w-5' src={plusIcon} alt="plus-icon" />}
                            {buttonText}
                        </div>
					</Button>
				)}
			</div>
		</div>
	);
};

export default Header;
