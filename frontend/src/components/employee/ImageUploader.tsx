import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';

type Props = {
	onImageSelect: (file: File) => void;
	hasError: boolean
	defaultImageUrl?: string
};

export default function ImageUploader({ onImageSelect, hasError, defaultImageUrl }: Props) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		// Set preview from backend if available
		if (defaultImageUrl) {
			setPreviewUrl(defaultImageUrl);
		}
	}, [defaultImageUrl])

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith('image/')) {
			onImageSelect(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			onImageSelect(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const handleClick = () => {
		inputRef.current?.click();
	};

	return (
		<div
			className={cn(
				'border-2 relative border-dashed w-[150px] h-[185px] flex flex-col justify-center rounded-md text-center cursor-pointer hover:bg-gray-50',
				hasError 
				? 'border-danger'
				: 'border-gray-300'
			)}
			onDrop={handleDrop}
			onDragOver={(e) => e.preventDefault()}
			onClick={handleClick}
		>
			{previewUrl ? (
				<img src={previewUrl} alt='Preview' className='absolute top-0 left-0 w-full h-full object-cover rounded-md' />
			) : (
				<>
					<p className='text-gray-500'>Drag & drop an image here</p>
					<p className='text-gray-400 text-sm'>or click to browse</p>
				</>
			)}
			<input
				type='file'
				accept='image/*'
				ref={inputRef} 
				className='hidden'
				onChange={handleFileChange}
			/>
		</div>
	);
}
