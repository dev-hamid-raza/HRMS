export function timeStringToAmPm(time: string): string {
	const [hourStr, minuteStr] = time.split(':');
	const hour = parseInt(hourStr, 10);
	const period = hour >= 12 ? 'PM' : 'AM';
	const hour12 = hour % 12 || 12;
	return `${hour12.toString().padStart(2, '0')}:${minuteStr} ${period}`;
}

export function formatDateToDDMMYYYY(inputDate: string) {
	const date = new Date(inputDate);

	if (isNaN(date.getTime())) return ''; // Invalid date

	const formatter = new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	return formatter.format(date).replace(/\//g, '-');
}