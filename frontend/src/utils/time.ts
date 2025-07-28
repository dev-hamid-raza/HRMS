export function timeStringToAmPm(time: string): string {
	const [hourStr, minuteStr] = time.split(':');
	const hour = parseInt(hourStr, 10);
	const period = hour >= 12 ? 'PM' : 'AM';
	const hour12 = hour % 12 || 12;
	return `${hour12.toString().padStart(2, '0')}:${minuteStr} ${period}`;
}
