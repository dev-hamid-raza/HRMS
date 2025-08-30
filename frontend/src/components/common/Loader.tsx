export default function Spinner({ className }: { className?: string }) {
	return (
		<div
			className={`w-4 h-4 rounded-full border-3 border-l-transparent animate-spin ${className}`}
		/>
	);
}
