export default function Spinner({ className }: { className?: string }) {
	return (
		<div
			className={`w-4 h-4 rounded-full border-2 border-l-0 animate-spin ${className}`}
		/>
	);
}
