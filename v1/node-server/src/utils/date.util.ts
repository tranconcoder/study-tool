export function getWeek(date: Date = new Date()): number {
	const start = new Date(date.getFullYear(), 0, 1);
	const diff =
		date.getTime() -
		start.getTime() +
		(start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000;
	const oneWeek = 604800000; // milliseconds in one week
	return Math.floor(diff / oneWeek);
}

export function getDayOfWeekStr(date: Date = new Date()): string {
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	return days[date.getDay()];
}
